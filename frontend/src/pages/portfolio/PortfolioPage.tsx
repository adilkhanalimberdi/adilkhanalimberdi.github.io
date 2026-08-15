import profileImage from "../../assets/images/adilkhan.webp";
import {FaGithub, FaLinkedin} from "react-icons/fa";

import ThemeSwitcher from "../../components/theme/ThemeSwitcher.tsx";

function PortfolioPage() {
    return (
        <div className="min-h-dvh flex flex-col">

            <nav className="w-full h-15 shrink-0 bg-secondary fixed flex items-center justify-center">

                <div className="flex-1 flex items-center W-full lg:max-w-5xl justify-end px-6">
                    <ThemeSwitcher />
                </div>

            </nav>

            <main className="flex-1 w-full bg-primary flex flex-col gap-5 py-10">

                <section className="min-h-dvh px-6 flex items-center justify-center">
                    <div className="flex w-full flex-col items-center gap-5 lg:max-w-5xl lg:flex-row lg:gap-20">

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