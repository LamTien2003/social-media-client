export default interface Message {
    id: string;
    sender: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
    };
    conversation: string;
    content: string;
    readBy: string[];
    createdAt: string;
    updatedAt: string;
}
