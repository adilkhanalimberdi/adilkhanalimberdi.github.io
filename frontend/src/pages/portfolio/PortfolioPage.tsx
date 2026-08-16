import profileImage from "../../assets/images/adilkhan.webp";
import {FaGithub, FaLinkedin} from "react-icons/fa";

import Navbar from "../../components/Navbar.tsx";
import type {JSX} from "react";

function processInformation(text: string, id: string | number): JSX.Element {
    const parts = text.split('_');

    return (
        <p key={id} className="text-text-primary">
            {parts.map((part, index) => {
                const isHighlighted = index % 2 !== 0;

                if (isHighlighted) {
                    return (
                        <span key={index} className="text-accent-secondary">
                            {part}
                        </span>
                    );
                }

                return part;
            })}
        </p>
    )
}

const information: string[] = [
    "My name is _Adilkhan_, and I'm 19 years old.",
    "I am a third-year _Information Systems_ student from Kazakhstan.",
    "During my school years, I actively participated in _competitive programming_ olympiads and reached the _republican stage_, which greatly accelerated my coding skills. At the university, I continued competing in _ICPC contests_, building a _solid foundation in DSA_.",
    "Later in my studies, I discovered a passion for Backend Development, focusing heavily on the _Java ecosystem_. My competitive background sparked a strong _curiosity for solving complex architectural challenges_. For me, backend engineering is the perfect mix of building systems and solving hard puzzles.",
    "Currently, I am focusing on developing _scalable, production-grade applications_ and looking for an opportunity to gain _professional backend experience_."
]

const monthMap: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
}
type YearMonth = {
    year: number,
    month: number
}
type Education = {
    institution: string,
    place: string,
    degree: string,
    speciality: string,
    startedDate: YearMonth,
    endDate: YearMonth,
    gpa: number,
    description: string,
    url: string
}
const educations: Education[] = [
    {
        institution: "SDU University",
        place: "Almaty, Kazakhstan",
        degree: "Bachelor of Engineering",
        speciality: "Information Systems",
        startedDate: {
            year: 2024,
            month: 9
        },
        endDate: {
            year: 2028,
            month: 5
        },
        gpa: 3.14,
        description: "I was a part of Art Club, ICPC Club, and AI Lab. Took part in ICPC contests and participated in Cyber Security competitions.",
        url: "https://sdu.edu.kz/"
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

const skills: { category: string, content: string[] }[] = [
    {
        category: "Programming",
        content: ["Java", "Python", "SQL"]
    },
    {
        category: "Backend",
        content: ["Spring (Core, MVC, Boot, Security, Data, Cloud)", "Hibernate", "REST API", "JWT", "Resilience4j"]
    },
    {
        category: "Frontend",
        content: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
        category: "Database",
        content: ["PostgreSQL", "Redis", "Flyway (migrations)"]
    },
    {
        category: "Testing",
        content: ["JUnit 5", "Mockito", "Pytest", "Selenium"]
    },
    {
        category: "DevOps",
        content: ["Docker", "Docker Compose", "Git", "GitHub"]
    },
    {
        category: "Tools",
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

function PortfolioPage() {
    return (
        <div className="min-h-dvh flex flex-col">

            <nav className="w-full h-15 shrink-0 bg-secondary fixed top-0 z-50 flex items-center justify-center">

                {Navbar()}

            </nav>

            <main className="flex-1 w-full bg-primary flex flex-col gap-15 py-10 pb-20 px-6 items-center">

                <section id="home" className="min-h-dvh flex items-center justify-center w-full lg:max-w-5xl">
                    <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-20">

                        <img src={profileImage}
                             className="aspect-square w-50 rounded-full lg:w-75 select-none"
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

                <div className="flex flex-col gap-30">

                    <section id="about" className="w-full max-w-5xl scroll-mt-20">
                        <div className="flex flex-col gap-5">
                            <h2 className="text-3xl font-semibold text-accent">
                                About me
                            </h2>

                            <div className="flex-1 flex flex-col gap-3">
                                {information.map((info, index) => {
                                    return processInformation(info, index)
                                })}
                            </div>
                        </div>
                    </section>

                    <section id="education" className="w-full max-w-5xl scroll-mt-20">
                        <div className="flex flex-col gap-5">
                            <h2 className="text-3xl font-semibold text-accent">
                                Education
                            </h2>

                            <div className="flex flex-col gap-2">
                                {educations.map((education, index) => {
                                    return (
                                        <div key={index}
                                             className="w-full border border-border rounded-xl p-5 flex flex-col gap-5 md:flex-row md:gap-2">
                                            <div className="flex-1">
                                                <p className="text-xl text-text-primary cursor-pointer hover:text-[color-mix(in_srgb,var(--color-accent),white_50%)] transition-all duration-200"
                                                   onClick={() => {
                                                       if (education.url) {
                                                           window.location.assign(education.url);
                                                       }
                                                   }}>
                                                    {education.institution}, {education.place}
                                                </p>

                                                <p className="text-text-primary">
                                                    {education.degree}, {education.speciality}
                                                </p>

                                                <p className="flex flex-row gap-3 items-center text-text-secondary">
                                                    {monthMap[education.startedDate.month]}, {education.startedDate.year} - {monthMap[education.endDate.month]}, {education.endDate.year}
                                                </p>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-text-primary text-lg">
                                                    Grade: {education.gpa}
                                                </p>

                                                <p className="text-text-secondary">
                                                    {education.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
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

                </div>

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