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
                    <TempGaugeSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M272 278.5V112c0-61.87-50.12-112-111.1-112S48 50.13 48 112v166.5c-19.75 24.75-32 55.5-32 89.5c0 79.5 64.5 143.1 144 143.1S304 447.5 304 368C304 334 291.8 303.1 272 278.5zM160 448c-44.13 0-80-35.87-80-79.1c0-25.5 12.25-48.88 32-63.75v-192.3c0-26.5 21.5-48 48-48s48 21.5 48 48v192.3c19.75 14.75 32 38.25 32 63.75C240 412.1 204.1 448 160 448zM160 320c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S186.5 320 160 320z"/></TempGaugeSvg>
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