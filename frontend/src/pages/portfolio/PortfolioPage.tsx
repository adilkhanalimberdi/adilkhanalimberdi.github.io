import adilkhan from "@/assets/images/adilkhan.webp";
import {FaGithub, FaLinkedin} from "react-icons/fa";

function PortfolioPage() {
    return (
        <div className="min-h-dvh flex flex-col">

            <nav className="w-full h-20 shrink-0 bg-zinc-800 fixed">
            </nav>

            <main className="flex-1 w-full bg-zinc-900 flex flex-col items-center gap-5 py-10">

                <section className="min-h-dvh flex items-center justify-center px-6">
                    <div className="flex w-full max-w-5xl flex-col items-center gap-5 lg:flex-row lg:gap-20">

                        <img src={adilkhan}
                             className="aspect-square w-50 rounded-full lg:w-75"
                             alt="Profile picture" />

                        <div>
                            <div className="flex flex-col gap-2">
                                <p className="text-[clamp(2rem,4vw,4rem)] font-bold text-white">
                                    Hi, I'm{" "}
                                    <span className="text-violet-500">Adilkhan</span>!
                                </p>

                                <p className="text-white">
                                    A Java Backend Developer
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            <footer className="w-full shrink-0 bg-zinc-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-5">

                    <nav className="flex items-center gap-4" aria-label="Social links">
                        <a href="https://github.com/adilkhanalimberdi"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="GitHub"
                           className="text-2xl text-zinc-300 transition hover:text-white">
                            <FaGithub />
                        </a>

                        <a href="https://www.linkedin.com/"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="LinkedIn"
                           className="text-2xl text-zinc-300 transition hover:text-white">
                            <FaLinkedin />
                        </a>
                    </nav>

                    <p className="text-center text-sm text-zinc-400">
                        &copy; 2026 - Developed by{" "}
                        <a href="https://github.com/adilkhanalimberdi"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-zinc-300 underline transition hover:text-violet-300">
                            Adilkhan Alimberdi
                        </a>
                    </p>

                </div>
            </footer>

        </div>
    );
}

export default PortfolioPage;