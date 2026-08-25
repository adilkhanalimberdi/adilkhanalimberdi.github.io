interface RenderedTextProps {
    text: string;
    id?: string | number;
    className?: string;
}

function RenderedText({ text, id, className }: RenderedTextProps) {
    const parts = text.split('_');

    return (
        <p key={id} className={`text-text-primary ${className}`}>
            {parts.map((part, index) => {
                const isHighlighted = index % 2 !== 0;

                if (isHighlighted) {
                    return (
                        <span key={index} className="text-accent-secondary">
                        {part}
                        </span>
                );
                }

                return part;
            })}
        </p>
    );
}

export default RenderedText;