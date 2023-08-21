import PostBox from '@/components/PostBox/PostBox';
import AddPostBox from '@/components/AddPostBox/AddPostBox';
import AboutBox from './AboutBox';
import PhotosBox from './PhotosBox';

import { useGetPostsOfUserQuery } from '@/services/postApiSlice';
import FriendsBox from './FriendsBox';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetUserQuery } from '@/services/userApiSlice';
import Container from '@/components/Container/Container';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo } from 'react';
import User from '@/type/User';

const OverviewContainer = () => {
    const { id } = useParams();
    const currentUser = useSelector((state: RootState) => state.user.user);

    // SkipToken use for variable id maybe undefine
    const { data, isLoading: isGettingUser, error } = useGetUserQuery(id || skipToken);
    const { data: postsData, isLoading } = useGetPostsOfUserQuery(id || skipToken);
    const user = data?.data?.data;
    const posts = postsData?.data?.data;

    const listImagePost = useMemo(() => {
        return posts?.map((item) => item.imagePost).flat() || [];
    }, [posts]);
    return (
        <div className="flex items-start space-x-4">
            <div className="w-4/12">
                <AboutBox data={user as User} />
                <FriendsBox listFriends={user?.friends || []} isLoading={isGettingUser} />
                <PhotosBox listImage={listImagePost} />
            </div>
            <div className="flex-1">
                {user?.id === currentUser?.id && <AddPostBox />}

                {posts?.length ? (
                    posts?.map((item, index) => <PostBox key={index} data={item} />)
                ) : (
                    <Container classNames="font-semibold">Không có bài viết nào</Container>
                )}
            </div>
        </div>
    );
};

export default OverviewContainer;
