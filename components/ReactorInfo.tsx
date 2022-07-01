import styled from 'styled-components';
import { LevelGauge, LevelGaugeProps } from './LevelGauge';
import { PressureGaugeSvg } from './PressureGaugeSvg'

const Card = styled.div`
    height: clamp(150px,65vw,300px);
    width: clamp(200px, 400px, 92%);
    margin: auto;
    background: whitesmoke;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: 1fr 3rem;
`
const StyledLevelGauge = styled(LevelGauge)`
    width: 85%;
    height: 100%;
    margin: auto;
    grid-column: 1;
    grid-row: 1;
`
const CardTitle = styled.h2`
    grid-row: 2;
    grid-column: 1 / 3;
    text-align: center;
    font-size: 1.5rem;
    color: black;
    align-self: center;
`

const DataBlock = styled.div`
    grid-column: 2;
    grid-row: 1;
    padding-top: 1rem;
    line-height: 2rem;
    text-align: center;
    font-size: 2rem;
`

const TempGaugeSvg = styled.svg`
    height: 2rem;
    display: inline;
    fill: red;
    margin-left: 0.4rem;
`

const StyledPressureGaugeSvg = styled(PressureGaugeSvg)`
    height: 2rem;
    display: inline;
`

const DataGroup = styled.div`
    width: 90%;
    text-align: center;
    margin: 1rem auto;
    display: flex;
    justify-content: space-between
`

export const ReactorInfo = () => {

    const levelGaugeProps: LevelGaugeProps = {
    vesselId: 'titan',
    data: {
      level: 45,
      minLevel: 0,
      maxLevel: 100
    },
    styles: {
      gaugeColor: '#257a22',
      textColor: '#10570e',
      textColor2: '#67c663',
      textSize: '1.5rem'
    }
}

    return (
        <Card>
            <CardTitle>Titan 2</CardTitle>
            <StyledLevelGauge {...levelGaugeProps} />
            <DataBlock>
                <DataGroup>
                    <img src='/images/tempIcon.svg' alt='Thermometer icon' />
                    <span>134.1 °F</span>
                </DataGroup>
                <DataGroup>
                    <StyledPressureGaugeSvg color='blue' />
                    <span>34.2 psig</span>
                </DataGroup>
            </DataBlock>
        </Card>
    )
}