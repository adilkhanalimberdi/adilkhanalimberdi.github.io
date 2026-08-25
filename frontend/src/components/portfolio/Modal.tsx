import React, { useEffect } from 'react';
import { LucideX } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: React.ReactNode;
    children?: React.ReactNode;

    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;

    isDangerous?: boolean;
    isLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, description, children, confirmText, cancelText = 'Cancel', onConfirm, isDangerous = false, isLoading = false,}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
             onClick={onClose}>
            <div className="relative w-full max-w-lg bg-secondary border border-border rounded-xl shadow-xl p-6 flex flex-col gap-5 text-text-primary animate-in fade-in zoom-in-95 duration-150"
                 onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-border pb-3">
                    {title && <h3 className="text-lg font-bold text-text-primary">{title}</h3>}
                    <button onClick={onClose}
                            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-hover transition-colors cursor-pointer ml-auto"
                            aria-label="Close modal">
                        <LucideX size={18} />
                    </button>
                </div>

                {(description || children) && (
                    <div className="text-sm text-text-secondary leading-relaxed space-y-3">
                        {description && <p>{description}</p>}
                        {children}
                    </div>
                )}

                {(onConfirm || cancelText) && (
                    <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-2">
                        {cancelText && (
                            <button type="button"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-text-secondary hover:bg-hover hover:text-text-primary transition-all cursor-pointer disabled:opacity-50">
                                {cancelText}
                            </button>
                        )}

                        {onConfirm && confirmText && (
                            <button type="button"
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-2 ${
                                        isDangerous
                                            ? 'bg-danger text-text-light hover:opacity-90'
                                            : 'bg-button-primary text-button-primary-text hover:opacity-90'
                                    }`}>
                                {isLoading ? 'Processing...' : confirmText}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};