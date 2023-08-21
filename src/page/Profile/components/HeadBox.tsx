import { ChangeEvent, useRef, useState } from 'react';
import Container from '@/components/Container/Container';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import {
    useAcceptFriendMutation,
    useCancelFriendRequestMutation,
    useChangeMeMutation,
    useRemoveFriendMutation,
    useSendFriendRequestMutation,
} from '@/services/userApiSlice';

import { faCamera, faEllipsis, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '@/components/Loading/Loading';
import User from '@/type/User';
import Tippy from '@tippyjs/react';
import Popup from '@/components/Popup/Popup';
import { dataUrlToFileUsingFetch } from '@/utils/utils';

interface Props {
    currentUser: User;
    user: User;
}
const HeadBox = (props: Props) => {
    const { currentUser, user } = props;
    // SkipToken use for variable id maybe undefine

    const [acceptFriend, { isLoading: isAccepting }] = useAcceptFriendMutation();
    const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();
    const [sendFriend, { isLoading: isSending }] = useSendFriendRequestMutation();
    const [cancelFriend, { isLoading: isCanceling }] = useCancelFriendRequestMutation();
    const [changeMe, { isLoading: isChangingInfo }] = useChangeMeMutation();

    const [openAvatarPopup, setOpenAvatarPopup] = useState(false);
    const [inputAvatar, setInputAvatar] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState('');
    const [outputAvatar, setOutputAvatar] = useState<File>();

    const cropperRef = useRef<ReactCropperElement>(null);
    const handleChangeAvatarInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files && e.target?.files[0]) {
            const file = e.target.files[0];
            setInputAvatar(URL.createObjectURL(file));
        }
    };
    const getCropData = async () => {
        const cropper = cropperRef.current?.cropper;
        if (typeof cropper !== 'undefined') {
            const image = await dataUrlToFileUsingFetch(
                cropper?.getCroppedCanvas().toDataURL(),
                'filename',
                'image/png',
            );
            setOutputAvatar(image);
            setPreviewAvatar(URL.createObjectURL(image));
        }
    };
    const handleChangeAvatar = async () => {
        try {
            const formData = new FormData();
            outputAvatar && formData.append('photo', outputAvatar);

            const response = await changeMe(formData).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            setOpenAvatarPopup(false);
            toast.success('Thay đổi ảnh đại diện thành công');
        } catch (err: any) {
            toast.error(err.msg);
        }
    };

    const handleAcceptFriend = async () => {
        try {
            const response = await acceptFriend(user?.id as string).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.success('Kết bạn thành công');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    const handleRemoveFriend = async () => {
        try {
            const response = await removeFriend(user?.id as string).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.success('Hủy kết bạn thành công');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    const handleSendFriendRequest = async () => {
        try {
            const response = await sendFriend(user?.id as string).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.success('Gửi lời mời kết bạn thành công');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    const handleCancelFriendRequest = async () => {
        try {
            const response = await cancelFriend(user?.id as string).unwrap();
            toast.error('Hủy lời mời kết bạn thành công');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    const ButtonFriend = () => {
        if (currentUser?.pending?.some((item) => item.id === user?.id)) {
            return (
                <>
                    <button
                        className="p-4 text-white font-bold text-xs bg-green-400 rounded-lg"
                        onClick={handleAcceptFriend}
                    >
                        {isAccepting ? <Loading /> : 'Chấp nhận kết bạn'}
                    </button>
                    <button
                        className="p-4 text-white font-bold text-xs bg-gray-400 rounded-lg"
                        onClick={handleCancelFriendRequest}
                    >
                        {isCanceling ? <Loading /> : 'Hủy lời mời kết bạn'}
                    </button>
                </>
            );
        }
        if (currentUser?.waitting?.some((item) => item.id === user?.id)) {
            return (
                <button
                    className="p-4 text-white font-bold text-xs bg-gray-400 rounded-lg"
                    onClick={handleCancelFriendRequest}
                >
                    {isCanceling ? <Loading /> : 'Hủy lời mời kết bạn'}
                </button>
            );
        }
        if (currentUser?.friends?.some((item) => item.id === user?.id)) {
            return (
                <button className="p-4 text-white font-bold text-xs bg-red-500 rounded-lg" onClick={handleRemoveFriend}>
                    {isRemoving ? <Loading /> : 'Hủy kết bạn'}
                </button>
            );
        }
        return (
            <button
                className="p-4 text-white font-bold text-xs bg-blue-500 rounded-lg"
                onClick={handleSendFriendRequest}
            >
                {isSending ? <Loading /> : 'Thêm bạn bè'}
            </button>
        );
    };

    return (
        <Container classNames="p-0 rounded-3xl">
            {openAvatarPopup && (
                <Popup onClickOutSide={() => setOpenAvatarPopup(false)}>
                    <Container classNames="max-w-[960px] max-h-screen overflow-y-scroll">
                        {!inputAvatar ? (
                            <span>Chọn hình ảnh tải lên để tiếp tục</span>
                        ) : (
                            <Cropper
                                ref={cropperRef}
                                style={{ height: 400, width: '100%' }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                src={inputAvatar}
                                viewMode={1}
                                minCropBoxHeight={300}
                                minCropBoxWidth={350}
                                cropBoxResizable={false}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                guides={true}
                            />
                        )}
                        <div className="flex flex-col space-y-2 items-center mt-4 ">
                            {isChangingInfo && <Loading />}
                            <input type="file" placeholder="Chọn hình ảnh" onChange={handleChangeAvatarInput} />
                            {outputAvatar && <img src={previewAvatar} alt="" className=" h-[300px] object-cover" />}
                            <button className="bg-green-400 font-semibold text-sm p-4 rounded-lg" onClick={getCropData}>
                                Cắt hình ảnh
                            </button>
                            {outputAvatar && (
                                <button
                                    className="bg-blue-400 font-semibold text-sm p-4 rounded-lg"
                                    onClick={handleChangeAvatar}
                                >
                                    Cập nhật ảnh đại diện
                                </button>
                            )}
                        </div>
                    </Container>
                </Popup>
            )}

            <img src={user?.coverImage} alt="" className="w-full max-h-[250px] p-4 rounded-3xl" />
            <div className="flex flex-col items-start justify-center px-4">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-4 items-start px-4">
                        <div className=" -translate-y-10">
                            <img
                                src={user?.photo}
                                alt=""
                                className="w-[100px] h-[100px] rounded-full border-4 border-white "
                            />
                            {currentUser?.id === user?.id && (
                                <Tippy
                                    content={
                                        <div className="bg-content-200 rounded-md py-2 px-4 shadow-lg text-xs font-semibold">
                                            Cập nhật ảnh đại diện
                                        </div>
                                    }
                                    delay={100}
                                    placement="bottom-start"
                                >
                                    <span
                                        className="absolute bottom-0 right-0 flex items-center justify-center bg-content-200 w-8 h-8 rounded-full cursor-pointer hover:bg-content-300"
                                        onClick={() => setOpenAvatarPopup(true)}
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                    </span>
                                </Tippy>
                            )}
                        </div>

                        <div className="flex flex-col items-start justify-center">
                            <h3 className="text-xl font-bold dark:text-white">{`${user?.firstName} ${user?.lastName}`}</h3>
                            <span className="text-content-100 font-semibold text-xs">{user?.email}</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        {currentUser?.id === user?.id ? (
                            <NavLink
                                to={`/profile/${user?.id}/about`}
                                className="p-4 font-bold text-xs bg-light-300 rounded-lg"
                            >
                                Chỉnh sửa trang cá nhân
                            </NavLink>
                        ) : (
                            <ButtonFriend />
                        )}
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
                    to={`/profile/${user?.id}`}
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
                    to={`/profile/${user?.id}/about`}
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
                    to={`/profile/${user?.id}/friends`}
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
                    to={`/profile/${user?.id}/photos`}
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
