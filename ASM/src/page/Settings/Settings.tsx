import { faBell, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '@/store/store';
import { toggleDarkMode, toggleMinimalMode } from '@/store/themeSlice';

import { RootState } from '@/store/store';
import { InitialValue } from '@/store/themeSlice';
import { useSelector } from 'react-redux';
import { ChangeEvent } from 'react';

const Settings = () => {
    const theme = useSelector<RootState, InitialValue>((state) => state.theme);

    const dispatch = useAppDispatch();
    const handleToggleDarkMode = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleDarkMode(e.target.checked));
    };
    const handleToggleMinimalMode = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleMinimalMode(e.target.checked));
    };
    return (
        <div className="max-w-[800px] bg-white shadow-xl mx-auto p-12 text-left rounded-lg dark:bg-dark-500 dark:text-white transition-all">
            <h2 className="text-2xl font-bold mb-12 ">Cài đặt</h2>
            <div className="text-left mb-10">
                <p className="text-content-100 text-xs font-semibold mb-5">Cài đặt chung</p>
                <div className="flex flex-col space-y-4 items-start justify-center">
                    <NavLink
                        to=""
                        className="w-full pb-2 flex space-x-4 items-center border-b border-b-light-300 dark:border-b-dark-450"
                    >
                        <FontAwesomeIcon icon={faHome} className=" p-4 rounded-full bg-content-blue text-white" />
                        <span className="text-sm font-semibold">Thông tin cá nhân</span>
                    </NavLink>
                    <NavLink
                        to=""
                        className="w-full pb-2 flex space-x-4 items-center border-b border-b-light-300 dark:border-b-dark-450"
                    >
                        <FontAwesomeIcon icon={faKey} className=" p-4 rounded-full bg-red-500 text-white" />
                        <span className="text-sm font-semibold">Mật khẩu</span>
                    </NavLink>
                    <NavLink
                        to=""
                        className="w-full pb-2 flex space-x-4 items-center border-b border-b-light-300 dark:border-b-dark-450"
                    >
                        <FontAwesomeIcon icon={faBell} className=" p-4 rounded-full bg-yellow-500 text-white" />
                        <span className="text-sm font-semibold">Thông báo</span>
                    </NavLink>
                </div>
            </div>
            <div className="text-left mb-10">
                <p className="text-content-100 text-xs font-semibold mb-5">Cài đặt giao diện</p>
                <div className="flex flex-col space-y-4 items-start justify-center">
                    <div className="flex space-x-4 justify-between">
                        <p className="text-sm font-semibold">Dark Mode</p>
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={theme.isDark}
                                className="sr-only peer"
                                onChange={(e) => handleToggleDarkMode(e)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500 dark:peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                    <div className="flex space-x-4 justify-between">
                        <p className="text-sm font-semibold">Màn hình giản lược</p>
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={theme.isMinimal}
                                className="sr-only peer"
                                onChange={handleToggleMinimalMode}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500 dark:peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
