import Comment from '@/type/Comment';

export default interface Post {
    id: string;
    user: {
        firstName: string;
        lastName: string;
        photo: string;
        id: string;
        ban?: boolean;
    };
    content: string;
    imagePost: string[];
    likes: {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            photo: string;
        };
        emotion: 'like' | 'haha' | 'sad' | 'angry' | 'wow';
    }[];
    comments: Comment[];
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    createdAtFromNow: string;
    updatedAtFromNow: string;
}
