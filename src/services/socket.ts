import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = (
    import.meta.env.PROD ? import.meta.env.VITE_URL_PRODUCTION : import.meta.env.VITE_URL_DEVELOPMENT
) as string;

export const socket = io(URL, {
    autoConnect: false,
});
