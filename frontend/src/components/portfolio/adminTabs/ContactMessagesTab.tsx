import {useContactMessages} from "../../../hooks/UseContactMessages.ts";
import {LucideCheckCircle2, LucideCircle, LucideTrash2} from "lucide-react";
import {ContactMessageService} from "../../../services/portfolio/contact.message.service.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/error.handler.ts";
import type {ContactMessageResponse} from "../../../type/portfolio/contact.message.ts";
import {useState} from "react";
import {ConfirmModal} from "../ConfirmModal.tsx";

interface ContactMessagesTabProps {
    refetchUnreadCount: () => void,
}

function orderByViewedSortByCreatedAtDesc(array: ContactMessageResponse[]): ContactMessageResponse[] {
    const viewed = array.filter(item => item.isViewed);
    const unviewed = array.filter(item => !item.isViewed);

    const messageComparatorByCreatedAt = (a: ContactMessageResponse, b: ContactMessageResponse) => {
        const time1 = new Date(a.createdAt).getTime();
        const time2 = new Date(b.createdAt).getTime();
        return time1 - time2;
    }

    return [
        ...unviewed.sort((a, b) => 1 - messageComparatorByCreatedAt(a, b)),
        ...viewed.sort((a, b) => 1 - messageComparatorByCreatedAt(a, b)),
    ];
}

export const ContactMessagesTab = ({refetchUnreadCount}: ContactMessagesTabProps) => {
    const {messages, refetch} = useContactMessages();

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const toggleMessageViewed = async (id: string) => {
        if (!messages) return;

        const targetMessage = messages.content.find(m => m.id === id);
        if (!targetMessage) return;

        const willBeViewed = !targetMessage.isViewed;
        const actionText = willBeViewed ? "viewed" : "unviewed";

        try {
            await ContactMessageService.toggleViewed(id);
            await refetch();
            refetchUnreadCount();
            toast.success(`Message successfully marked as ${actionText}!`)
        } catch (err) {
            handleError(err as Error, `Failed to mark message as ${actionText}.`)
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await ContactMessageService.deleteById(deleteId);
            await refetch();
            refetchUnreadCount();
            toast.success("You have deleted a message successfully!");
            setDeleteId(null);
        } catch (err) {
            handleError(err as Error, "Failed to delete message.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <ConfirmModal isOpen={Boolean(deleteId)}
                          title="Delete Message"
                          message="Are you sure you want to delete this language? This action cannot be undone."
                          onConfirm={confirmDelete}
                          onClose={() => setDeleteId(null)}
                          isLoading={isDeleting} />
            <h2 className="text-xl font-semibold mb-2 text-text-primary">Incoming Contact Messages</h2>
            {!messages?.content || messages.content.length === 0 ? (
                <p className="text-text-muted">No messages found.</p>
            ) : (
                orderByViewedSortByCreatedAtDesc(messages.content).map((item) => (
                    <div key={item.id}
                         className={`p-4 rounded-lg border transition-all flex flex-col md:flex-row justify-between gap-4 ${
                             item.isViewed
                                 ? 'bg-primary/50 border-border text-text-muted'
                                 : 'bg-primary border-accent/40 text-text-primary shadow-sm'
                         }`}>
                        <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
                                    <span className="font-bold text-text-primary text-sm sm:text-base">{item.fullName}</span>
                                    <a href={`mailto:${item.email}`} target="_blank" rel="noopener noreferrer"
                                       className="text-xs text-url-accent font-medium break-all hover:text-url-accent/80 hover:underline">{item.email}</a>
                                </div>
                                <span className="text-xs text-text-muted shrink-0 ml-auto sm:ml-0">{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap text-text-secondary wrap-break-word">{item.message}</p>
                        </div>

                        <div className="flex items-center gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-border">
                            <button onClick={() => toggleMessageViewed(item.id)}
                                    className="p-2 text-text-muted hover:text-accent rounded-lg hover:bg-hover transition-colors cursor-pointer"
                                    title={item.isViewed ? "Mark as unread" : "Mark as read"}>
                                {item.isViewed ? <LucideCheckCircle2 className="text-accent" size={20} /> : <LucideCircle size={20} />}
                            </button>

                            <button onClick={() => setDeleteId(item.id)}
                                    className="p-2 text-text-muted hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] rounded-lg hover:bg-hover transition-colors cursor-pointer"
                                    title="Delete message">
                                <LucideTrash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}