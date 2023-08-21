import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

import images from '@/assets/images';
import PostBox from '@/components/PostBox/PostBox';
import Report from '@/type/Report';
import { useRemovePostMutation, useRestorePostMutation } from '@/services/postApiSlice';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading/Loading';
import { useBanUserMutation } from '@/services/userApiSlice';

interface Props {
    data: Report;
}
const BlogBox = (props: Props) => {
    const { data } = props;
    const [isShowDetail, setIsShowDetail] = useState(false);
    const popupRef = useClickOutside<HTMLDivElement>(() => setIsShowDetail(false));
    const [removePost, { isLoading: isRemoving }] = useRemovePostMutation();
    const [restore, { isLoading: isRestoring }] = useRestorePostMutation();
    const [banUser, { isLoading: isBanning }] = useBanUserMutation();

    const handleRemovePost = async () => {
        try {
            if (!confirm('Bạn có chắc chắn muốn xóa bài viết này ?')) {
                return;
            }

            const response = await removePost(data.post.id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.error('Bài viết đã bị xóa và đưa vào kho lưu trữ bài viết');
        } catch (err: any) {
            toast.error(err?.data?.msg);
        }
    };
    const handleRestorePost = async () => {
        try {
            if (!confirm('Bạn có chắc chắn muốn khôi phục lại bài viết này ?')) {
                return;
            }

            const response = await restore(data.post.id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.success('Bài viết đã được khôi phục');
        } catch (err: any) {
            toast.error(err?.data?.msg);
        }
    };
    const handleBanUser = async () => {
        try {
            if (!confirm('Bạn có chắc chắn muốn chặn người dùng này ?')) {
                return;
            }

            const response = await banUser(data.post.user.id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.error('Người dùng đã bị chặn');
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center bg-light-300 py-4 my-1 rounded-lg dark:bg-dark-300">
            <div className="w-3/12 flex items-center space-x-4 text-xs font-bold pl-4 dark:text-white">
                <img src={data?.post?.imagePost[0]} className="w-10 h1-10" />
                <span>{data?.post?.content.slice(0, 50)}</span>
            </div>
            <div className="w-1/12 px-2 text-xs font-semibold text-content-300">{data?.createdAtFromNow}</div>
            <div className="w-1/12 px-2 text-xs font-semibold text-content-300">{`${data?.post?.user?.firstName} ${data?.post?.user?.lastName}`}</div>
            <div className="w-1/12 px-2 text-xs font-semibold text-content-300">{`${data?.user?.firstName} ${data?.user?.lastName}`}</div>
            <div className="w-1/12 px-2 text-xs font-semibold text-content-300">{data?.reason}</div>
            <div className="w-1/12 px-2 text-xs font-semibold text-content-300">
                {!data?.post?.isDelete ? (
                    <span className="bg-green-300 text-green-700 font-bold rounded-lg py-2 px-4 text-center">
                        Active
                    </span>
                ) : (
                    <span className="bg-red-300 text-red-700 font-bold rounded-lg py-2 px-4 text-center">Deleted</span>
                )}
            </div>
            <div className="w-1/12 px-2 text-xs font-semibold text-content-300">
                {data?.post?.user?.ban ? (
                    <span className="bg-red-300 text-red-700 font-bold rounded-lg py-2 px-4 text-center">Banned</span>
                ) : (
                    <span className="bg-green-300 text-green-700 font-bold rounded-lg py-2 px-4 text-center">
                        Active
                    </span>
                )}
            </div>

            <div className="w-1/12 px-2 text-xs font-semibold text-content-100">
                <span
                    className="bg-gray-300 text-gray-600 font-bold rounded-lg py-2 px-4 cursor-pointer "
                    onClick={() => setIsShowDetail((prev) => !prev)}
                >
                    Chi tiết
                </span>
            </div>
            <div className="w-2/12 flex flex-col space-y-2 px-2 text-xs font-semibold text-content-100">
                {!data?.post?.isDelete ? (
                    <div
                        className="w-3/4 text-center bg-red-300 text-red-600 font-bold rounded-lg p-2 cursor-pointer"
                        onClick={handleRemovePost}
                    >
                        {isRemoving ? <Loading /> : 'Xóa bài viết'}
                    </div>
                ) : (
                    <span
                        className="w-3/4 text-center bg-yellow-300 text-yellow-600 font-bold rounded-lg py-2 px-4 cursor-pointer"
                        onClick={handleRestorePost}
                    >
                        {isRestoring ? <Loading /> : 'Khôi phục bài viết'}
                    </span>
                )}
                {!data?.post?.user?.ban && (
                    <div
                        className="w-3/4 text-center bg-yellow-300 text-yellow-600 font-bold rounded-lg p-2 cursor-pointer"
                        onClick={handleBanUser}
                    >
                        {isBanning ? <Loading /> : 'Chặn người dùng'}
                    </div>
                )}
            </div>
            {isShowDetail && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-blur-100">
                    <div ref={popupRef} className="mx-auto rounded-lg w-[800px] h-[800px] p-20 overflow-scroll">
                        <PostBox data={data.post} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogBox;
