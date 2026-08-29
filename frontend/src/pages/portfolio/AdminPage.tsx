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
import {useUnreadCount} from "../../hooks/UseUnreadCount.ts";

type Tab = 'contact' | 'about' | 'education' | 'projects' | 'skills' | 'languages';

function AdminPage() {
    const {unreadCount, refetchUnreadCount} = useUnreadCount();
    const [activeTab, setActiveTab] = useState<Tab>('contact');

    const adminTabs = [
        { id: 'contact', label: 'Messages', icon: LucideMail },
        { id: 'about', label: 'About', icon: LucideUser },
        { id: 'education', label: 'Education', icon: LucideGraduationCap },
        { id: 'projects', label: 'Projects', icon: LucideFolderKanban },
        { id: 'skills', label: 'Skills', icon: LucideWrench },
        { id: 'languages', label: 'Languages', icon: LucideGlobe },
    ];

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
                    {adminTabs.map(tab => {
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
                                {tab.label === 'Messages' && unreadCount > 0 && (
                                    <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-amber-500 text-black rounded-full">{unreadCount}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <section className="bg-secondary border border-border rounded-xl p-6 shadow-sm">
                    <div className={activeTab === 'contact' ? 'block' : 'hidden'}>
                        <ContactMessagesTab refetchUnreadCount={refetchUnreadCount} />
                    </div>

                    <div className={activeTab === 'about' ? 'block' : 'hidden'}>
                        <AboutTab />
                    </div>

                    <div className={activeTab === 'education' ? 'block' : 'hidden'}>
                        <EducationTab />
                    </div>

                    <div className={activeTab === 'projects' ? 'block' : 'hidden'}>
                        <ProjectsTab />
                    </div>

                    <div className={activeTab === 'skills' ? 'block' : 'hidden'}>
                        <SkillsTab />
                    </div>

                    <div className={activeTab === 'languages' ? 'block' : 'hidden'}>
                        <LanguagesTab />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminPage;