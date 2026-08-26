import {useProjects} from "../../../hooks/UseProjects.ts";
import {LucideExternalLink, LucidePencil, LucideTrash2} from "lucide-react";
import {ProjectService} from "../../../services/portfolio/project.service.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/error.handler.ts";

export const ProjectsTab = () => {
    const {projects, refetch} = useProjects();

    const handleDeleteById = async (id: string) => {
        try {
            await ProjectService.deleteById(id);
            await refetch();
            toast.success("You have deleted a project successfully!");
        } catch (err) {
            handleError(err as Error, "Failed to delete a project.");
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-text-primary">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!projects?.content.length ? (
                    <p className="text-text-muted">No projects found.</p>
                ) : (
                    projects.content.map((item) => (
                        <div key={item.id} className="p-4 bg-primary border border-border rounded-lg flex flex-col justify-between gap-3">
                            <div className="space-y-2">
                                {item.imageUrl && (
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded border border-border" />
                                )}
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-text-primary">{item.title}</h3>
                                    <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded text-text-muted">
                                                        {item.status}
                                                    </span>
                                </div>
                                <p className="text-sm text-text-secondary">{item.description}</p>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-border mt-auto">
                                {item.url ? (
                                    <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-url-accent hover:underline">
                                        View Project <LucideExternalLink size={12} />
                                    </a>
                                ) : <span />}

                                <div className="flex gap-1">
                                    <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                        <LucidePencil size={18} />
                                    </button>
                                    <button onClick={() => handleDeleteById(item.id)}
                                            className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                        <LucideTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}