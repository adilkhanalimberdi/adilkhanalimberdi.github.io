import {useAboutParagraphs} from "../../../hooks/UseAboutParagraphs.ts";
import {Check, LucidePencil, LucidePlus, LucideTrash2, X} from "lucide-react";
import {useState} from "react";
import type {AboutParagraphCreateRequest} from "../../../type/portfolio/about.paragraph.ts";
import {AboutParagraphService} from "../../../services/portfolio/about.paragraph.service.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/error.handler.ts";
import RenderedText from "../RenderedText.tsx";
import {ConfirmModal} from "../ConfirmModal.tsx";

export const AboutTab = () => {
    const {paragraphs, refetch} = useAboutParagraphs();

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newParagraph, setNewParagraph] = useState<string>("");

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const clearForm = () => {
        setNewParagraph("");
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const request: AboutParagraphCreateRequest = {
            content: newParagraph,
        }

        try {
            await AboutParagraphService.create(request);
            await refetch();
            toast.success("You have created a new about paragraph successfully!");
            clearForm();
        } catch (err) {
            handleError(err as Error, "Failed to create paragraph.");
        } finally {
            setIsCreating(false);
        }
    }

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await AboutParagraphService.deleteById(deleteId);
            await refetch();
            toast.success("You have deleted a paragraph successfully!");
            setDeleteId(null);
        } catch (error) {
            handleError(error as Error, "Failed to delete a paragraph");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <ConfirmModal isOpen={Boolean(deleteId)}
                          title="Delete Paragraph"
                          message="Are you sure you want to delete this paragraph? This action cannot be undone."
                          onConfirm={confirmDelete}
                          onClose={() => setDeleteId(null)}
                          isLoading={isDeleting} />
            <h2 className="text-xl font-semibold text-text-primary">About Paragraphs</h2>
            <div className="flex flex-col gap-3">
                {!paragraphs?.content.length ? (
                    <p className="text-text-muted">No paragraphs found.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {paragraphs.content.map((item) => (
                            <div key={item.id} className="p-4 bg-primary border border-border rounded-lg flex justify-between gap-4 items-start">
                                <RenderedText text={item.content} className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap" />
                                <div className="flex gap-1 shrink-0">
                                    <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                        <LucidePencil size={18} />
                                    </button>
                                    <button onClick={() => setDeleteId(item.id)}
                                            className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                        <LucideTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className={`p-3 bg-primary border-2 border-dashed border-border/50 text-text-secondary rounded-lg flex justify-center items-center hover:bg-primary/80 hover:border-border hover:text-text-primary transition-all duration-200 ${isCreating ? 'hidden' : ''}`}
                             onClick={() => setIsCreating(true)}>
                            <LucidePlus size={18} />
                        </div>

                        <div className={`${isCreating ? '' : 'hidden'}`}>
                            <form className="flex flex-col gap-2"
                                  onSubmit={(e) => handleCreate(e)}>
                                <textarea name="new-paragraph"
                                          cols={30} rows={5}
                                          value={newParagraph}
                                          onChange={(e) => setNewParagraph(e.target.value)}
                                          className="w-full pl-3 py-2.5 rounded-lg bg-primary border min-h-15 border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                          placeholder="Enter the paragraph content here... (You can wrap words in '_' to highlight them)"
                                          required={true}></textarea>

                                <div className="flex flex-row gap-2 justify-end items-center">
                                    <button className="px-3 py-1.5 text-sm text-text-primary bg-button-red rounded-md flex flex-row items-center gap-1 hover:brightness-115 transition-all duration-200"
                                            type="button"
                                            onClick={() => {
                                                clearForm();
                                                setIsCreating(false);
                                            }}>
                                        <X size={18} />
                                        <span>Cancel</span>
                                    </button>

                                    <button className="px-3 py-1.5 text-sm text-text-primary bg-button-green rounded-md flex flex-row items-center gap-1 enabled:hover:brightness-115 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            type="submit"
                                            disabled={!newParagraph.trim()}>
                                        <Check size={18} />
                                        <span>Save</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}