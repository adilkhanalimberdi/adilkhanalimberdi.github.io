interface RenderedTextProps {
    text: string;
    className?: string;
}

function RenderedText({ text, className }: RenderedTextProps) {
    const parts = text.split('_');

    return (
        <p className={`text-text-primary ${className}`}>
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