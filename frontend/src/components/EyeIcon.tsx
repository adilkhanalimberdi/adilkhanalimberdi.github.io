interface IconProps {
    className?: string;
}

export const EyeIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12c1.018 4.065 5.02 7 9.964 7 4.944 0 8.946-2.935 9.964-7-1.018-4.066-5.02-7-9.964-7-4.944 0-8.946 2.935-9.964 7Z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
    </svg>
);