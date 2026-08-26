interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
    isLoading?: boolean;
}

export const ConfirmModal = ({isOpen, title, message, onConfirm, onClose, isLoading}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-secondary border border-border p-6 rounded-xl w-full max-w-md shadow-lg flex flex-col gap-4">
                <h3 className="text-lg font-bold text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary">{message}</p>
                <div className="flex justify-end gap-3 mt-2">
                    <button onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-lg text-sm bg-primary border border-border text-text-primary hover:bg-hover transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-lg text-sm bg-danger text-text-light transition-colors enabled:hover:bg-danger/80 disabled:opacity-50">
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};