import Post from './Post';

export default interface Report {
    id: string;
    reason: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
        postsCount: number;
        reportsCount: number;
    };
    post: Post;
    createdAt: string;
    updatedAt: string;
    createdAtFromNow: string;
    updatedAtFromNow: string;
}
