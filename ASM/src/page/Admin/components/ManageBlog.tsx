import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

import images from '@/assets/images';
import PostBox from '@/components/PostBox/PostBox';

const BlogPost: React.FC = () => {
    const [isShowDetail, setIsShowDetail] = useState(false);
    const popupRef = useClickOutside<HTMLDivElement>(() => setIsShowDetail(false));

    return (
        <div className="flex items-center bg-light-300 py-4 my-1 rounded-lg dark:bg-dark-300">
            <div className="w-4/12 flex items-center space-x-4 text-xs font-bold px-4 dark:text-white">
                <img src={images.story} className="w-10 h1-10" />
                <span>Tiêu đề bài viết</span>
            </div>
            <div className="w-2/12 text-xs font-semibold text-content-100">11 Nov,2021</div>
            <div className="w-2/12 text-xs font-semibold text-content-100">Lâm Tiến</div>
            <div className="w-2/12 text-xs font-semibold text-content-100">Chứa từ ngữ cấm</div>
            <div className="w-2/12 text-xs font-semibold text-content-100">
                <span className="bg-green-300 text-green-700 font-bold rounded-lg py-2 px-6 text-center">Active</span>
            </div>

            <div className="w-2/12 text-xs font-semibold text-content-100">
                <span
                    className="bg-gray-300 text-gray-600 font-bold rounded-lg py-2 px-4 cursor-pointer "
                    onClick={() => setIsShowDetail((prev) => !prev)}
                >
                    Xem chi tiết
                </span>
            </div>
            <div className="w-2/12 flex flex-col space-y-2 text-xs font-semibold text-content-100">
                <div className="w-3/4 bg-red-300 text-red-600 font-bold rounded-lg p-2 cursor-pointer">
                    Xóa bài viết
                </div>
                <div className="w-3/4 bg-yellow-300 text-yellow-600 font-bold rounded-lg p-2 cursor-pointer">
                    Chặn người dùng
                </div>
            </div>
            {isShowDetail && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-blur-100">
                    <div ref={popupRef} className="mx-auto rounded-lg w-[800px] h-[800px] p-20 overflow-scroll">
                        <PostBox />
                    </div>
                </div>
            )}
        </div>
    );
};
const ManageBlog: React.FC = () => {
    return (
        <div className="w-full p-20">
            <h2 className="text-lg font-bold">Bài viết bị tố cáo</h2>
            <div className="p-6">
                <div className="flex py-10">
                    <div className="w-4/12 text-xs font-bold">Danh sách bài viết</div>
                    <div className="w-2/12 text-xs font-bold">Ngày đăng</div>
                    <div className="w-2/12 text-xs font-bold">Người đăng</div>
                    <div className="w-2/12 text-xs font-bold">Lý do tố cáo</div>
                    <div className="w-2/12 text-xs font-bold">Trạng thái</div>
                    <div className="w-2/12 text-xs font-bold">Chi tiết</div>
                    <div className="w-2/12 text-xs font-bold">Hành động</div>
                </div>
                <div className="flex flex-col">
                    {[...Array(10)].map((_, index) => (
                        <BlogPost key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageBlog;
