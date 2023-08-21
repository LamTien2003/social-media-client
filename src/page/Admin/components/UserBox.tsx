import { useBanUserMutation, useUnbanUserMutation } from '@/services/userApiSlice';
import User from '@/type/User';
import { toast } from 'react-toastify';

interface Props {
    data: User;
}
const UserBox = (props: Props) => {
    const { data } = props;
    const [banUser, { isLoading: isBanning }] = useBanUserMutation();
    const [unbanUser, { isLoading: isUnbanning }] = useUnbanUserMutation();

    const handleBanUser = async () => {
        try {
            if (!confirm('Bạn có chắc chắn muốn chặn người dùng này ?')) {
                return;
            }

            const response = await banUser(data.id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.error('Người dùng đã bị chặn');
        } catch (err: any) {
            toast.error(err?.data?.msg);
        }
    };
    const handleUnbanUser = async () => {
        try {
            if (!confirm('Bạn có chắc chắn muốn gỡ chặn người dùng này ?')) {
                return;
            }

            const response = await unbanUser(data.id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.success('Gỡ chặn người dùng thành công');
        } catch (err: any) {
            toast.error(err?.data?.msg);
        }
    };
    return (
        <>
            <h4 className="mb-10 text-base font-bold dark:text-white">Thông tin người dùng</h4>

            <div className="flex items-center space-x-4 py-4  border-b border-b-content-100 ">
                <img src={data?.photo} alt="" className="w-12 h-12 rounded-full object-cover mb-2" />
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
                        <span className="text-lg font-bold">{data?.friends.length}</span>
                    </div>
                </div>
                <div className="w-1/2 flex items-end space-x-4">
                    <span className="block w-2 h-20 bg-blue-300"></span>
                    <div className="flex flex-col items-start space-y-7">
                        <span className="text-sm text-content-300 dark:text-content-100 font-semibold">Bài viết</span>
                        <span className="text-lg font-bold">{data?.postsCount}</span>
                    </div>
                </div>
                <div className="w-1/2 flex items-end space-x-4">
                    <span className="block w-2 h-20 bg-red-300"></span>
                    <div className="flex flex-col items-start space-y-7">
                        <span className="text-sm text-content-300 dark:text-content-100 font-semibold">
                            Bài viết bị tố cáo
                        </span>
                        <span className="text-lg font-bold">{data?.reportsCount}</span>
                    </div>
                </div>
                {/* <div className="w-1/2 flex items-end space-x-4">
                    <span className="block w-2 h-20 bg-yellow-300"></span>
                    <div className="flex flex-col items-start space-y-7">
                        <span className="text-sm text-content-300 dark:text-content-100 font-semibold">
                            Lượt tương tác
                        </span>
                        <span className="text-lg font-bold">12</span>
                    </div>
                </div> */}
            </div>

            <div className="py-4 text-left border-b border-b-content-100">
                <h5 className="w-full font-semibold text-center">Thông tin cá nhân </h5>
                <p className="font-semibold text-sm my-3">Tên: {`${data?.firstName} ${data?.lastName}`}</p>
                <p className="font-semibold text-sm my-3">Tuổi: 20</p>
                <p className="font-semibold text-sm my-3">Địa chỉ: {data?.location}</p>
                <p className="font-semibold text-sm my-3">Nơi làm việc: {data?.occupation}</p>
            </div>

            <div className="flex flex-col items-center py-4">
                <h5 className="w-full font-semibold text-center">Hành động</h5>
                {data?.ban ? (
                    <button
                        className="w-3/4 py-2 my-2 font-semibold bg-blue-500 rounded-full"
                        onClick={handleUnbanUser}
                    >
                        Gỡ chặn người dùng
                    </button>
                ) : (
                    <button
                        className="w-3/4 py-2 my-2 font-semibold bg-yellow-500 rounded-full"
                        onClick={handleBanUser}
                    >
                        Chặn người dùng
                    </button>
                )}
                <button className="w-3/4 py-2 my-2 font-semibold bg-red-500 rounded-full">Xóa người dùng này</button>
            </div>
        </>
    );
};

export default UserBox;
