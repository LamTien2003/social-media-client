export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    coverImage: string;
    introduce: string;
    location: string;
    occupation: string;
    viewedProfile: number;
    friends: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
        commonFriends: number;
    }[];
    pending: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
        commonFriends: number;
    }[];
    waitting: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
        commonFriends: number;
    }[];
    postsCount: number;
    reportsCount: number;
    role: 'admin' | 'user';
    ban: boolean;
}
