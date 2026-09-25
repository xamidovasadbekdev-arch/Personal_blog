// Address of the backend (portfolio-backend). Set VITE_API_URL to override,
// e.g. http://localhost:8000 in .env.development for local work.
export const API_URL = (import.meta.env.VITE_API_URL || 'https://api.xamidovasadbek.dev').replace(/\/+$/, '');
