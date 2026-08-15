import profileImage from "../../assets/images/adilkhan.webp";
import {FaGithub, FaLinkedin} from "react-icons/fa";

import Navbar from "../../components/Navbar.tsx";

const skills: { category: string, content: string[] }[] = [
    {
        category: "programming",
        content: ["Java", "Python", "SQL"]
    },
    {
        category: "backend",
        content: ["Spring (Core, MVC, Boot, Security, Data, Cloud)", "Hibernate", "REST API", "JWT", "Resilience4j"]
    },
    {
        category: "frontend",
        content: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
        category: "database",
        content: ["PostgreSQL", "Redis", "Flyway (migrations)"]
    },
    {
        category: "testing",
        content: ["JUnit 5", "Mockito", "Pytest", "Selenium"]
    },
    {
        category: "devops",
        content: ["Docker", "Docker Compose", "Git", "GitHub"]
    },
    {
        category: "tools",
        content: ["Maven", "OpenAPI/Swagger", "Postman"]
    }
]

type LanguageLevel = "Elementary" | "Intermediate" | "Advanced" | "Fluent" | "Native/Second language";
const languages: { language: string, level: LanguageLevel }[] = [
    {
        language: "English",
        level: "Advanced",
    },
    {
        language: "Russian",
        level: "Native/Second language"
    },
    {
        language: "Kazakh",
        level: "Native/Second language"
    }
]

const projects: { name: string, description: string, url: string }[] = [
    {
        name: "GoLancer",
        description: "A Freelancer Marketplace built during Java Development with AI Tools program by EPAM.",
        url: "https://github.com/adilkhanalimberdi/golancer"
    },
    {
        name: "Audio Analytics",
        description: "Audio Analytics Pipeline built as a test assignment for the startup. The application accepts audio file from the client and transcripts it and then sends it to the LLM with system prompt for evaluating the call between customer and a service worker",
        url: "https://github.com/adilkhanalimberdi/audioanalyticstask"
    },
    {
        name: "Taspa Studio Telegram Bot",
        description: "Java Spring based Telegram Bot build with Telegram API for a brand.",
        url: "https://github.com/adilkhanalimberdi/abylalkhantelegrambot"
    }
]

function PortfolioPage() {
    return (
        <div className="min-h-dvh flex flex-col">

            <nav className="w-full h-15 shrink-0 bg-secondary fixed top-0 z-50 flex items-center justify-center">

                {Navbar()}

            </nav>

            <main className="flex-1 w-full bg-primary flex flex-col gap-20 py-10 px-6 items-center">

                <section id="home" className="min-h-dvh flex items-center justify-center w-full lg:max-w-5xl">
                    <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-20">

                        <img src={profileImage}
                             className="aspect-square w-50 rounded-full lg:w-75"
                             alt="Profile Image" />

                        <div>
                            <div className="flex flex-col gap-2">
                                <p className="text-[clamp(1.7rem,4vw,4rem)] font-bold text-text-primary">
                                    Hi, I'm{" "}
                                    <span className="text-accent">Adilkhan</span>!
                                </p>

                                <p className="text-text-primary">
                                    A Java Backend Developer
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                <section id="about" className="scroll-mt-20"></section>

                <section id="education" className="scroll-mt-20">
                </section>

                <section id="projects" className="w-full max-w-5xl scroll-mt-20">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-3xl font-semibold text-accent">
                            Projects
                        </h2>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (project.url) {
                                            window.location.assign(project.url);
                                        }
                                    }}
                                    className="group w-full rounded-xl border border-border bg-primary p-5 flex flex-col gap-2 cursor-pointer transition-all duration-200 ease-out
                                        hover:-translate-y-1 hover:border-accent/50 hover:bg-secondary/40 hover:shadow-lg hover:shadow-accent/10 active:translate-y-0">
                                    <p className="text-xl text-text-primary transition-colors duration-200 group-hover:text-accent truncate">
                                        {project.name}
                                    </p>

                                    <div className="line-clamp-3 text-text-secondary">
                                        {project.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="skills" className="w-full max-w-5xl scroll-mt-20">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-3xl font-semibold text-accent">
                            Skills
                        </h2>

                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-5">
                            <div className="flex flex-col gap-3">
                                <p className="text-text-primary text-2xl font-semibold">Technical Skills</p>

                                <div>
                                    {skills.map((skill, index) => {
                                        return (
                                            <div key={index} className="flex flex-row gap-2">
                                                <p className="text-text-primary">{skill.category}: </p>
                                                <p className="text-text-secondary">{skill.content.join(", ")}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-text-primary text-2xl font-semibold">Languages</p>

                                <div>
                                    {languages.map((language, index) => {
                                        return (
                                            <div key={index} className="flex flex-row gap-2">
                                                <p className="text-text-primary">{language.language}: </p>
                                                <p className="text-text-secondary">{language.level}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="w-full shrink-0 bg-secondary">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-5">

                    <nav className="flex items-center gap-4" aria-label="Social links">
                        <a href="https://github.com/adilkhanalimberdi"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="GitHub"
                           className="text-2xl text-text-secondary transition hover:text-text-primary">
                            <FaGithub />
                        </a>

                        <a href="https://www.linkedin.com/in/adilkhan-kerimshe"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="LinkedIn"
                           className="text-2xl text-text-secondary transition hover:text-text-primary">
                            <FaLinkedin />
                        </a>
                    </nav>

                    <p className="text-center text-sm text-text-secondary">
                        &copy; 2026 - Developed by{" "}
                        <a href="https://github.com/adilkhanalimberdi"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-text-secondary underline transition hover:text-url-accent">
                            Adilkhan Alimberdi
                        </a>
                    </p>

                </div>
            </footer>

        </div>
    );
}

export default PortfolioPage;