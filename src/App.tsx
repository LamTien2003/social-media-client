import { Routes, Route } from 'react-router-dom';
import { Home } from '@/page/Home/Home';
// import { useGetPostsQuery } from '@/services/postSlice';

import NoHeaderLayout from '@/layouts/users/NoHeaderLayout/NoHeaderLayout';
import DefaultLayout from '@/layouts/users/DefaultLayout/DefaultLayout';

import Profile from '@/page/Profile/Profile';
import OverviewContainer from '@/page/Profile/components/OverviewContainer/OverviewContainer';
import IntroduceContainer from '@/page/Profile/components/IntroduceContainer/IntroduceContainer';

import Auth from '@/page/Auth/Auth';
import FriendsRequest from '@/page/FriendsRequest/FriendsRequest';
import Settings from '@/page/Settings/Settings';
import Admin from '@/page/Admin/Admin';
import ManageUser from './page/Admin/components/ManageUser';
import ManageBlog from './page/Admin/components/ManageBlog';
import ProtectedRoutes from './layouts/auth/ProtectedRoutes';

function App() {
    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path="auth" element={<NoHeaderLayout />}>
                    <Route index element={<Auth />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="" element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        <Route path="profile/:id" element={<Profile />}>
                            <Route path="about" element={<IntroduceContainer />} />
                            <Route path="friends" element={<div>Friends</div>} />
                            <Route path="photos" element={<div>Photos</div>} />
                            <Route index element={<OverviewContainer />} />
                        </Route>
                        <Route path="friendsRequest" element={<FriendsRequest />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<div>Page not found</div>} />
                    </Route>

                    <Route path="admin" element={<Admin />}>
                        <Route index element={<ManageUser />} />
                        <Route path="manageBlog" element={<ManageBlog />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
