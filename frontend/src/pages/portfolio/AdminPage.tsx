import { useEffect, useState } from 'react';
import {
    LucideUser, LucideGraduationCap, LucideFolderKanban,
    LucideWrench, LucideGlobe, LucideMail,
    LucideTrash2, LucidePencil,
    LucideCheckCircle2, LucideCircle, LucideExternalLink, Loader2
} from 'lucide-react';
import CustomToaster from "../../components/CustomToaster.tsx";
import ThemeSwitcher from "../../components/portfolio/ThemeSwitcher.tsx";
import type { ContactMessageResponse } from "../../type/portfolio/contact.message.ts";
import toast from "react-hot-toast";
import type { PageResponse } from "../../type/pagination.ts";
import { Modal } from "../../components/portfolio/Modal.tsx";
import {AboutParagraphService} from "../../services/portfolio/about.paragraph.service.ts";
import {ContactMessageService} from "../../services/portfolio/contact.message.service.ts";
import {EducationService} from "../../services/portfolio/education.service.ts";
import {ProjectService} from "../../services/portfolio/project.service.ts";
import {SkillService} from "../../services/portfolio/skill.service.ts";
import {LanguageService} from "../../services/portfolio/language.service.ts";
import type {AboutParagraphResponse} from "../../type/portfolio/about.paragraph.ts";
import type {EducationResponse} from "../../type/portfolio/education.ts";
import type {ProjectResponse} from "../../type/portfolio/project.ts";
import type {SkillByCategory} from "../../type/portfolio/skill.ts";
import type {LanguageResponse} from "../../type/portfolio/language.ts";

type Tab = 'contact' | 'about' | 'education' | 'projects' | 'skills' | 'languages';

type DeleteTarget = {
    type: Tab;
    id: string;
    label: string;
};

const DELETE_CONFIG: Record<Tab, { title: string; description: (label: string) => string }> = {
    contact: {
        title: 'Delete Message',
        description: () => 'Are you sure you want to delete this contact message? This action cannot be undone.',
    },
    about: {
        title: 'Delete Paragraph',
        description: () => 'Are you sure you want to delete this about paragraph? This action cannot be undone.',
    },
    education: {
        title: 'Delete Education',
        description: (label) => `Are you sure you want to delete "${label}" from your education? This action cannot be undone.`,
    },
    projects: {
        title: 'Delete Project',
        description: (label) => `Are you sure you want to delete "${label}"? This action cannot be undone.`,
    },
    skills: {
        title: 'Delete Skill',
        description: (label) => `Are you sure you want to delete "${label}"? This action cannot be undone.`,
    },
    languages: {
        title: 'Delete Language',
        description: (label) => `Are you sure you want to delete "${label}"? This action cannot be undone.`,
    },
};

function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>('contact');

    const [messages, setMessages] = useState<PageResponse<ContactMessageResponse> | null>(null);
    const [aboutParagraphs, setAboutParagraphs] = useState<PageResponse<AboutParagraphResponse> | null>(null);
    const [education, setEducation] = useState<PageResponse<EducationResponse> | null>(null);
    const [projects, setProjects] = useState<PageResponse<ProjectResponse> | null>(null);
    const [skills, setSkills] = useState<SkillByCategory[]>([]);
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);

    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

    useEffect(() => {
        ContactMessageService.getAllContactMessages()
            .then((res) => setMessages(res))
            .catch(() => toast.error("Failed to get contact messages"));

        AboutParagraphService.getAllAboutParagraphs()
            .then((res) => setAboutParagraphs(res))
            .catch(() => toast.error("Failed to get about paragraphs"));

        EducationService.getAllEducation()
            .then((res) => setEducation(res))
            .catch(() => toast.error("Failed to get education"));

        ProjectService.getAllProjects()
            .then((res) => setProjects(res))
            .catch(() => toast.error("Failed to get projects"));

        SkillService.getAllSkills()
            .then((res) => setSkills(res))
            .catch(() => toast.error("Failed to get skills"));

        LanguageService.getAllLanguages()
            .then((res) => setLanguages(res))
            .catch(() => toast.error("Failed to get languages"));
    }, []);

    const toggleMessageViewed = (id: string) => {
        if (!messages) return;
        setMessages({
            ...messages,
            content: messages.content.map(m => m.id === id ? { ...m, isViewed: !m.isViewed } : m)
        });
    };

    const requestDelete = (type: Tab, id: string, label: string) => {
        setDeleteTarget({ type, id, label });
    };

    const closeDeleteModal = () => setDeleteTarget(null);

    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        const { type, id } = deleteTarget;

        closeDeleteModal();
        setIsDeleting(true);

        try {
            switch (type) {
                case 'contact':
                    await ContactMessageService.deleteById(id);
                    setMessages(prev => prev ? { ...prev, content: prev.content.filter(m => m.id !== id) } : prev);
                    break;

                case 'about':
                    await AboutParagraphService.deleteById(id);
                    setAboutParagraphs(prev => prev ? { ...prev, content: prev.content.filter(p => p.id !== id) } : prev);
                    break;

                case 'education':
                    await EducationService.deleteById(id);
                    setEducation(prev => prev ? { ...prev, content: prev.content.filter(e => e.id !== id) } : prev);
                    break;

                case 'projects':
                    await ProjectService.deleteById(id);
                    setProjects(prev => prev ? { ...prev, content: prev.content.filter(p => p.id !== id) } : prev);
                    break;

                case 'skills':
                    await SkillService.deleteById(id);
                    setSkills(prev => prev.map(group => ({
                        ...group,
                        content: group.content.filter(s => s.id !== id)
                    })));
                    break;

                case 'languages':
                    await LanguageService.deleteById(id);
                    setLanguages(prev => prev.filter(l => l.id !== id));
                    break;
            }

            toast.success("Deleted successfully");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
        }
    };

    const unreadCount = messages?.content?.filter(m => !m.isViewed).length || 0;

    const modalConfig = deleteTarget ? DELETE_CONFIG[deleteTarget.type] : null;

    return (
        <div className={"min-h-dvh flex flex-col bg-primary text-text-primary font-sans transition-colors"}>
            <CustomToaster />

            <div className={`fixed inset-0 z-60 flex justify-center items-center ${isDeleting ? '' : 'hidden'}`}>
                <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--theme-primary),black_60%)]/40 blur" />
                <Loader2 size={26} className="animate-spin relative" />
            </div>

            <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 py-10 px-6">
                <div className="flex justify-between items-center border-b border-border pb-5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-wide text-text-primary">
                            Portfolio Admin Dashboard
                        </h1>
                    </div>

                    <ThemeSwitcher />
                </div>

                <nav className="flex gap-2 border-b border-border overflow-x-auto pb-2">
                    {[
                        { id: 'contact', label: 'Messages', icon: LucideMail, badge: unreadCount },
                        { id: 'about', label: 'About', icon: LucideUser },
                        { id: 'education', label: 'Education', icon: LucideGraduationCap },
                        { id: 'projects', label: 'Projects', icon: LucideFolderKanban },
                        { id: 'skills', label: 'Skills', icon: LucideWrench },
                        { id: 'languages', label: 'Languages', icon: LucideGlobe },
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id}
                                    onClick={() => setActiveTab(tab.id as Tab)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-button-primary text-button-primary-text shadow-sm'
                                            : 'text-text-secondary hover:bg-hover hover:text-text-primary'
                                    }`}>
                                <Icon size={18} />
                                {tab.label}
                                {tab.badge ? (
                                    <span className="ml-1 bg-badge text-primary text-xs px-2 py-0.5 rounded-full font-bold">
                                        {tab.badge}
                                    </span>
                                ) : null}
                            </button>
                        );
                    })}
                </nav>

                <section className="bg-secondary border border-border rounded-xl p-6 shadow-sm">

                    {activeTab === 'contact' && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold mb-2 text-text-primary">Incoming Contact Messages</h2>
                            {!messages?.content || messages.content.length === 0 ? (
                                <p className="text-text-muted">No messages found.</p>
                            ) : (
                                messages.content.sort((a, b) => a.isViewed ? 1 : (b.isViewed ? -1 : 0)).map((msg) => (
                                    <div key={msg.id}
                                         className={`p-4 rounded-lg border transition-all flex flex-col md:flex-row justify-between gap-4 ${
                                             msg.isViewed
                                                 ? 'bg-primary/50 border-border text-text-muted'
                                                 : 'bg-primary border-accent/40 text-text-primary shadow-sm'
                                         }`}>
                                        <div className="flex-1 space-y-2 min-w-0">
                                            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
                                                    <span className="font-bold text-text-primary text-sm sm:text-base">{msg.fullName}</span>
                                                    <span className="text-xs text-url-accent font-medium break-all">{msg.email}</span>
                                                </div>
                                                <span className="text-xs text-text-muted shrink-0 ml-auto sm:ml-0">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm whitespace-pre-wrap text-text-secondary wrap-break-word">{msg.message}</p>
                                        </div>

                                        <div className="flex items-center gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-border">
                                            <button onClick={() => toggleMessageViewed(msg.id)}
                                                    className="p-2 text-text-muted hover:text-accent rounded-lg hover:bg-hover transition-colors cursor-pointer"
                                                    title={msg.isViewed ? "Mark as unread" : "Mark as read"}>
                                                {msg.isViewed ? <LucideCheckCircle2 className="text-accent" size={20} /> : <LucideCircle size={20} />}
                                            </button>

                                            <button onClick={() => requestDelete('contact', msg.id, msg.fullName)}
                                                    className="p-2 text-text-muted hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] rounded-lg hover:bg-hover transition-colors cursor-pointer"
                                                    title="Delete message">
                                                <LucideTrash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="flex flex-col gap-6">
                            <h2 className="text-xl font-semibold text-text-primary">About Paragraphs</h2>
                            <div className="flex flex-col gap-3">
                                {!aboutParagraphs?.content.length ? (
                                    <p className="text-text-muted">No paragraphs found.</p>
                                ) : (
                                    aboutParagraphs.content.map((item) => (
                                        <div key={item.id} className="p-4 bg-primary border border-border rounded-lg flex justify-between gap-4 items-start">
                                            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{item.content}</p>
                                            <div className="flex gap-1 shrink-0">
                                                <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                                    <LucidePencil size={18} />
                                                </button>
                                                <button onClick={() => requestDelete('about', item.id, item.content.slice(0, 40))}
                                                        className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                                    <LucideTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'education' && (
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
                                                <button onClick={() => requestDelete('education', item.id, item.institution)}
                                                        className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover cursor-pointer">
                                                    <LucideTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
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
                                                    <button onClick={() => requestDelete('projects', item.id, item.title)}
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
                    )}

                    {activeTab === 'skills' && (
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
                                            {categoryGroup.content.map((skill) => (
                                                <div key={skill.id} className="p-3 bg-primary border border-border rounded-lg flex justify-between items-center">
                                                    <span className="text-sm text-text-secondary">{skill.content}</span>
                                                    <div className="flex gap-1">
                                                        <button className="p-1 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                                            <LucidePencil size={16} />
                                                        </button>
                                                        <button onClick={() => requestDelete('skills', skill.id, skill.content)}
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
                    )}

                    {activeTab === 'languages' && (
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
                                                <button onClick={() => requestDelete('languages', item.id, item.language)}
                                                        className="p-1.5 hover:text-[color-mix(in_srgb,var(--theme-danger),white_30%)] text-text-muted rounded hover:bg-hover transition-colors cursor-pointer" title="Delete language">
                                                    <LucideTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                </section>
            </main>

            <Modal
                isOpen={deleteTarget !== null}
                onClose={closeDeleteModal}
                title={modalConfig?.title}
                description={modalConfig && deleteTarget ? modalConfig.description(deleteTarget.label) : undefined}
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default AdminPage;