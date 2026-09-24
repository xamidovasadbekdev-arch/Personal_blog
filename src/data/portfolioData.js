// All site content lives in src/content/ and is edited through the CMS at /admin.
// This module only reshapes it for the components.
import ui from '../content/site/ui.json';
import profileData from '../content/site/profile.json';
import projects from '../content/site/projects.json';
import experience from '../content/site/experience.json';
import skills from '../content/site/skills.json';
import categories from '../content/site/categories.json';

// Returns the string for the current language from a { en, uz } value,
// falling back to English. Plain strings are returned as-is.
export const pick = (value, lang = 'en') =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] || value.en : value;

export const translations = ui;
export const profile = profileData;
export const projectsData = projects.items;
export const experienceTimeline = experience.items;
export const skillsData = skills.items;
export const blogTaxonomy = Object.fromEntries(categories.items.map(category => [category.id, category]));
