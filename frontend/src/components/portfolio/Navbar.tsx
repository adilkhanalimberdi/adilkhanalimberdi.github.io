import ThemeSwitcher from "./ThemeSwitcher.tsx";
import {useState} from "react";
import {HiMenu} from "react-icons/hi";
import {HiXMark} from "react-icons/hi2";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex items-center justify-center">
            <div className="hidden md:flex flex-1 items-center justify-end gap-5 w-full lg:max-w-5xl px-6">
                <nav className="flex-1 flex gap-8 text-text-primary">
                    <a href="#about" className="hover:text-accent transition">About</a>
                    <a href="#education" className="hover:text-accent transition">Education</a>
                    <a href="#projects" className="hover:text-accent transition">Projects</a>
                    <a href="#skills" className="hover:text-accent transition">Skills</a>
                    <a href="#contact" className="hover:text-accent transition">Contact</a>
                </nav>

                <ThemeSwitcher />
            </div>

            <div className="md:hidden w-full flex items-center justify-end gap-5 px-6">
                <ThemeSwitcher />

                <button type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-text-primary text-3xl p-1 rounded-lg border border-border bg-primary shadow-sm transition-colors hover:bg-hover focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}>
                    {isOpen ? <HiXMark /> : <HiMenu />}
                </button>
            </div>

            {isOpen && (
                <nav className="md:hidden absolute top-15 left-0 w-full bg-secondary border-b border-border p-6">
                    <div className="flex flex-col gap-5 text-text-primary">
                        <a href="#about" onClick={() => setIsOpen(false)}>
                            About
                        </a>

                        <a href="#education" onClick={() => setIsOpen(false)}>
                            Education
                        </a>

                        <a href="#projects" onClick={() => setIsOpen(false)}>
                            Projects
                        </a>

                        <a href="#skills" onClick={() => setIsOpen(false)}>
                            Skills
                        </a>

                        <a href="#contact" onClick={() => setIsOpen(false)}>
                            Contact
                        </a>
                    </div>
                </nav>
            )}
        </div>
    );
}

export default Navbar;