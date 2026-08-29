import {EducationFormDrawer} from "./EducationFormDrawer.tsx";
import {LucideExternalLink, LucidePencil, LucidePlus, LucideTrash2} from "lucide-react";
import {ConfirmModal} from "../ConfirmModal.tsx";
import type {
    EducationCreateRequest,
    EducationResponse, EducationStatus,
    EducationUpdateRequest
} from "../../../type/portfolio/education.ts";
import {handleError} from "../../../utils/error.handler.ts";
import toast from "react-hot-toast";
import {EducationService} from "../../../services/portfolio/education.service.ts";
import {parseYearMonthString} from "../../../utils/year.month.util.ts";
import {useState} from "react";
import {useEducation} from "../../../hooks/UseEducation.ts";

export const EducationTab = () => {
    const { education, refetch } = useEducation();

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        institute: '',
        location: '',
        description: '',
        url: '',
        speciality: '',
        degree: '',
        startDate: '',
        endDate: null as string | null,
        grade: null as number | null,
        status: 'COMPLETED' as EducationStatus
    });

    const [initialData, setInitialData] = useState<typeof formData | null>(null);

    const clearForm = () => {
        setFormData({
            institute: '',
            location: '',
            description: '',
            url: '',
            speciality: '',
            degree: '',
            startDate: '',
            endDate: null,
            grade: null,
            status: 'COMPLETED'
        });
        setInitialData(null);
    };

    const handleStartEdit = (item: EducationResponse) => {
        const itemState = {
            institute: item.institution || '',
            location: item.location || '',
            description: item.description || '',
            url: item.url || '',
            speciality: item.speciality || '',
            degree: item.degree || '',
            startDate: item.startDate || '',
            endDate: item.endDate || null,
            grade: item.grade ?? null,
            status: item.status || 'COMPLETED'
        };

        setFormData(itemState);
        setInitialData(itemState);
        setEditId(item.id);
        setIsEditing(true);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const request: EducationCreateRequest = {
            institution: formData.institute,
            degree: formData.degree,
            speciality: formData.speciality,
            location: formData.location,
            startDate: parseYearMonthString(formData.startDate),
            endDate: formData.endDate ? parseYearMonthString(formData.endDate) : null,
            grade: formData.grade,
            status: formData.status,
            description: formData.description,
            url: formData.url,
        };

        try {
            await EducationService.create(request);
            await refetch();
            toast.success("Education record created successfully!");
            clearForm();
            setIsCreating(false);
        } catch (err) {
            handleError(err as Error, "Failed to create education.");
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        const request: EducationUpdateRequest = {
            institution: formData.institute,
            degree: formData.degree,
            speciality: formData.speciality,
            location: formData.location,
            startDate: parseYearMonthString(formData.startDate),
            endDate: formData.endDate ? parseYearMonthString(formData.endDate) : undefined,
            grade: formData.grade ?? undefined,
            status: formData.status,
            description: formData.description,
            url: formData.url,
        };

        try {
            await EducationService.update(editId, request);
            await refetch();
            toast.success("Education updated successfully!");
            setIsEditing(false);
            setEditId(null);
            clearForm();
        } catch (err) {
            handleError(err as Error, "Failed to update education.");
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await EducationService.deleteById(deleteId);
            await refetch();
            toast.success("Education record deleted successfully!");
            setDeleteId(null);
        } catch (err) {
            handleError(err as Error, "Failed to delete education.");
        } finally {
            setIsDeleting(false);
        }
    };

    const isFormUnchanged = isEditing && initialData && JSON.stringify(formData) === JSON.stringify(initialData);

    return (
        <div className="flex flex-col gap-6">
            <ConfirmModal isOpen={Boolean(deleteId)}
                          title="Delete Education"
                          message="Are you sure you want to delete this education? This action cannot be undone."
                          onConfirm={confirmDelete}
                          onClose={() => setDeleteId(null)}
                          isLoading={isDeleting} />

            <h2 className="text-xl font-semibold text-text-primary">Education</h2>

            <div className="grid grid-cols-1 gap-4">
                {!education?.content.length ? (
                    <p className="text-text-muted">No education records found.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {education.content.map((item: EducationResponse) => (
                            <div key={item.id} className="p-4 bg-primary border border-border rounded-lg flex justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-text-primary">{item.institution}</h3>
                                        <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded text-text-muted">
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-text-secondary">{item.degree} - {item.speciality}</p>
                                    <p className="text-xs text-text-muted">{item.location} • {item.startDate} - {item.endDate || 'Present'}</p>
                                    {item.description && (
                                        <p className="text-sm text-text-muted mt-2 line-clamp-2">{item.description}</p>
                                    )}
                                    {item.url && (
                                        <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-url-accent hover:underline mt-1">
                                            Website <LucideExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                                <div className="flex gap-1 shrink-0 items-start">
                                    <button onClick={() => handleStartEdit(item)}
                                            className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer transition-colors">
                                        <LucidePencil size={18} />
                                    </button>
                                    <button onClick={() => setDeleteId(item.id)}
                                            className="p-1.5 hover:text-red-400 text-text-muted rounded hover:bg-hover cursor-pointer transition-colors">
                                        <LucideTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className={`p-3 bg-primary border-2 border-dashed border-border/50 text-text-secondary rounded-lg flex justify-center items-center hover:bg-primary/80 hover:border-border hover:text-text-primary transition-all duration-200 cursor-pointer ${isCreating || isEditing ? 'hidden' : ''}`}
                             onClick={() => {
                                 clearForm();
                                 setIsCreating(true);
                             }}>
                            <LucidePlus size={18} />
                        </div>

                        <EducationFormDrawer isOpen={isCreating}
                                             onClose={() => {
                                                setIsCreating(false);
                                                clearForm();
                                             }}
                                             onSubmit={handleCreate}
                                             formData={formData}
                                             setFormData={setFormData} />

                        <EducationFormDrawer isOpen={isEditing}
                                             onClose={()=> {
                                                 setIsEditing(false);
                                                 setEditId(null);
                                                 clearForm();
                                             }}
                                             onSubmit={handleEdit}
                                             formData={formData}
                                             setFormData={setFormData}
                                             isEditing={true}
                                             isDisabled={Boolean(isFormUnchanged)} />
                    </div>
                )}
            </div>
        </div>
    );
};