export const PressureGaugeSvg = ({className, color}: {className?: string, color: string}) => {
    return (
        <svg className={className} fill={color} stroke={color} viewBox='0 0 100 100'>
            <path d='M 10 100
                     A 10 10 0 0 1 10 80
                     h 80
                     A 10 10 0 0 1 90 100
                     Z
                     M 40 80
                     v -10
                     h 20
                     v 10
                     Z
                     M 47 35
                     A 2.5 2.5 0 0 0 53 40
                     L 70 20
                     Z
                    '/>
            <path d='M 50 70
                     A 30 30 0 0 1 50 5
                     A 30 30 0 0 1 50 70
                     '
                     fill='transparent'
                     strokeWidth='10'
                    />
        </svg>
    )
}