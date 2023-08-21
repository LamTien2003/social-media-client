import { Routes, Route } from 'react-router-dom';
import { Home } from '@/page/Home/Home';
import { useFetchPostsQuery } from '@/services/postSlice';

import NoHeaderLayout from '@/layouts/NoHeaderLayout/NoHeaderLayout';
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout';

import Profile from '@/page/Profile/Profile';
import ProfilePostBox from '@/page/Profile/components/ProfilePostBox';

import Auth from '@/page/Auth/Auth';
import FriendsRequest from '@/page/FriendsRequest/FriendsRequest';
import Settings from '@/page/Settings/Settings';
import Admin from '@/page/Admin/Admin';
import ManageUser from './page/Admin/components/ManageUser';
import ManageBlog from './page/Admin/components/ManageBlog';

function App() {
    const { data, error, isLoading } = useFetchPostsQuery();
    // console.log(data);
    return (
        <Routes>
            <Route path="" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="profile/:id" element={<Profile />}>
                    <Route path="about" element={<div>About</div>} />
                    <Route path="friends" element={<div>Friends</div>} />
                    <Route path="photos" element={<div>Photos</div>} />
                    <Route index element={<ProfilePostBox />} />
                </Route>
                <Route path="friendsRequest" element={<FriendsRequest />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<div>Page not found</div>} />
            </Route>

            <Route path="auth" element={<NoHeaderLayout />}>
                <Route index element={<Auth />} />
            </Route>

            <Route path="admin" element={<Admin />}>
                <Route index element={<ManageUser />} />
                <Route path="manageBlog" element={<ManageBlog />} />
            </Route>
        </Routes>
    );
}

export default App;
