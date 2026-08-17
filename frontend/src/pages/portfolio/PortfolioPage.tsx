import profileImage from "../../assets/images/adilkhan.webp";
import {FaGithub, FaLinkedin} from "react-icons/fa";

import Navbar from "../../components/portfolio/Navbar.tsx";
import {type JSX, useState} from "react";
import type {ContactMessage} from "../../type/portfolio/contact.message.ts";
import {ContactMessageService} from "../../services/portfolio/contact.message.service.ts";
import {type SubmitEvent} from "react";
import {RiSendPlaneFill} from "react-icons/ri";
import CustomToaster from "../../components/CustomToaster.tsx";
import {Loader2, Mail, MapPin, Phone, Send} from "lucide-react";
import CopyButton from "../../components/portfolio/CopyButton.tsx";
import {FiDownload} from "react-icons/fi";
import type {ErrorResponse} from "../../type/error.ts";
import toast from "react-hot-toast";
import * as axios from "axios";

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
    endDate?: YearMonth,
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

type ValidationErrors = {
    fullName?: string;
    email?: string;
    message?: string;
};

function PortfolioPage() {
    const FULL_NAME_THRESHOLD = 80;
    const EMAIL_THRESHOLD = 80;
    const MESSAGE_THRESHOLD = 3000;

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const clearError = (field: keyof ValidationErrors) => {
        setErrors(prev => ({
            ...prev,
            [field]: undefined
        }));
    };

    const handleSendMessage = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const request: ContactMessage = {
            fullName: fullName,
            email: email,
            message: message,
        };

        setLoading(true);
        try {
            await ContactMessageService.save(request);
            setErrors({});
        } catch (err) {
            if (axios.isAxiosError<ErrorResponse>(err)) {
                const response = err.response?.data;

                if (response?.errors) {
                    setErrors(response.errors);
                } else {
                    toast.error(response?.message ?? "Something went wrong.");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-dvh flex flex-col">

            <CustomToaster />

            <nav className="w-full h-15 shrink-0 bg-secondary fixed top-0 z-50 flex items-center justify-center">

                {Navbar()}

            </nav>

            <main className="flex-1 w-full bg-primary flex flex-col gap-15 py-10 pb-20 px-6 items-center">

                <section id="home" className="min-h-dvh flex items-center justify-center w-full lg:max-w-5xl">
                    <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-20">

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-accent/40 blur-2xl transition-all duration-300 pointer-events-none" />

                            <img src={profileImage}
                                 className="relative aspect-square w-50 rounded-full lg:w-75 select-none object-cover"
                                 alt="Profile Image" />
                        </div>

                        <div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
                                    Hi, I'm <span className="text-accent">Adilkhan</span>!
                                </h1>

                                <p className="text-text-secondary text-lg">
                                    A Java Backend Developer
                                </p>

                                <div className="flex flex-row items-center gap-3 mt-4">
                                    <a href="#contact"
                                       className="bg-accent text-text-light py-2.5 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 cursor-pointer">
                                        Contact Me
                                    </a>

                                    <a href="https://drive.google.com/file/d/1S5Dy9AFJw0hMRnh5sCJqubvJyJRW0r-u/view?usp=drive_link"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="border border-border text-text-primary bg-primary py-2.5 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:border-accent hover:text-accent hover:bg-secondary/40 cursor-pointer flex items-center gap-2">
                                        <FiDownload size={16} />
                                        <span>Download CV</span>
                                    </a>
                                </div>
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

                            <div className="flex flex-col gap-4">
                                {educations.map((education, index) => {
                                    const startDate = `${monthMap[education.startedDate.month]} ${education.startedDate.year}`;
                                    const endDate = education.endDate
                                        ? `${monthMap[education.endDate.month]} ${education.endDate.year}`
                                        : "Present";

                                    return (
                                        <div key={index}
                                             className="w-full border border-border bg-primary rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-border/60 pb-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className={`text-lg font-semibold text-text-primary ${
                                                                education.url ? "cursor-pointer hover:text-accent transition-colors" : ""
                                                            }`}
                                                            onClick={() => {
                                                                if (education.url) {
                                                                    window.open(education.url, "_blank", "noopener,noreferrer");
                                                                }
                                                            }}>{education.institution}</h3>
                                                    </div>

                                                    <p className="text-text-primary text-base">
                                                        {education.degree}, <span className="text-text-secondary">{education.speciality}</span>
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 text-xs shrink-0">
                                                    <span className="bg-secondary/40 text-text-secondary px-3 py-1 rounded-md border border-border">
                                                        {education.place}
                                                    </span>
                                                    <span className="bg-accent/10 text-accent font-medium px-3 py-1 rounded-md border border-accent/20">
                                                        {startDate} - {endDate}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                {education.gpa && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="text-text-secondary">Grade / GPA:</span>
                                                        <span className="bg-secondary/60 text-text-primary border border-border px-2.5 py-0.5 rounded text-xs font-semibold">
                                                            {education.gpa}
                                                        </span>
                                                    </div>
                                                )}

                                                {education.description && (
                                                    <p className="text-text-secondary text-sm leading-relaxed">
                                                        {education.description}
                                                    </p>
                                                )}
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

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {projects.map((project, index) => (
                                    <div key={index}
                                         onClick={() => {
                                             if (project.url) {
                                                 window.open(project.url, "_blank", "noopener,noreferrer");
                                             }
                                         }}
                                         className="group h-52 w-full rounded-xl border border-border bg-primary p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 ease-out
                                         hover:-translate-y-1 hover:border-accent/50 hover:bg-secondary/40 hover:shadow-lg hover:shadow-accent/10 active:translate-y-0">
                                         <div className="flex flex-col gap-2">
                                             <p className="text-xl font-medium text-text-primary transition-colors duration-200 group-hover:text-accent truncate">
                                                 {project.name}
                                             </p>
                                             <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                                                 {project.description}
                                             </p>
                                         </div>

                                         <div className="flex items-center text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                             View Project &rarr;
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
                                    <p className="text-text-primary text-xl font-semibold">Technical Skills</p>

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
                                    <p className="text-text-primary text-xl font-semibold">Languages</p>

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

                    <section id="contact" className="w-full max-w-5xl scroll-mt-20">
                        <div className="flex-2 flex flex-col gap-5">
                            <h2 className="text-3xl font-semibold text-accent">
                                Contact
                            </h2>

                            <div className="flex flex-col md:flex-row gap-15 md:gap-5 items-stretch">
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="flex flex-col gap-0">
                                        <p className="text-text-primary text-lg">Send me a direct message</p>
                                        <p className="text-text-secondary">Have an idea, open opportunity, or just want to connect? Feel free to send a message!</p>
                                    </div>

                                    <form className="flex flex-col gap-3" onSubmit={(e) => handleSendMessage(e)}>
                                        <div className="flex flex-col gap-1">
                                            <input id="name"
                                                   type="text"
                                                   className={`flex-1 w-full text-text-primary border rounded-lg px-2 py-2 focus:ring-2 ring-accent focus:outline-none text-sm ${errors.fullName ? "border-red-500" : "border-border"}`}
                                                   placeholder="Full name"
                                                   value={fullName}
                                                   maxLength={FULL_NAME_THRESHOLD}
                                                   onChange={(e) => {
                                                       setFullName(e.target.value);
                                                       clearError("fullName");
                                                   }}
                                                   required={true} />
                                            {errors.fullName && (
                                                <p className="text-sm text-red-500">
                                                    {errors.fullName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <input id="email"
                                                   type="email"
                                                   className={`flex-1 w-full text-text-primary border rounded-lg px-2 py-2 focus:ring-2 ring-accent focus:outline-none text-sm ${errors.email ? "border-red-500" : "border-border"}`}
                                                   placeholder="Email address"
                                                   value={email}
                                                   maxLength={EMAIL_THRESHOLD}
                                                   onChange={(e) => {
                                                       setEmail(e.target.value);
                                                       clearError("email");
                                                   }}
                                                   required={true} />
                                            {errors.email && (
                                                <p className="text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end gap-0">
                                            <textarea name="message"
                                                      id="message"
                                                      cols={30}
                                                      rows={10}
                                                      value={message}
                                                      maxLength={MESSAGE_THRESHOLD}
                                                      onChange={(e) => {
                                                          setMessage(e.target.value);
                                                          clearError("message");
                                                      }}
                                                      className={`flex w-full text-text-primary border rounded-lg px-2 py-2 focus:ring-2 ring-accent focus:outline-none text-sm resize-none ${errors.message ? "border-red-500" : "border-border"}`}
                                                      placeholder="Message"
                                                      required={true}></textarea>
                                            <div className="flex items-center flex-1 w-full justify-between">
                                                {errors.message ? (
                                                    <p className="text-sm text-red-500">
                                                        {errors.message}
                                                    </p>
                                                ) : (
                                                    <span />
                                                )}

                                                <p className="text-text-secondary text-sm">
                                                    {message.length}/{MESSAGE_THRESHOLD}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <button className="h-10 bg-accent text-text-light px-5 rounded-md transition-all duration-200
                                                hover:bg-accent/80 hover:text-text-light/80
                                                flex items-center justify-center cursor-pointer
                                                disabled:cursor-not-allowed disabled:opacity-70"
                                                    type="submit"
                                                    disabled={loading}>
                                                    {loading ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <RiSendPlaneFill size={16} />
                                                            <span className="text-sm">Send Message</span>
                                                        </span>
                                                    )}
                                                </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="flex flex-col gap-0">
                                        <p className="text-text-primary text-lg">Get in Touch</p>
                                        <p className="text-text-secondary">Feel free to reach out via direct channels or leave a message in the form.</p>
                                    </div>

                                    <div className="flex flex-col gap-3.5 h-full justify-between">
                                        <div className="flex-1 border border-border rounded-lg p-4 flex flex-row items-center gap-6">
                                            <MapPin size={20} className="text-text-secondary shrink-0" />
                                            <div className="w-full flex flex-col gap-0">
                                                <p className="text-text-primary">Location</p>
                                                <p className="text-accent text-sm">Almaty, Kazakhstan / Remote</p>
                                            </div>
                                        </div>

                                        <div className="flex-1 border border-border rounded-lg p-4 flex flex-row items-center gap-6">
                                            <Phone size={20} className="text-text-secondary shrink-0" />
                                            <div className="w-full flex flex-col gap-0">
                                                <p className="text-text-primary">Phone number</p>
                                                <div className="flex flex-row gap-2 items-center justify-between">
                                                    <a href="tel:+77716712905"
                                                       target="_blank"
                                                       rel="noreferrer"
                                                       className="text-accent text-sm hover:text-accent/75 cursor-pointer">+7 771 671 2905</a>
                                                    <CopyButton text={"+77716712905"}
                                                                successMessage={"Phone number copied!"}
                                                                errorMessage={"Failed to copy phone number"} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 border border-border rounded-lg p-4 flex flex-row items-center gap-6">
                                            <Send size={20} className="text-text-secondary shrink-0" />
                                            <div className="w-full flex flex-col gap-0">
                                                <p className="text-text-primary">Telegram</p>
                                                <div className="flex flex-row gap-2 items-center justify-between">
                                                    <a href="https://t.me/adilkhanalimberdi"
                                                       target="_blank"
                                                       rel="noreferrer"
                                                       className="text-accent text-sm hover:text-accent/75 cursor-pointer">@adilkhanalimberdi</a>
                                                    <CopyButton text={"@adilkhanalimberdi"}
                                                                successMessage={"Telegram username copied!"}
                                                                errorMessage={"Failed to copy username"} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 border border-border rounded-lg p-4 flex flex-row items-center gap-6">
                                            <Mail size={20} className="text-text-secondary shrink-0" />
                                            <div className="w-full flex flex-col gap-0">
                                                <p className="text-text-primary">Email Address</p>
                                                <div className="flex flex-row gap-2 items-center justify-between">
                                                    <a href="mailto:adilkhankerimshe@gmail.com"
                                                       target="_blank"
                                                       rel="noreferrer"
                                                       className="text-accent text-sm hover:text-accent/75 cursor-pointer">adilkhankerimshe@gmail.com</a>
                                                    <CopyButton text={"adilkhankerimshe@gmail.com"}
                                                                successMessage={"Email address copied!"}
                                                                errorMessage={"Failed to copy email"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

            </main>

            <footer className="w-full shrink-0 bg-secondary">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-5">

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