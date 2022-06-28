import styled from 'styled-components';
import { LevelGauge, LevelGaugeProps } from './LevelGauge';

const Card = styled.div`
    height: 300px;
    max-width: 400px;
    background: whitesmoke;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: 3rem 1fr;
`
const StyledLevelGauge = styled(LevelGauge)`
    width: 85%;
    margin: auto;
    grid-column: 1;
    grid-row: 2;
`
const CardTitle = styled.h2`
    grid-row: 1;
    grid-column: 1 / 3;
    text-align: center;
    font-size: 1.5rem;
    color: green;
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
            
        </Card>
    )
}