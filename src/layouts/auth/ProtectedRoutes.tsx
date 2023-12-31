import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '@/services/userApiSlice';
import { setCurrentUser } from '@/store/userSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '@/store/store';
import User from '@/type/User';
import { removeToken } from '@/utils/utils';
import { socket } from '@/services/socket';
import { changeOnlineFriends } from '@/store/sideSlice';

const ProtectedRoutes = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const { data, isLoading, isFetching, isError, error } = useGetCurrentUserQuery('', {
        refetchOnMountOrArgChange: 500,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('connected', (users) => dispatch(changeOnlineFriends(users)));
    }, [dispatch]);

    useLayoutEffect(() => {
        if (data?.data?.data) {
            const user = data.data.data;
            dispatch(setCurrentUser(user as User));
            socket.connect();
            socket.emit('join', user.id);
        }
        if (isError && !isFetching && !isLoading) {
            alert((error as any)?.data?.msg);
            removeToken();
            // window.location.href = '/auth';
        }
    }, [data, dispatch, isLoading, isFetching, user, isError, error]);

    /* // use hooks useNavigate cause re-render entire components where using route or useNavigate when path change
    //     // -> Should be use in small component instead of big componet like App Component
    //     // -> solution is use <Navigate/> instead */

    return !user && !data && !isFetching && !isLoading ? <Navigate to="/auth" /> : <Outlet />;
};

export default ProtectedRoutes;
