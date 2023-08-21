import { Outlet } from 'react-router-dom';
import HeadBox from './components/HeadBox';

const Profile = () => {
    return (
        <div className="max-w-[960px] mx-auto ">
            <HeadBox />
            <Outlet />
        </div>
    );
};

export default Profile;
