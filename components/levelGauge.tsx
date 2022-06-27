import { useRef } from 'react';
import styled from 'styled-components';

const UnstyledLevelGauge = ({level, className}: {level: number, className?: string}) => {
  const svgRef = useRef(null);

  return (
    <svg className={className} ref={svgRef} width='75' height='100' viewBox='0 0 75 100'>
      <rect x='2.5' y='2.5' height='95' width='70' rx='100' ry='25' strokeWidth='5' stroke='green' fill='transparent' />
      <rect x='7' y='7' height='86' width='61' rx='100' ry='21.78' fill='green' clipPath='url(#fillclip)' />

      <text textAnchor='middle' fontSize='2rem' fill='white' transform='translate(37.5, 70)'>{level}%</text>
      <defs>
        <rect id='fillClip' x='7' y='7' height={level / 100 * 86} width='61' rx='100' ry='21.78'/>
      </defs>
    </svg>
  )
}

export const LevelGauge = styled(UnstyledLevelGauge)`
  height: 200px;
  width: 150px;
`