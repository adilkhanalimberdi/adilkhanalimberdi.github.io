import {useProjects} from "../../../hooks/UseProjects.ts";
import {LucideCheck, LucideExternalLink, LucidePencil, LucidePlus, LucideTrash2, X} from "lucide-react";
import {ProjectService} from "../../../services/portfolio/project.service.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/error.handler.ts";
import {ConfirmModal} from "../ConfirmModal.tsx";
import React, {useState} from "react";
import type {ProjectCreateRequest, ProjectStatus, ProjectUpdateRequest} from "../../../type/portfolio/project.ts";
import {normalizeUrl} from "../../../utils/url.util.ts";

export const ProjectsTab = () => {
    const {projects, refetch} = useProjects();

    const [newTitle, setNewTitle] = useState<string>("");
    const [newDescription, setNewDescription] = useState<string>("");
    const [newUrl, setNewUrl] = useState<string>("");
    const [newStatus, setNewStatus] = useState<ProjectStatus>("COMPLETED");
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [editTitle, setEditTitle] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");
    const [editUrl, setEditUrl] = useState<string>("");
    const [editStatus, setEditStatus] = useState<ProjectStatus | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const clearForm = () => {
        setNewTitle("");
        setNewDescription("");
        setNewUrl("");
        setNewStatus("COMPLETED");
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const request: ProjectCreateRequest = {
            title: newTitle,
            description: newDescription,
            url: newUrl,
            status: newStatus
        }

        try {
            await ProjectService.create(request);
            await refetch();
            toast.success("You have created a new project successfully!");
            clearForm();
        } catch (err) {
            handleError(err as Error, "Failed to create project.");
        } finally {
            setIsCreating(false);
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        const request: ProjectUpdateRequest = {
            title: editTitle,
            description: editDescription,
            url: editUrl,
            status: (!editStatus ? undefined : editStatus),
        }
        setIsEditing(true);
        try {
            await ProjectService.update(editId, request);
            await refetch();
            toast.success("You have updated project successfully!");
            setEditId(null);
        } catch (err) {
            handleError(err as Error, "Failed to update project.");
        } finally {
            setIsEditing(false);
        }
    }

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await ProjectService.deleteById(deleteId);
            await refetch();
            toast.success("You have deleted a project successfully!");
            setDeleteId(null);
        } catch (err) {
            handleError(err as Error, "Failed to delete a project.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <ConfirmModal isOpen={Boolean(deleteId)}
                          title="Delete Project"
                          message="Are you sure you want to delete this project? This action cannot be undone."
                          onConfirm={confirmDelete}
                          onClose={() => setDeleteId(null)}
                          isLoading={isDeleting}/>
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
                            <h3 className="text-lg font-bold text-text-primary">Edit Project</h3>
                            <button type="button"
                                    onClick={() => {
                                        setEditId(null);
                                        setIsEditing(false);
                                    }}
                                    className="text-text-muted hover:text-text-primary p-1 rounded-md transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <input type="text"
                                       value={editTitle}
                                       onChange={(e) => setEditTitle(e.target.value)}
                                       placeholder="Enter project title here..."
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                                <select value={editStatus || "COMPLETED"}
                                        onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
                                        className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50">
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="PAUSED">Paused</option>
                                    <option value="ARCHIVED">Archived</option>
                                </select>
                            </div>
                            <textarea cols={30} rows={4}
                                      value={editDescription}
                                      onChange={(e) => setEditDescription(e.target.value)}
                                      className="w-full px-2 py-2.5 rounded-lg bg-primary border min-h-15 border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                      placeholder="Enter description here..."></textarea>
                            <input type="text"
                                   value={editUrl}
                                   onChange={(e) => setEditUrl(e.target.value)}
                                   placeholder="https://..."
                                   className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                        </div>
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
                                    disabled={false}>
                                <LucideCheck size={16} />
                                <span>Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Projects</h2>
            <div>
                {!projects || projects.content.length == 0 ? (
                    <p className="text-text-muted">No projects found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.content.map((item) => (
                            <div key={item.id} className="p-4 h-50 bg-primary border border-border rounded-lg flex flex-col justify-between gap-3">
                                <div className="space-y-2">
                                    {item.imageUrl && (
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded border border-border" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-text-primary">{item.title}</h3>
                                        <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded text-text-muted">{item.status}</span>
                                    </div>
                                    <p className="text-sm text-text-secondary line-clamp-3">{item.description}</p>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border mt-auto">
                                    {item.url ? (
                                        <a href={normalizeUrl(item.url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-url-accent hover:underline">
                                            View Project <LucideExternalLink size={12} />
                                        </a>
                                    ) : <span />}

                                    <div className="flex gap-1">
                                        <button onClick={() => {
                                                    setEditId(item.id);
                                                    setIsEditing(true);
                                                    setEditTitle(item.title);
                                                    setEditDescription(item.description);
                                                    setEditUrl(item.url || "");
                                                    setEditStatus(item.status);
                                                }}
                                                className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                            <LucidePencil size={18} />
                                        </button>
                                        <button onClick={() => setDeleteId(item.id)}
                                                className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                            <LucideTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className={`h-50 bg-primary border-2 border-dashed border-border/50 text-text-secondary rounded-lg flex justify-center items-center hover:bg-primary/80 hover:border-border hover:text-text-primary transition-all duration-200 ${isCreating ? 'hidden' : ''}`}
                             onClick={() => setIsCreating(true)}>
                            <LucidePlus size={18} />
                        </div>

                        <div className={`${isCreating ? '' : 'hidden'}`}>
                            <form className="flex flex-col gap-1"
                                  onSubmit={(e) => handleCreate(e)}>
                                <div className="flex flex-col gap-1">
                                    <input type="text"
                                           value={newTitle}
                                           onChange={(e) => setNewTitle(e.target.value)}
                                           className="w-full pl-3 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                           placeholder="Enter a new project's title..."
                                           required={true}/>

                                    <textarea name="new-paragraph"
                                              cols={30} rows={5}
                                              value={newDescription}
                                              onChange={(e) => setNewDescription(e.target.value)}
                                              className="w-full pl-3 py-2.5 rounded-lg bg-primary border min-h-15 border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                              placeholder="Enter the project description..."
                                              required={true}></textarea>
                                </div>

                                <div className="flex flex-row gap-1">
                                    <input type="text"
                                           value={newUrl}
                                           onChange={(e) => setNewUrl(e.target.value)}
                                           className="w-full pl-3 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                           placeholder="https://..."
                                           required={true}/>

                                    <select value={newStatus}
                                            required={true}
                                            onChange={(e) => setNewStatus(e.target.value as ProjectStatus)}
                                            className="w-full pl-3 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50">
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="PAUSED">Paused</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </div>

                                <div className="flex flex-row gap-1">
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
                                            disabled={!newTitle.trim() ||
                                                      !newDescription.trim() ||
                                                      !newStatus.trim()}>
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