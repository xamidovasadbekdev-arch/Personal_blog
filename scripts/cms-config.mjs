// Builds the Sveltia CMS config (public/admin/config.yml).
//
// Run automatically by vite.config.js on every dev start and build. The UI
// text section is generated from src/content/site/ui.json, so any string added
// there shows up in the admin without touching this file. Structured content
// (projects, timeline, ...) is described explicitly below.
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const readJson = path => JSON.parse(readFileSync(path, 'utf8'));

const humanize = key =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/^./, c => c.toUpperCase())
    .replace(/\bUi\b/, 'UI')
    .replace(/\bUrl\b/, 'URL');

const LANGS = [
  { name: 'en', label: 'English' },
  { name: 'uz', label: "O'zbekcha" },
];

// A field holding { en, uz }.
const bilingual = (name, label, widget = 'string', extra = {}) => ({
  name,
  label,
  widget: 'object',
  ...extra,
  fields: LANGS.map(lang => ({ name: lang.name, label: lang.label, widget })),
});

const string = (name, label, extra = {}) => ({ name, label, widget: 'string', ...extra });
const stringList = (name, label, extra = {}) => ({ name, label, widget: 'list', ...extra });

// Infers CMS fields from an example value (used for the UI text file).
function fieldsFor(value) {
  return Object.entries(value).map(([key, v]) => fieldFor(key, v));
}

function fieldFor(key, value) {
  const label = humanize(key);
  if (Array.isArray(value)) {
    if (value.length && typeof value[0] === 'object') {
      return { name: key, label, widget: 'list', fields: fieldsFor(value[0]) };
    }
    return stringList(key, label);
  }
  if (value && typeof value === 'object') {
    return { name: key, label, widget: 'object', collapsed: true, fields: fieldsFor(value) };
  }
  return { name: key, label, widget: String(value).length > 70 ? 'text' : 'string' };
}

export function buildCmsConfig() {
  const ui = readJson('src/content/site/ui.json');
  const categories = readJson('src/content/site/categories.json').items;
  const projectCategories = Object.entries(ui.en.projects.categories).map(([value, label]) => ({ label, value }));

  const config = {
    backend: {
      name: 'github',
      repo: 'xamidovasadbekdev-arch/Personal_blog',
      branch: 'main',
      commit_messages: {
        create: 'Create {{collection}} “{{slug}}” (via CMS)',
        update: 'Update {{collection}} “{{slug}}” (via CMS)',
        delete: 'Delete {{collection}} “{{slug}}” (via CMS)',
        uploadMedia: 'Upload “{{path}}” (via CMS)',
        deleteMedia: 'Delete “{{path}}” (via CMS)',
      },
    },
    site_url: 'https://xamidovasadbek.dev',
    display_url: 'https://xamidovasadbek.dev',
    media_folder: 'public/uploads',
    public_folder: '/uploads',
    i18n: {
      structure: 'multiple_folders',
      locales: LANGS.map(l => l.name),
      default_locale: 'en',
    },
    collections: [
      {
        name: 'articles',
        label: 'Articles',
        label_singular: 'Article',
        description: 'Blog posts. Write the English version first; the Uzbek version is optional and falls back to English.',
        folder: 'src/content/blog',
        extension: 'md',
        format: 'yaml-frontmatter',
        create: true,
        delete: true,
        i18n: true,
        slug: '{{slug}}',
        identifier_field: 'title',
        summary: '{{title}} · {{date}}',
        sortable_fields: ['date', 'title'],
        fields: [
          { name: 'title', label: 'Title', widget: 'string', i18n: true },
          { name: 'excerpt', label: 'Excerpt', widget: 'text', i18n: true, hint: 'One or two sentences for lists and link previews.' },
          { name: 'date', label: 'Date', widget: 'datetime', format: 'YYYY-MM-DD', time_format: false, i18n: 'duplicate' },
          {
            name: 'category',
            label: 'Category',
            widget: 'select',
            options: categories.map(c => ({ label: c.label.en, value: c.id })),
            i18n: 'duplicate',
          },
          {
            name: 'subcategory',
            label: 'Topic',
            widget: 'select',
            required: false,
            options: [...new Set(categories.flatMap(c => c.subcategories.map(s => s.en)))],
            hint: 'Pick a topic that belongs to the chosen category.',
            i18n: 'duplicate',
          },
          { name: 'tags', label: 'Tags', widget: 'list', required: false, i18n: 'duplicate' },
          { name: 'draft', label: 'Draft (hidden from the site)', widget: 'boolean', default: false, required: false, i18n: 'duplicate' },
          { name: 'body', label: 'Body', widget: 'markdown', i18n: true },
        ],
      },
      {
        name: 'site',
        label: 'Site content',
        description: 'Profile, projects, timeline, skills, blog categories and every piece of UI text.',
        files: [
          {
            name: 'profile',
            label: 'Profile',
            file: 'src/content/site/profile.json',
            format: 'json',
            fields: [
              string('name', 'Name'),
              bilingual('headline', 'Headline'),
              bilingual('subtitle', 'Intro (home page)', 'text'),
              { name: 'bio', label: 'Bio paragraphs', widget: 'list', fields: LANGS.map(l => ({ name: l.name, label: l.label, widget: 'text' })) },
              bilingual('location', 'Location'),
              string('email', 'Email'),
              string('telegram', 'Telegram username'),
              string('telegramUrl', 'Telegram URL'),
              string('linkedin', 'LinkedIn URL'),
              string('github', 'GitHub URL'),
              { name: 'resume', label: 'Résumé file', widget: 'file', hint: 'Upload a PDF; the About page download button uses it.' },
              {
                name: 'terminalStack',
                label: 'Terminal card: stack lines',
                widget: 'list',
                summary: '{{fields.value}}',
                fields: [bilingual('label', 'Label'), string('value', 'Value')],
              },
            ],
          },
          {
            name: 'projects',
            label: 'Projects',
            file: 'src/content/site/projects.json',
            format: 'json',
            fields: [
              {
                name: 'items',
                label: 'Projects',
                label_singular: 'Project',
                widget: 'list',
                summary: '{{fields.title.en}}',
                fields: [
                  string('id', 'ID', { hint: 'Short unique name used in the URL, e.g. car-price-api.' }),
                  bilingual('title', 'Title'),
                  { name: 'category', label: 'Category', widget: 'select', options: projectCategories },
                  bilingual('description', 'Short description (cards)', 'text'),
                  bilingual('longDescription', 'Long description (details popup)', 'text'),
                  stringList('tech', 'Technologies'),
                  string('github', 'GitHub URL', { required: false }),
                  string('demo', 'Live demo URL', { required: false }),
                  { name: 'featured', label: 'Show on home page', widget: 'boolean', default: false, required: false },
                ],
              },
            ],
          },
          {
            name: 'experience',
            label: 'Experience timeline',
            file: 'src/content/site/experience.json',
            format: 'json',
            fields: [
              {
                name: 'items',
                label: 'Entries',
                label_singular: 'Entry',
                widget: 'list',
                summary: '{{fields.role.en}} · {{fields.company.en}}',
                fields: [
                  bilingual('year', 'Dates'),
                  bilingual('role', 'Role'),
                  bilingual('company', 'Company / school'),
                  bilingual('description', 'Description', 'text'),
                ],
              },
            ],
          },
          {
            name: 'skills',
            label: 'Skills',
            file: 'src/content/site/skills.json',
            format: 'json',
            fields: [
              {
                name: 'items',
                label: 'Skill groups',
                label_singular: 'Skill group',
                widget: 'list',
                summary: '{{fields.category.en}}',
                fields: [bilingual('category', 'Group name'), stringList('skills', 'Skills')],
              },
            ],
          },
          {
            name: 'categories',
            label: 'Blog categories',
            file: 'src/content/site/categories.json',
            format: 'json',
            fields: [
              {
                name: 'items',
                label: 'Categories',
                label_singular: 'Category',
                widget: 'list',
                summary: '{{fields.label.en}}',
                fields: [
                  string('id', 'ID', { hint: 'Short name used in URLs and articles, e.g. backend. Changing it unlinks existing articles.' }),
                  bilingual('label', 'Name'),
                  bilingual('description', 'Description', 'text'),
                  {
                    name: 'subcategories',
                    label: 'Topics',
                    widget: 'list',
                    summary: '{{fields.en}}',
                    fields: LANGS.map(l => ({ name: l.name, label: l.label, widget: 'string' })),
                  },
                ],
              },
            ],
          },
          {
            name: 'ui',
            label: 'UI text (buttons, headings, labels)',
            file: 'src/content/site/ui.json',
            format: 'json',
            fields: LANGS.map(lang => ({
              name: lang.name,
              label: lang.label,
              widget: 'object',
              collapsed: true,
              fields: fieldsFor(ui.en),
            })),
          },
        ],
      },
    ],
  };

  return `# Generated by scripts/cms-config.mjs on every build. Edit that file, not this one.\n${YAML.stringify(config)}`;
}
