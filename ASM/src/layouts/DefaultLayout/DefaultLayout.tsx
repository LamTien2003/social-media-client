import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

import { RootState } from '@/store/store';
import { InitialValue } from '@/store/themeSlice';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    const theme = useSelector<RootState, InitialValue>((state) => state.theme);
    return (
        <div className={`flex flex-col mobile:flex-col-reverse ${theme.isDark && 'dark'}`}>
            <Header />
            <div className=" min-h-screen relative bg-light-200 dark:bg-dark-400 transition-all">
                {!theme.isMinimal && <Sidebar />}

                <div className={`ml-[280px] mt-[68px] text-center transition-all mobile:mx-auto `}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
