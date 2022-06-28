import styled from 'styled-components';
import {scaleLinear} from 'd3-scale';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

type FontSize = `${number}rem` | `${number}em` | `${number}px`;

interface LevelGaugeStyle {
  gaugeColor: Color;
  textColor: Color;
  textColor2: Color;
  textSize: FontSize;
  decimalPlaces?: number;
}

interface LevelGaugeData {
  level: number;
  minLevel: number;
  maxLevel: number;
}

interface LevelGaugeProps {
  vesselId: string;
  data: LevelGaugeData;
  styles: LevelGaugeStyle;
  className?: string;
}

const UnstyledLevelGauge = ({vesselId, data, styles, className}: LevelGaugeProps) => {
  const fillScale = scaleLinear()
    .domain([data.minLevel, data.maxLevel])
    .range([93, 7])

  return (
    <svg className={className} width='75' height='100' viewBox='0 0 75 100'>
      <rect x='2.5' y='2.5' height='95' width='70' rx='100' ry='25' strokeWidth='5' stroke={styles.gaugeColor} fill='transparent' />
      <text textAnchor='middle' fontSize={styles.textSize} fill={styles.textColor} transform='translate(37.5, 60)'>
        {data.level.toFixed(styles.decimalPlaces || 0)}
      </text>

      <g clipPath={`url(#fillClip${vesselId})`}>
        <rect x='7' y='7' height='86' width='61' rx='100' ry='21.78' fill='green'  />
        <text textAnchor='middle' fontSize={styles.textSize} fill={styles.textColor2} transform='translate(37.5, 60)'>
          {data.level.toFixed(styles.decimalPlaces || 0)}
        </text>
        <defs>
          <clipPath id={`fillClip${vesselId}`}>
            <rect x='7' y={fillScale(data.level)} height='100' width='61'/>
          </clipPath>
        </defs>
      </g>

    </svg>
  )
}

export const LevelGauge = styled(UnstyledLevelGauge)`
  height: 200px;
  width: 150px;
`