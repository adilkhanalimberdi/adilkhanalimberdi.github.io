import { useState } from 'react';
import {
    LucideUser, LucideGraduationCap, LucideFolderKanban,
    LucideWrench, LucideGlobe, LucideMail
} from 'lucide-react';
import CustomToaster from "../../components/CustomToaster.tsx";
import ThemeSwitcher from "../../components/portfolio/ThemeSwitcher.tsx";
import {AboutTab} from "../../components/portfolio/adminTabs/AboutTab.tsx";
import {ContactMessagesTab} from "../../components/portfolio/adminTabs/ContactMessagesTab.tsx";
import {EducationTab} from "../../components/portfolio/adminTabs/EducationTab.tsx";
import {ProjectsTab} from "../../components/portfolio/adminTabs/ProjectsTab.tsx";
import {SkillsTab} from "../../components/portfolio/adminTabs/SkillsTab.tsx";
import {LanguagesTab} from "../../components/portfolio/adminTabs/LanguagesTab.tsx";

type Tab = 'contact' | 'about' | 'education' | 'projects' | 'skills' | 'languages';

function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>('contact');

    return (
        <div className={"min-h-dvh flex flex-col bg-primary text-text-primary font-sans transition-colors"}>
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
                        { id: 'contact', label: 'Messages', icon: LucideMail },
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
                            </button>
                        );
                    })}
                </nav>

                <section className="bg-secondary border border-border rounded-xl p-6 shadow-sm">

                    {activeTab === 'contact' && (
                        <ContactMessagesTab />
                    )}

                    {activeTab === "about" && (
                        <AboutTab />
                    )}

                    {activeTab === 'education' && (
                        <EducationTab />
                    )}

                    {activeTab === 'projects' && (
                        <ProjectsTab />
                    )}

                    {activeTab === 'skills' && (
                        <SkillsTab />
                    )}

                    {activeTab === 'languages' && (
                        <LanguagesTab />
                    )}

                </section>
            </main>
        </div>
    );
}

export default AdminPage;