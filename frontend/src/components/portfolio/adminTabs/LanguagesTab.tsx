import {useLanguages} from "../../../hooks/UseLanguages.ts";
import {LucideCheck, LucidePencil, LucidePlus, LucideTrash2, X} from "lucide-react";
import {LanguageService} from "../../../services/portfolio/language.service.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/error.handler.ts";
import React, {useState} from "react";
import {ConfirmModal} from "../ConfirmModal.tsx";
import type {LanguageCreateRequest, LanguageLevel} from "../../../type/portfolio/language.ts";

export const LanguagesTab = () => {
    const {languages, refetch} = useLanguages();

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newLanguage, setNewLanguage] = useState<string>("");
    const [newLevel, setNewLevel] = useState<LanguageLevel>("Advanced");

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const clearForm = () => {
        setNewLanguage("");
        setNewLevel("Advanced");
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const request: LanguageCreateRequest = {
            language: newLanguage,
            level: newLevel,
        }

        try {
            await LanguageService.create(request);
            await refetch();
            toast.success("You have created a new language successfully!");
            clearForm();
        } catch (err) {
            handleError(err as Error, "Failed to create language.");
        } finally {
            setIsCreating(false);
        }
    }

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await LanguageService.deleteById(deleteId);
            await refetch();
            toast.success("You have deleted a language successfully!");
            setDeleteId(null);
        } catch (err) {
            handleError(err as Error, "Failed to delete language");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <ConfirmModal isOpen={Boolean(deleteId)}
                          title="Delete Language"
                          message="Are you sure you want to delete this language? This action cannot be undone."
                          onConfirm={confirmDelete}
                          onClose={() => setDeleteId(null)}
                          isLoading={isDeleting} />
            <h2 className="text-xl font-semibold text-text-primary">Languages</h2>
            <div>
                {!languages || languages.length === 0 ? (
                    <p className="text-text-muted">No languages found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {languages.map((item) => (
                            <div key={item.id} className="p-4 h-20 bg-primary border border-border rounded-lg flex justify-between items-center transition-all shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-text-primary text-sm">{item.language}</span>
                                    <span className="w-fit text-xs bg-secondary border border-border px-2 py-0.5 rounded text-text-muted font-medium">{item.level}</span>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover transition-colors cursor-pointer" title="Edit language">
                                        <LucidePencil size={18} />
                                    </button>
                                    <button onClick={() => setDeleteId(item.id)}
                                            className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover transition-colors cursor-pointer" title="Delete language">
                                        <LucideTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className={`h-20 bg-primary border-2 border-dashed border-border/50 text-text-secondary rounded-lg flex justify-center items-center hover:bg-primary/80 hover:border-border hover:text-text-primary transition-all duration-200 ${isCreating ? 'hidden' : ''}`}
                             onClick={() => setIsCreating(true)}>
                            <LucidePlus size={18} />
                        </div>

                        <div className={`${isCreating ? '' : 'hidden'}`}>
                            <form className="flex flex-col gap-1"
                                  onSubmit={(e) => handleCreate(e)}>
                                <div className="flex flex-col gap-1">
                                    <input type="text"
                                           value={newLanguage}
                                           onChange={(e) => setNewLanguage(e.target.value)}
                                           className="w-full pl-3 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                           placeholder="Enter a new language... (required)"
                                           required={true}/>

                                    <select value={newLevel}
                                            required={true}
                                            onChange={(e) => setNewLevel(e.target.value as LanguageLevel)}
                                            className="w-full pl-3 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50">
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native/Fluent">Native/Fluent</option>
                                        <option value="Native">Native</option>
                                    </select>
                                </div>

                                <div className="flex flex-row gap-1 justify-end items-center">
                                    <button type="button"
                                            onClick={() => {
                                                clearForm();
                                                setIsCreating(false);
                                            }}
                                            className="px-3 flex-1 py-1.5 text-sm text-text-primary bg-button-red rounded-md flex flex-row items-center justify-center gap-1 hover:brightness-115 transition-all duration-200">
                                        <X size={18} />
                                        <span>Cancel</span>
                                    </button>
                                    <button type="submit"
                                            className="px-3 flex-1 py-1.5 text-sm text-text-primary bg-button-green rounded-md flex flex-row items-center justify-center gap-1 enabled:hover:brightness-115 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!newLanguage.trim() || !newLevel.trim()}>
                                        <LucideCheck size={16} />
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