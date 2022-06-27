/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
function liquidFillGaugeDefaultSettings() {
  return {
    minValue: 0, // The gauge minimum value.
    maxValue: 55000, // The gauge maximum value.
    circleThickness: 0.02, // The outer circle thickness as a percentage of it's radius.
    circleFillGap: 0.02, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    circleColor: "#178BCA", // The color of the outer circle.
    waveHeight: 0.01, // The wave height as a percentage of the radius of the wave circle.
    waveCount: 4, // The number of full waves per width of the wave circle.
    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
    waveAnimateTime: 5000, // The amount of time in milliseconds for a full wave to enter the wave circle.
    waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
    waveAnimate: true, // Controls if the wave scrolls or is static.
    waveColor: "#178BCA", // The color of the fill wave.
    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    textSize: 0.2, // The relative height of the text to display in the wave circle. 1 = 50%
    valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
    displayPercent: false, // If true, a % symbol is displayed after the value.
    textColor: "#045681", // The color of the value text when the wave does not overlap it.
    waveTextColor: "#A4DBf8", // The color of the value text when the wave overlaps it.

    outlineThickness: 0.05, // The outer outline thickness as a fraction of its height;
    outlineFillGap: 0.05, // The size of the gap between the outer outline and wave area as a fraction of the gauge's height.
  };
}

function loadLiquidFillGauge(gaugeElement, value, config) {
  if (config == null) config = liquidFillGaugeDefaultSettings();

  var gauge = d3.select(gaugeElement);

  const width = parseInt(gauge.style("width"));
  const height = parseInt(gauge.style("height"));
  const locationXY = config.outlineThickness / 2;
  const fillPercent =
    Math.max(config.minValue, Math.min(config.maxValue, value)) /
    config.maxValue;

  // var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")))/2;
  // var locationX = parseInt(gauge.style("width"))/2 - radius;
  // var locationY = parseInt(gauge.style("height"))/2 - radius;
  // var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;

  var waveHeightScale;
  if (config.waveHeightScaling) {
    waveHeightScale = d3.scale
      .linear()
      .range([0, config.waveHeight, 0])
      .domain([0, 50, 100]);
  } else {
    waveHeightScale = d3.scale
      .linear()
      .range([config.waveHeight, config.waveHeight])
      .domain([0, 100]);
  }

  const textPixels = (config.textSize * height) / 2;
  const textFinalValue = parseFloat(value).toFixed(2);
  const textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
  const percentText = config.displayPercent ? "%" : "";
  const outlineThickness = config.outlineThickness * height;
  const outlineFillGap = config.outlineFillGap * height;
  const fillAreaMargin = outlineThickness + outlineFillGap;
  const fillAreaWidth = width - fillAreaMargin * 2;
  const fillAreaHeight = height - fillAreaMargin * 2;
  const fillAreaToWidthRatio = fillAreaWidth / (width - outlineThickness);
  console.log(fillAreaToWidthRatio);

  // var fillCircleMargin = circleThickness + circleFillGap;
  // var fillCircleRadius = radius - fillCircleMargin;
  const waveHeight = fillAreaHeight * waveHeightScale(fillPercent * 100); // The height of the wave from peak to trough (or maybe to midline?);

  const waveLength = fillAreaWidth / config.waveCount;
  const waveClipCount = 1 + config.waveCount;
  const waveClipWidth = waveLength * waveClipCount;

  console.log(waveClipCount, waveClipWidth);

  // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
  let textRounder = function (value) {
    return Math.round(value);
  };
  if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
    textRounder = function (value) {
      return parseFloat(value).toFixed(1);
    };
  }
  if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
    textRounder = function (value) {
      return parseFloat(value).toFixed(2);
    };
  }

  // Data for building the clip wave area.
  const data = [];
  for (var i = 0; i <= 40 * waveClipCount; i++) {
    data.push({ x: i / (40 * waveClipCount), y: i / 40 });
  }

  // // Scales for drawing the outer circle.
  // var gaugeCircleX = d3.scale.linear().range([0,2*Math.PI]).domain([0,1]);
  // var gaugeCircleY = d3.scale.linear().range([0,radius]).domain([0,radius]);

  // Scales for controlling the size of the clipping path.
  var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
  var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

  // Scales for controlling the position of the clipping path.
  var waveRiseScale = d3.scale
    .linear()
    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
    // circle at 100%.
    .range([
      fillAreaMargin + fillAreaHeight + waveHeight,
      fillAreaMargin - waveHeight,
    ])
    .domain([0, 1]);
  var waveAnimateScale = d3.scale
    .linear()
    .range([0, waveClipWidth - fillAreaWidth]) // Push the clip area one full wave then snap back.
    .domain([0, 1]);

  // Scale for controlling the position of the text within the gauge.
  var textRiseScaleY = d3.scale
    .linear()
    .range([fillAreaMargin + fillAreaHeight, fillAreaMargin + textPixels * 0.7])
    .domain([0, 1]);

  // Center the gauge within the parent SVG.
  var gaugeGroup = gauge
    .append("g")
    .attr("transform", `translate(${locationXY},${locationXY})`);

  // Draw the outer reactor outline
  gaugeGroup
    .append("rect")
    .attr("x", outlineThickness / 2)
    .attr("y", outlineThickness / 2)
    .attr("height", height - outlineThickness)
    .attr("width", width - outlineThickness)
    .attr("rx", 100)
    .attr("ry", 25)
    .attr("stroke-width", outlineThickness)
    .attr("stroke", config.circleColor)
    .attr("fill", "transparent");

  // Draw the outer circle.
  //   var gaugeCircleArc = d3.svg
  //     .arc()
  //     .startAngle(gaugeCircleX(0))
  //     .endAngle(gaugeCircleX(1))
  //     .outerRadius(gaugeCircleY(radius))
  //     .innerRadius(gaugeCircleY(radius - circleThickness));

  // Text where the wave does not overlap.
  var text1 = gaugeGroup
    .append("text")
    .text(textRounder(textStartValue) + percentText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.textColor)
    .attr(
      "transform",
      `translate(${width / 2}, ${textRiseScaleY(config.textVertPosition)})`
    );

  // The clipping wave area.
  var clipArea = d3.svg
    .area()
    .x(function (d) {
      return waveScaleX(d.x);
    })
    .y0(function (d) {
      return waveScaleY(
        Math.sin(
          Math.PI * 2 * config.waveOffset * -1 +
            Math.PI * 2 * (1 - config.waveCount) +
            d.y * 2 * Math.PI
        )
      );
    })
    .y1(function (d) {
      return fillAreaHeight + waveHeight;
    });
  var waveGroup = gaugeGroup
    .append("defs")
    .append("clipPath")
    .attr("id", "clipWave" + elementId);
  var wave = waveGroup
    .append("path")
    .datum(data)
    .attr("d", clipArea)
    .attr("T", 0);

  // The inner circle with the clipping wave attached.
  var fillAreaGroup = gaugeGroup
    .append("g")
    .attr("clip-path", "url(#clipWave" + elementId + ")");
  fillAreaGroup
    .append("rect")
    .attr("x", fillAreaMargin)
    .attr("y", fillAreaMargin)
    .attr("height", fillAreaHeight)
    .attr("width", fillAreaWidth)
    .attr("rx", 100)
    .attr("ry", fillAreaToWidthRatio * 25)
    .style("fill", config.circleColor);

  // Text where the wave does overlap.
  var text2 = fillAreaGroup
    .append("text")
    .text(textRounder(textStartValue) + percentText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.waveTextColor)
    .attr(
      "transform",
      "translate(" +
        width / 2 +
        "," +
        textRiseScaleY(config.textVertPosition) +
        ")"
    );

  // Make the value count up.
  if (config.valueCountUp) {
    var textTween = function () {
      var i = d3.interpolate(this.textContent, textFinalValue);
      return function (t) {
        this.textContent = textRounder(i(t)) + percentText;
      };
    };
    text1.transition().duration(config.waveRiseTime).tween("text", textTween);
    text2.transition().duration(config.waveRiseTime).tween("text", textTween);
  }

  // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
  var waveGroupXPosition = fillAreaMargin + fillAreaWidth - waveClipWidth;
  if (config.waveRise) {
    waveGroup
      .attr(
        "transform",
        "translate(" + waveGroupXPosition + "," + waveRiseScale(0) + ")"
      )
      .transition()
      .duration(config.waveRiseTime)
      .attr(
        "transform",
        "translate(" +
          waveGroupXPosition +
          "," +
          waveRiseScale(fillPercent) +
          ")"
      )
      .each("start", function () {
        wave.attr("transform", "translate(1,0)");
      }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
  } else {
    waveGroup.attr(
      "transform",
      "translate(" + waveGroupXPosition + "," + waveRiseScale(fillPercent) + ")"
    );
  }

  if (config.waveAnimate) animateWave();

  function animateWave() {
    wave.attr(
      "transform",
      "translate(" + waveAnimateScale(wave.attr("T")) + ",0)"
    );
    wave
      .transition()
      .duration(config.waveAnimateTime * (1 - wave.attr("T")))
      .ease("linear")
      .attr("transform", "translate(" + waveAnimateScale(1) + ",0)")
      .attr("T", 1)
      .each("end", function () {
        wave.attr("T", 0);
        animateWave(config.waveAnimateTime);
      });
  }

  function GaugeUpdater() {
    this.update = function (value) {
      var newFinalValue = parseFloat(value).toFixed(2);
      var textRounderUpdater = function (value) {
        return Math.round(value);
      };
      if (
        parseFloat(newFinalValue) !=
        parseFloat(textRounderUpdater(newFinalValue))
      ) {
        textRounderUpdater = function (value) {
          return parseFloat(value).toFixed(1);
        };
      }
      if (
        parseFloat(newFinalValue) !=
        parseFloat(textRounderUpdater(newFinalValue))
      ) {
        textRounderUpdater = function (value) {
          return parseFloat(value).toFixed(2);
        };
      }

      var textTween = function () {
        var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
        return function (t) {
          this.textContent = textRounderUpdater(i(t)) + percentText;
        };
      };

      text1.transition().duration(config.waveRiseTime).tween("text", textTween);
      text2.transition().duration(config.waveRiseTime).tween("text", textTween);

      var fillPercent =
        Math.max(config.minValue, Math.min(config.maxValue, value)) /
        config.maxValue;
      var waveHeight = fillAreaHeight * waveHeightScale(fillPercent * 100);
      var waveRiseScale = d3.scale
        .linear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([
          fillAreaMargin + fillAreaHeight + waveHeight,
          fillAreaMargin - waveHeight,
        ])
        .domain([0, 1]);
      var newHeight = waveRiseScale(fillPercent);
      var waveScaleX = d3.scale
        .linear()
        .range([0, waveClipWidth])
        .domain([0, 1]);
      var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
      var newClipArea;
      if (config.waveHeightScaling) {
        newClipArea = d3.svg
          .area()
          .x(function (d) {
            return waveScaleX(d.x);
          })
          .y0(function (d) {
            return waveScaleY(
              Math.sin(
                Math.PI * 2 * config.waveOffset * -1 +
                  Math.PI * 2 * (1 - config.waveCount) +
                  d.y * 2 * Math.PI
              )
            );
          })
          .y1(function (d) {
            return fillAreaHeight + waveHeight;
          });
      } else {
        newClipArea = clipArea;
      }

      var newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
      wave
        .transition()
        .duration(0)
        .transition()
        .duration(
          config.waveAnimate
            ? config.waveAnimateTime * (1 - wave.attr("T"))
            : config.waveRiseTime
        )
        .ease("linear")
        .attr("d", newClipArea)
        .attr("transform", "translate(" + newWavePosition + ",0)")
        .attr("T", "1")
        .each("end", function () {
          if (config.waveAnimate) {
            wave.attr("transform", "translate(" + waveAnimateScale(0) + ",0)");
            animateWave(config.waveAnimateTime);
          }
        });
      waveGroup
        .transition()
        .duration(config.waveRiseTime)
        .attr(
          "transform",
          "translate(" + waveGroupXPosition + "," + newHeight + ")"
        );
    };
  }

  return new GaugeUpdater();
}
