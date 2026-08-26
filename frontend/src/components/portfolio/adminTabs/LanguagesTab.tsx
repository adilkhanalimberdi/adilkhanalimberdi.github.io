import {useLanguages} from "../../../hooks/UseLanguages.ts";
import {LucidePencil, LucideTrash2} from "lucide-react";
import {LanguageService} from "../../../services/portfolio/language.service.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/error.handler.ts";

export const LanguagesTab = () => {
    const {languages, refetch} = useLanguages();

    const handleDeleteById = async (id: string) => {
        try {
            await LanguageService.deleteById(id);
            await refetch();
            toast.success("You have deleted a language successfully!");
        } catch (err) {
            handleError(err as Error, "Failed to delete language");
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-text-primary">Languages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {!languages || languages.length === 0 ? (
                    <p className="text-text-muted col-span-full">No languages found.</p>
                ) : (
                    languages.map((item) => (
                        <div key={item.id} className="p-4 bg-primary border border-border rounded-lg flex justify-between items-center transition-all shadow-sm">
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-text-primary text-sm">{item.language}</span>
                                <span className="w-fit text-xs bg-secondary border border-border px-2 py-0.5 rounded text-text-muted font-medium">
                                                    {item.level}
                                                </span>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover transition-colors cursor-pointer" title="Edit language">
                                    <LucidePencil size={18} />
                                </button>
                                <button onClick={() => handleDeleteById(item.id)}
                                        className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover transition-colors cursor-pointer" title="Delete language">
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