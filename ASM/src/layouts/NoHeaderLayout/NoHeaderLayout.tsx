import { Outlet } from 'react-router-dom';

const NoHeaderLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default NoHeaderLayout;
