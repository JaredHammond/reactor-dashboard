import styled from 'styled-components';
import { LevelGauge, LevelGaugeProps } from './LevelGauge';

const Card = styled.div`
    height: clamp(150px,65vw,300px);
    width: clamp(200px, 400px, 92%);
    margin: auto;
    background: whitesmoke;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
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
    padding-left: 1rem;
    padding-top: 1rem;
    line-height: 0.7rem
`

const props: LevelGaugeProps = {
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

export const ReactorInfo = () => {
    return (
        <Card>
            <CardTitle>Titan 2</CardTitle>
            <StyledLevelGauge {...props} />
            <DataBlock>
                <h3>Temperature</h3>
                <span>134.1 °F</span>
                <h3>Pressure</h3>
                <span>34.2 psig</span>
            </DataBlock>
        </Card>
    )
}