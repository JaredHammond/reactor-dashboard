import { useRef } from 'react';
import styled from 'styled-components';

const UnstyledLevelGauge = ({level, className}: {level: number, className?: string}) => {
  const svgRef = useRef(null);

  return (
    <svg className={className} ref={svgRef} width='75' height='100' viewBox='0 0 75 100'>
      <rect x='2.5' y='2.5' height='95' width='70' rx='100' ry='25' strokeWidth='5' stroke='green' fill='transparent' />
      <text textAnchor='middle' fontSize='2rem' fill='red' transform='translate(37.5, 65)'>{level}%</text>

      <g clipPath='url(#fillClip)'>
        <rect x='7' y='7' height='86' width='61' rx='100' ry='21.78' fill='green'  />
        <text textAnchor='middle' fontSize='2rem' fill='blue' transform='translate(37.5, 65)'>{level}%</text>
        <defs>
          <clipPath id='fillClip'>
            <rect x='7' y={((100-level) / 100 * 86) + 7} height='100' width='61'/>
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