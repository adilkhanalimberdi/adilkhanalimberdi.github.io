import type {LanguageResponse} from "./language.ts";
import type {SkillByCategory} from "./skill.ts";
import type {EducationResponse} from "./education.ts";
import type {ProjectResponse} from "./project.ts";
import type {AboutParagraphResponse} from "./about.paragraph.ts";

export type PortfolioResponse = {
    about: AboutParagraphResponse[];
    education: EducationResponse[];
    projects: ProjectResponse[];
    skills: SkillByCategory[];
    languages: LanguageResponse[];
}