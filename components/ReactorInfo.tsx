import styled from 'styled-components';
import { LevelGauge, LevelGaugeProps } from './LevelGauge';

const Card = styled.div`
    height: 300px;
    max-width: 400px;
    background: lightcoral;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const StyledLevelGauge = styled(LevelGauge)`
    width: 75%;
    margin: auto;
    grid-column: 1;
`
const props: LevelGaugeProps = {
    vesselId: 'titan',
    data: {
      level: 5,
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
            <StyledLevelGauge {...props} />
        </Card>
    )
}