import React from 'react';
import { LucideX, LucideCheck, X } from 'lucide-react';
import type { EducationStatus } from "../../../type/portfolio/education.ts";

interface EducationFormDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: {
        institute: string;
        location: string;
        description: string;
        url: string;
        speciality: string;
        degree: string;
        startDate: string;
        endDate: string | null;
        grade: number | null;
        status: EducationStatus;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    isEditing?: boolean;
    clearForm?: () => void;
    isDisabled?: boolean;
}

export const EducationFormDrawer = ({
                                        isOpen,
                                        onClose,
                                        onSubmit,
                                        formData,
                                        setFormData,
                                        isEditing = false,
                                        isDisabled = false // Дефолтное значение
                                    }: EducationFormDrawerProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
            <div className="flex-1" onClick={onClose} />

            <div className="w-full max-w-lg bg-secondary border-l border-border h-full flex flex-col shadow-2xl p-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                    <h3 className="text-xl font-bold text-text-primary">
                        {isEditing ? 'Edit Education' : 'Add New Education'}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-hover rounded-lg text-text-muted hover:text-text-primary transition-colors">
                        <LucideX size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="flex-1 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-text-secondary">Institution *</label>
                            <input type="text"
                                   required={true}
                                   value={formData.institute}
                                   onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                                   placeholder="e.g. SDU University"
                                   className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">Degree *</label>
                                <input type="text"
                                       required={true}
                                       value={formData.degree}
                                       onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                       placeholder="e.g. Bachelor"
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">Speciality *</label>
                                <input type="text"
                                       required={true}
                                       value={formData.speciality}
                                       onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                                       placeholder="e.g. Information Systems"
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">Location</label>
                                <input type="text"
                                       required={true}
                                       value={formData.location}
                                       onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                       placeholder="e.g. Almaty, Kazakhstan"
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"/>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">Status</label>
                                <select value={formData.status}
                                        required={true}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as EducationStatus })}
                                        className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50">
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">Start Date</label>
                                <input type="date"
                                       required={true}
                                       value={formData.startDate}
                                       onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">End Date</label>
                                <input type="date"
                                       value={formData.endDate || ''}
                                       onChange={(e) => setFormData({ ...formData, endDate: e.target.value || null })}
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">GPA / Grade</label>
                                <input type="number"
                                       step="0.01"
                                       value={formData.grade ?? ''}
                                       onChange={(e) => setFormData({ ...formData, grade: e.target.value ? Number(e.target.value) : null })}
                                       placeholder="e.g. 3.5"
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary">URL</label>
                                <input type="url"
                                       value={formData.url}
                                       onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                       placeholder="https://..."
                                       className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-text-secondary">Description</label>
                            <textarea rows={4}
                                      value={formData.description}
                                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                      placeholder="Summary of your studies..."
                                      className="w-full px-2 py-2.5 rounded-lg bg-primary border border-border min-h-15 text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <button type="button"
                                onClick={onClose}
                                className="px-3 py-1.5 text-sm text-text-primary bg-button-red rounded-md flex flex-row items-center gap-1 hover:brightness-115 transition-all duration-200">
                            <X size={18} />
                            <span>Cancel</span>
                        </button>
                        <button type="submit"
                                className="px-3 py-1.5 text-sm text-text-primary bg-button-green rounded-md flex flex-row items-center gap-1 enabled:hover:brightness-115 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isDisabled ||
                                    !formData.institute.trim() ||
                                    !formData.degree.trim() ||
                                    !formData.speciality.trim() ||
                                    !formData.location.trim() ||
                                    !formData.status.trim() ||
                                    !formData.startDate.trim() ||
                                    !formData.description.trim()}>
                            <LucideCheck size={16} />
                            <span>{isEditing ? 'Update' : 'Save'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};