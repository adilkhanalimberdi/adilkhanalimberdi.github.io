import { useEffect, useState } from 'react';
import {
    LucideUser, LucideGraduationCap, LucideFolderKanban,
    LucideWrench, LucideGlobe, LucideMail,
    LucideTrash2, LucidePencil,
    LucideCheckCircle2, LucideCircle, LucideExternalLink
} from 'lucide-react';
import CustomToaster from "../../components/CustomToaster.tsx";
import ThemeSwitcher from "../../components/portfolio/ThemeSwitcher.tsx";
import type { ContactMessageResponse } from "../../type/portfolio/contact.message.ts";
import type {
    AboutParagraphResponse,
    EducationResponse,
    LanguageResponse,
    ProjectResponse,
    SkillByCategory
} from "../../type/portfolio/portfolio.ts";
import { AdminService } from "../../services/portfolio/admin.service.ts";
import toast from "react-hot-toast";
import type { PageResponse } from "../../type/pagination.ts";

type Tab = 'contact' | 'about' | 'education' | 'projects' | 'skills' | 'languages';

function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>('contact');

    const [messages, setMessages] = useState<PageResponse<ContactMessageResponse> | null>(null);
    const [aboutParagraphs, setAboutParagraphs] = useState<PageResponse<AboutParagraphResponse> | null>(null);
    const [education, setEducation] = useState<PageResponse<EducationResponse> | null>(null);
    const [projects, setProjects] = useState<PageResponse<ProjectResponse> | null>(null);
    const [skills, setSkills] = useState<SkillByCategory[]>([]);
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);

    useEffect(() => {
        AdminService.getAllContactMessages()
            .then((res) => setMessages(res))
            .catch(() => toast.error("Failed to get contact messages"));

        AdminService.getAllAboutParagraphs()
            .then((res) => setAboutParagraphs(res))
            .catch(() => toast.error("Failed to get about paragraphs"));

        AdminService.getAllEducation()
            .then((res) => setEducation(res))
            .catch(() => toast.error("Failed to get education"));

        AdminService.getAllProjects()
            .then((res) => setProjects(res))
            .catch(() => toast.error("Failed to get projects"));

        AdminService.getAllSkills()
            .then((res) => setSkills(res))
            .catch(() => toast.error("Failed to get skills"));

        AdminService.getAllLanguages()
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

    const deleteMessage = (id: string) => {
        if (!messages) return;
        setMessages({
            ...messages,
            content: messages.content.filter(m => m.id !== id)
        });
    };

    const unreadCount = messages?.content?.filter(m => !m.isViewed).length || 0;

    return (
        <div className="min-h-dvh flex flex-col bg-primary text-text-primary font-sans transition-colors">
            <CustomToaster />

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
                                    <span className="ml-1 bg-accent-secondary text-primary text-xs px-2 py-0.5 rounded-full font-bold">
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
                                messages.content.map((msg) => (
                                    <div key={msg.id}
                                         className={`p-4 rounded-lg border transition-all flex flex-col md:flex-row justify-between gap-4 ${
                                             msg.isViewed
                                                 ? 'bg-primary/50 border-border text-text-muted'
                                                 : 'bg-primary border-accent/40 text-text-primary shadow-sm'
                                         }`}>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-text-primary">{msg.fullName}</span>
                                                <span className="text-xs text-url-accent font-medium">{msg.email}</span>
                                                <span className="text-xs text-text-muted ml-auto">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm mt-2 whitespace-pre-wrap text-text-secondary">{msg.message}</p>
                                        </div>

                                        <div className="flex items-center gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-border">
                                            <button onClick={() => toggleMessageViewed(msg.id)}
                                                    className="p-2 text-text-muted hover:text-accent rounded-lg hover:bg-hover transition-colors cursor-pointer"
                                                    title={msg.isViewed ? "Mark as unread" : "Mark as read"}>
                                                {msg.isViewed ? <LucideCheckCircle2 className="text-accent" size={20} /> : <LucideCircle size={20} />}
                                            </button>

                                            <button onClick={() => deleteMessage(msg.id)}
                                                    className="p-2 text-text-muted hover:text-accent-secondary rounded-lg hover:bg-hover transition-colors cursor-pointer"
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
                                                <button className="p-1.5 hover:text-accent-secondary text-text-muted rounded hover:bg-hover cursor-pointer">
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
                                                <p className="text-sm font-medium text-text-secondary">{item.degree} — {item.speciality}</p>
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
                                                <button className="p-1.5 hover:text-accent-secondary text-text-muted rounded hover:bg-hover cursor-pointer">
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
                                                    <button className="p-1.5 hover:text-accent-secondary text-text-muted rounded hover:bg-hover cursor-pointer">
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
                                                        <button className="p-1 hover:text-accent-secondary text-text-muted rounded hover:bg-hover cursor-pointer">
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
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-text-secondary border-collapse">
                                    <thead className="bg-primary text-text-muted uppercase text-xs border-b border-border">
                                    <tr>
                                        <th className="p-3">Language</th>
                                        <th className="p-3">Level</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                    {languages.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-3 text-text-muted">No languages found.</td>
                                        </tr>
                                    ) : (
                                        languages.map((item) => (
                                            <tr key={item.id} className="hover:bg-hover transition-colors">
                                                <td className="p-3 font-medium text-text-primary">{item.language}</td>
                                                <td className="p-3">
                                                    <span className="bg-primary border border-border px-2 py-0.5 rounded text-xs text-text-secondary">
                                                        {item.level}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-1.5 hover:text-accent text-text-muted rounded hover:bg-hover cursor-pointer">
                                                            <LucidePencil size={18} />
                                                        </button>
                                                        <button className="p-1.5 hover:text-accent-secondary text-text-muted rounded hover:bg-hover cursor-pointer">
                                                            <LucideTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </section>
            </main>
        </div>
    );
}

export default AdminPage;