export default interface Comment {
    id: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
    };
    postId: string;
    comment: string;
    imageComment: string;
    replay: string[];
    createdAt: string;
    updatedAt: string;
    createdAtFromNow: string;
    updatedAtFromNow: string;
}
