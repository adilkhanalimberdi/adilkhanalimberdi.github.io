import {useState, useEffect, useRef, type JSX} from "react";
import {useTheme} from "./UseTheme.tsx";
import type {Theme} from "./theme.repository.ts";
import SunIcon from "../../assets/icons/SunIcon.tsx";
import MoonIcon from "../../assets/icons/MoonIcon.tsx";
import DesktopIcon from "../../assets/icons/DesktopIcon.tsx";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const options: { value: Theme; label: string; icon: JSX.Element }[] = [
        {
            value: "light",
            label: "Светлая",
            icon: <SunIcon />,
        },
        {
            value: "dark",
            label: "Тёмная",
            icon: <MoonIcon />,
        },
        {
            value: "system",
            label: "Системная",
            icon: <DesktopIcon />,
        },
    ];

    const currentIcon = options.find((opt) => opt.value === theme)?.icon || options[2].icon;

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="
                inline-flex items-center gap-2
                rounded-lg
                border border-border
                bg-primary
                px-3 py-2
                text-sm font-medium
                text-text-secondary
                shadow-sm
                transition-colors
                hover:bg-hover
                focus:outline-none
                focus:ring-2
                focus:ring-accent"
                aria-haspopup="true"
                aria-expanded={isOpen}>
            <span className="text-text-muted">{currentIcon}</span>

            <span className="capitalize">
                {theme === "system"
                    ? "Система"
                    : theme === "dark"
                        ? "Тёмная"
                        : "Светлая"}
            </span>

                <svg className={`h-4 w-4
                        text-text-muted
                        transition-transform
                        ${isOpen ? "rotate-180" : ""}
                    `}
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-xl border border-border bg-secondary p-1 shadow-lg ring-1 ring-black/5">
                    <div className="py-1"
                         role="menu"
                         aria-orientation="vertical">
                        {options.map((option) => {
                            const isSelected = theme === option.value;

                            return (
                                <button key={option.value}
                                        onClick={() => {
                                            setTheme(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors
                                            ${isSelected 
                                            ? `bg-selected font-semibold text-selected-text`
                                            : `text-text-secondary hover:bg-hover hover:text-text-primary`}`}
                                        role="menuitem">
                                    <span className={isSelected
                                                ? "text-text-primary"
                                                : "text-text-muted"}>
                                        {option.icon}
                                    </span>

                                    <span>
                                        {option.label}
                                    </span>

                                    {isSelected && (
                                        <svg className="ml-auto h-4 w-4 text-text-secondary"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
