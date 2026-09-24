export function formatDate(iso, lang = 'en') {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
