import {useSkills} from "../../../hooks/UseSkills.ts";
import {LucidePencil, LucideTrash2} from "lucide-react";
import {handleError} from "../../../utils/error.handler.ts";
import {SkillService} from "../../../services/portfolio/skill.service.ts";
import toast from "react-hot-toast";

export const SkillsTab = () => {
    const {skills, refetch} = useSkills();

    const handleDeleteById = async (id: string) => {
        try {
            await SkillService.deleteById(id);
            await refetch();
            toast.success("You have deleted a skill successfully!");
        } catch (err) {
            handleError(err as Error, "Failed to delete a skill.");
        }
    }

    return (
        <div className="flex flex-col gap-6">
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
                                <div key={item.id} className="p-3 bg-primary border border-border rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-text-secondary">{item.content}</span>
                                    <div className="flex gap-1">
                                        <button className="p-1 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                            <LucidePencil size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteById(item.id)}
                                                className="p-1 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                            <LucideTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}