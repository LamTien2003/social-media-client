import User from './User';

export default interface Notification {
    id: string;
    sender: User;
    receiver: User;
    type: 'reaction' | 'friend';
    entityId: string;
    isSeen: boolean;
    content?: string;
    createdAt: string;
    updatedAt: string;
}
