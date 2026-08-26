import {useEducation} from "../../../hooks/UseEducation.ts";
import {LucideExternalLink, LucidePencil, LucideTrash2} from "lucide-react";
import {handleError} from "../../../utils/error.handler.ts";
import {EducationService} from "../../../services/portfolio/education.service.ts";
import toast from "react-hot-toast";

export const EducationTab = () => {
    const {education, refetch} = useEducation();

    const handleDeleteById = async (id: string) => {
        try {
            await EducationService.deleteById(id);
            await refetch();
            toast.success("You have deleted an education successfully!");
        } catch (err) {
            handleError(err as Error, "Failed to delete education.")
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-text-primary">Education</h2>
            <div className="grid grid-cols-1 gap-4">
                {!education?.content.length ? (
                    <p className="text-text-muted">No education records found.</p>
                ) : (
                    education.content.map((item) => (
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
                                {item.description && <p className="text-sm text-text-muted mt-2">{item.description}</p>}
                                {item.url && (
                                    <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-url-accent hover:underline mt-1">
                                        Website <LucideExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                            <div className="flex gap-1 shrink-0 items-start">
                                <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                    <LucidePencil size={18} />
                                </button>
                                <button onClick={() => handleDeleteById(item.id)}
                                        className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                    <LucideTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}