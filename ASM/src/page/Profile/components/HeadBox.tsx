import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { faEllipsis, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const HeadBox = () => {
    return (
        <Container classNames="p-0 rounded-3xl">
            <img src={images.banner} alt="" className="w-full max-h-[250px] p-4 rounded-3xl" />
            <div className="flex flex-col items-start justify-center px-4">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-4 items-start px-4">
                        <img
                            src={images.avatar}
                            alt=""
                            className="w-[100px] h-[100px] rounded-full border-4 border-white -translate-y-10"
                        />
                        <div className="flex flex-col items-start justify-center">
                            <h3 className="text-xl font-bold dark:text-white">Lâm Tiến</h3>
                            <span className="text-content-100 font-semibold text-xs">support@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <button className="p-4 text-white font-bold text-xs bg-green-400 rounded-lg">
                            Thêm bạn bè
                        </button>
                        <button className="text-content-300 bg-light-300 py-3 px-3.5 rounded-lg">
                            <FontAwesomeIcon icon={faMailBulk} />
                        </button>
                        <button className="text-content-300 bg-light-300 py-3 px-3.5 rounded-lg">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-start border-t-2 border-t-gray-100 px-6">
                <NavLink
                    end
                    to="/profile/123"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-xs font-bold p-4 border-b-2 border-b-black dark:text-white dark:border-b-white'
                            : 'text-xs font-bold p-4 text-content-100 '
                    }
                >
                    Bài Viết
                </NavLink>
                <NavLink
                    end
                    to="/profile/123/about"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-xs font-bold p-4 border-b-2 border-b-black dark:text-white dark:border-b-white'
                            : 'text-xs font-bold p-4 text-content-100 '
                    }
                >
                    Giới thiệu
                </NavLink>
                <NavLink
                    end
                    to="/profile/123/friends"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-xs font-bold p-4 border-b-2 border-b-black dark:text-white dark:border-b-white'
                            : 'text-xs font-bold p-4 text-content-100'
                    }
                >
                    Bạn bè
                </NavLink>

                <NavLink
                    end
                    to="/profile/123/photos"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-xs font-bold p-4 border-b-2 border-b-black dark:text-white dark:border-b-white'
                            : 'text-xs font-bold p-4 text-content-100'
                    }
                >
                    Ảnh
                </NavLink>
            </div>
        </Container>
    );
};

export default HeadBox;
