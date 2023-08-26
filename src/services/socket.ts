import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
    process.env.NODE_ENV === 'production' ? 'https://lamthanhtien-socialmedia.netlify.app/' : 'http://localhost:3000';

export const socket = io(URL, {
    autoConnect: false,
});
