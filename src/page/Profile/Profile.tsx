import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';

import { Outlet, useParams } from 'react-router-dom';
import HeadBox from './components/HeadBox';
import { useGetUserQuery } from '@/services/userApiSlice';
import Loading from '@/components/Loading/Loading';
import Container from '@/components/Container/Container';
import User from '@/type/User';
import { useEffect } from 'react';

const Profile = () => {
    const { id } = useParams();
    const currentUser = useSelector((state: RootState) => state.user.user);
    const { data, error, isLoading } = useGetUserQuery(id || skipToken);
    const user = data?.data?.data;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id, data]);

    return (
        <div className="max-w-[960px] mx-auto ">
            {!error ? (
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <HeadBox currentUser={currentUser as User} user={user as User} />
                        <Outlet context={{ user, currentUser }} />
                    </>
                )
            ) : (
                <Container classNames="py-20 rounded-3xl text-2xl font-semibold">Người dùng không tồn tại</Container>
            )}
        </div>
    );
};

export default Profile;
