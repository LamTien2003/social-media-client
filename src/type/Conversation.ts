import Message from './Message';

export default interface Conversation {
    id: string;
    name: string;
    members: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
    }[];
    latestMessage: Message;
    createdAt: string;
    updatedAt: string;
}
