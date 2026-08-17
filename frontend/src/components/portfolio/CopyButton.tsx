import {Copy} from "lucide-react";
import toast from "react-hot-toast";

interface CopyButtonProps {
    text: string;
    successMessage: string;
    errorMessage: string;
}

function CopyButton({ text, successMessage, errorMessage }: CopyButtonProps) {
    return (
        <button className="p-1.5 rounded-md text-text-secondary transition-colors duration-200
                hover:bg-hover hover:text-text-primary"
                onClick={() => {
                    navigator.clipboard.writeText(text)
                        .then(() => toast.success(successMessage))
                        .catch(() => toast.error(errorMessage));
                }}>
            <Copy size={16} />
        </button>
    )
}

export default CopyButton;