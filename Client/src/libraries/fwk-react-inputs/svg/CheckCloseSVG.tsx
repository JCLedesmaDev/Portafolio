interface Props {
    className: string;
    rollback: () => void
}

export const CheckCloseSVG: React.FC<Props> = ({ className, rollback }) => {
    return (
        <svg onClick={rollback} style={{ cursor: 'pointer' }} className={className} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
    )
}