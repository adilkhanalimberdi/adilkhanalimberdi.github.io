import {useSkills} from "../../../hooks/UseSkills.ts";
import {LucideCheck, LucidePencil, LucidePlus, LucideTrash2, X} from "lucide-react";
import {handleError} from "../../../utils/error.handler.ts";
import {SkillService} from "../../../services/portfolio/skill.service.ts";
import toast from "react-hot-toast";
import React, {useMemo, useState} from "react";
import {ConfirmModal} from "../ConfirmModal.tsx";
import type {
    SkillCategory,
    SkillCreateRequest,
    SkillUpdateRequest
} from "../../../type/portfolio/skill.ts";

export const SkillsTab = () => {
    const {skills, refetch} = useSkills();

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<SkillCategory | null>(null);
    const [newSkill, setNewSkill] = useState<string>("");

    const [editSkill, setEditSkill] = useState<string>("");
    const [editId, setEditId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const clearForm = () => {
        setNewSkill("");
        setNewCategory(null);
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory || !newSkill.trim()) return;

        const request: SkillCreateRequest = {
            category: newCategory,
            content: newSkill,
        }

        try {
            await SkillService.create(request);
            await refetch();
            toast.success("You have created a new skill successfully!");
            clearForm();
        } catch (err) {
            handleError(err as Error, "Failed to create skill.");
        } finally {
            setIsCreating(false);
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        const request: SkillUpdateRequest = {
            content: editSkill,
        }
        setIsEditing(true);
        try {
            await SkillService.update(editId, request);
            await refetch();
            toast.success("You have updated skill successfully!");
            setEditId(null);
        } catch (err) {
            handleError(err as Error, "Failed to update skill.");
        } finally {
            setIsEditing(false);
        }
    }

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await SkillService.deleteById(deleteId);
            await refetch();
            toast.success("You have deleted a skill successfully!");
            setDeleteId(null);
        } catch (err) {
            handleError(err as Error, "Failed to delete a skill.");
        } finally {
            setIsDeleting(false);
        }
    }

    const currentSkill = useMemo(() => {
        if (!editId) return null;

        for (const group of skills) {
            const found = group.content.find((skill) => skill.id === editId);
            if (found) return found;
        }
        return null;
    }, [skills, editId]);

    const isUpdateDisabled =
        !editSkill.trim() ||
        (currentSkill !== null && currentSkill.content === editSkill);

    return (
        <div className="flex flex-col gap-6">
            <ConfirmModal isOpen={Boolean(deleteId)}
                          title="Delete Skill"
                          message="Are you sure you want to delete this skill? This action cannot be undone."
                          onConfirm={confirmDelete}
                          onClose={() => setDeleteId(null)}
                          isLoading={isDeleting} />
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in ${isEditing ? '' : 'hidden'}`}
                 onClick={() => {
                     setEditId(null);
                     setIsEditing(false);
                 }}>
                <div className="bg-secondary border border-border p-6 rounded-xl w-full max-w-lg shadow-lg flex flex-col gap-4"
                     onClick={(e) => e.stopPropagation()}>
                    <form className="flex flex-col gap-4"
                          onSubmit={(e) => handleEdit(e)}>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-primary">Edit Skill</h3>
                            <button type="button"
                                    onClick={() => {
                                        setEditId(null);
                                        setIsEditing(false);
                                    }}
                                    className="text-text-muted hover:text-text-primary p-1 rounded-md transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <input type="text"
                               value={editSkill}
                               onChange={(e) => setEditSkill(e.target.value)}
                               placeholder="Enter skill content here..."
                               className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                        <div className="flex justify-end gap-2">
                            <button type="button"
                                    onClick={() => {
                                        setEditId(null);
                                        setIsEditing(false);
                                    }}
                                    className="px-3 py-1.5 text-sm text-text-primary bg-button-red rounded-md flex flex-row items-center gap-1 hover:brightness-115 transition-all duration-200">
                                <X size={18} />
                                <span>Cancel</span>
                            </button>
                            <button type="submit"
                                    className="px-3 py-1.5 text-sm text-text-primary bg-button-green rounded-md flex flex-row items-center gap-1 enabled:hover:brightness-115 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isUpdateDisabled}>
                                <LucideCheck size={16} />
                                <span>Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Skills</h2>
            {skills.length === 0 ? (
                <p className="text-text-muted">No skills found.</p>
            ) : (
                skills.map((categoryGroup) => (
                    <div key={categoryGroup.category} className="space-y-3">
                        <h3 className="text-md font-bold text-text-primary border-b border-border pb-1">
                            {categoryGroup.category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {categoryGroup.content.map((item) => (
                                <div key={item.id} className="p-3 h-12 bg-primary border border-border rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-text-secondary">{item.content}</span>
                                    <div className="flex gap-1">
                                        <button onClick={() => {
                                                    setEditId(item.id);
                                                    setIsEditing(true);
                                                    setEditSkill(item.content);
                                                }}
                                                className="p-1 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                            <LucidePencil size={16} />
                                        </button>
                                        <button onClick={() => setDeleteId(item.id)}
                                                className="p-1 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                            <LucideTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className={`p-3 bg-primary border-2 border-dashed border-border/50 text-text-secondary rounded-lg flex justify-center items-center hover:bg-primary/80 hover:border-border hover:text-text-primary transition-all duration-200 ${isCreating ? 'hidden' : ''}`}
                                 onClick={() => {
                                     setIsCreating(true);
                                     setNewCategory(categoryGroup.category as SkillCategory);
                                 }}>
                                <LucidePlus size={18} />
                            </div>

                            {categoryGroup.category === newCategory && (
                                <div className={`${isCreating ? '' : 'hidden'}`}>
                                    <form className="flex flex-col gap-2"
                                          onSubmit={(e) => handleCreate(e)}>
                                        <input type="text"
                                               value={newSkill}
                                               onChange={(e) => setNewSkill(e.target.value)}
                                               className="w-full h-12 pl-3 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                               placeholder="Enter a new skill... (required)"
                                               required={true}/>

                                        <div className="flex flex-row gap-1">
                                            <button type="button"
                                                    onClick={() => {
                                                        clearForm();
                                                        setIsCreating(false);
                                                    }}
                                                    className="px-3 flex-1 py-1.5 text-sm text-text-primary bg-button-red rounded-md flex flex-row justify-center items-center gap-1 hover:brightness-115 transition-all duration-200">
                                                <X size={18} />
                                                <span>Cancel</span>
                                            </button>
                                            <button type="submit"
                                                    className="px-3 flex-1 py-1.5 text-sm text-text-primary bg-button-green rounded-md flex flex-row justify-center items-center gap-1 enabled:hover:brightness-115 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!newSkill.trim()}>
                                                <LucideCheck size={16} />
                                                <span>Save</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}