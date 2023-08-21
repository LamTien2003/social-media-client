import { useAppDispatch } from '@/store/store';
import { toggleDarkMode, toggleMinimalMode } from '@/store/themeSlice';

import { RootState } from '@/store/store';
import { InitialValue } from '@/store/themeSlice';
import { useSelector } from 'react-redux';
import { ChangeEvent } from 'react';

const SettingBox = () => {
    const theme = useSelector<RootState, InitialValue>((state) => state.theme);

    const dispatch = useAppDispatch();
    const handleToggleDarkMode = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleDarkMode(e.target.checked));
    };
    const handleToggleMinimalMode = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleMinimalMode(e.target.checked));
    };
    return (
        <div className="absolute top-10 right-0 w-[310px] h-[330px] p-6 text-left overflow-y-scroll text-dark-500 bg-white dark:text-white text-xs dark:bg-dark-500 border border-content-100 dark:border-none rounded-md  ">
            <h4 className="text-sm font-bold mb-4">Cài đặt</h4>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
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
                <div className="flex justify-between">
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
    );
};

export default SettingBox;
