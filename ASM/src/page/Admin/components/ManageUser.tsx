import images from '@/assets/images';
import Search from '@/components/Search/Search';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ManageUser: React.FC = () => {
    return (
        <>
            <div className="w-8/12 p-10">
                <Search placeholder="Tìm kiếm người dùng" />
                <div className="w-full flex flex-wrap ">
                    {[...Array(13)].map((_, index) => (
                        <div className="w-1/3 mt-4 px-2" key={index}>
                            <div
                                className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer ${
                                    index === 4 ? 'border-[3px] border-purple-600' : 'border border-content-100'
                                }`}
                            >
                                <img src={images.story} alt="" className="w-14 h-14 rounded-full object-cover mb-2" />
                                <h4 className="text-sm font-bold">Lâm Tiến</h4>
                                <span className="text-xs font-semibold text-content-100">(ltt209514@gmail.com)</span>
                                <div className="flex flex-col items-center space-y-2 mt-4">
                                    <span className="text-xs font-semibold text-content-300">82 bạn bè</span>
                                    <span className="text-xs font-semibold text-content-300">10 bài viết</span>
                                    <div className="flex item-center space-x-2">
                                        <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span className="text-xs font-semibold">Online</span>
                                    </div>
                                </div>
                                {index === 4 && (
                                    <span className="absolute top-3 left-3">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="p-2 bg-purple-600 text-white rounded-full"
                                        />
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 text-center p-10 bg-light-400 dark:bg-dark-200 rounded-md">
                <h4 className="mb-10 text-base font-bold dark:text-white">Thông tin người dùng</h4>

                <div className="flex items-center space-x-4 py-4  border-b border-b-content-100 ">
                    <img src={images.story} alt="" className="w-12 h-12 rounded-full object-cover mb-2" />
                    <div className="flex flex-col items-start ">
                        <h5 className="text-base font-bold ">Lâm Tiến</h5>
                        <span className="text-xs font-semibold text-content-300 dark:text-content-100">
                            Người dùng / Người dùng bình thường
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap space-y-6 pb-4 border-b border-b-content-100">
                    <div className="w-1/2 flex items-end space-x-4">
                        <span className="block w-2 h-20 bg-green-300"></span>
                        <div className="flex flex-col items-start space-y-7">
                            <span className="text-sm text-content-300 dark:text-content-100 font-semibold">Bạn bè</span>
                            <span className="text-lg font-bold">12</span>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-end space-x-4">
                        <span className="block w-2 h-20 bg-blue-300"></span>
                        <div className="flex flex-col items-start space-y-7">
                            <span className="text-sm text-content-300 dark:text-content-100 font-semibold">
                                Bài viết
                            </span>
                            <span className="text-lg font-bold">12</span>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-end space-x-4">
                        <span className="block w-2 h-20 bg-red-300"></span>
                        <div className="flex flex-col items-start space-y-7">
                            <span className="text-sm text-content-300 dark:text-content-100 font-semibold">
                                Bài viết bị tố cáo
                            </span>
                            <span className="text-lg font-bold">12</span>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-end space-x-4">
                        <span className="block w-2 h-20 bg-yellow-300"></span>
                        <div className="flex flex-col items-start space-y-7">
                            <span className="text-sm text-content-300 dark:text-content-100 font-semibold">
                                Lượt tương tác
                            </span>
                            <span className="text-lg font-bold">12</span>
                        </div>
                    </div>
                </div>

                <div className="py-4 text-left border-b border-b-content-100">
                    <h5 className="w-full font-semibold text-center">Thông tin cá nhân </h5>
                    <p className="font-semibold text-sm my-3">Tên: Lâm Thành Tiến</p>
                    <p className="font-semibold text-sm my-3">Tuổi: 20</p>
                    <p className="font-semibold text-sm my-3">Địa chỉ: 697 Nguyễn Duy F12 Q8</p>
                    <p className="font-semibold text-sm my-3">Nơi làm việc: FPT Polytechnic</p>
                </div>

                <div className="flex flex-col items-center py-4">
                    <h5 className="w-full font-semibold text-center">Hành động</h5>
                    <button className="w-3/4 py-2 my-2 font-semibold bg-yellow-500 rounded-full">
                        Chặn người dùng
                    </button>
                    <button className="w-3/4 py-2 my-2 font-semibold bg-red-500 rounded-full">
                        Xóa người dùng này
                    </button>
                </div>
            </div>
        </>
    );
};

export default ManageUser;
