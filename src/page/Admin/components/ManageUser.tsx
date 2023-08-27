import Search from '@/components/Search/Search';
import { useGetUsersQuery } from '@/services/userApiSlice';
import User from '@/type/User';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import UserBox from './UserBox';
import Loading from '@/components/Loading/Loading';
import Container from '@/components/Container/Container';

const ManageUser: React.FC = () => {
    const { data, isLoading, error } = useGetUsersQuery({});
    const [selectedUser, setSelectedUser] = useState<number>(0);

    const currentUser = useMemo(() => {
        return data?.data?.data?.[selectedUser];
    }, [data?.data?.data, selectedUser]);

    return (
        <>
            <div className="w-8/12 p-10">
                <Search placeholder="Tìm kiếm người dùng" />
                {!error ? (
                    isLoading ? (
                        <Loading className="text-center mt-4" />
                    ) : (
                        <div className="w-full flex flex-wrap ">
                            {data?.data?.data?.map((item, index) => (
                                <div className="w-1/3 mt-4 px-2" key={item.id} onClick={() => setSelectedUser(index)}>
                                    <div
                                        className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer ${
                                            index === selectedUser
                                                ? 'border-[3px] border-purple-600'
                                                : 'border border-content-100'
                                        }`}
                                    >
                                        <img
                                            src={item.photo}
                                            alt=""
                                            className="w-14 h-14 rounded-full object-cover mb-2"
                                        />
                                        <h4 className="text-sm font-bold">{`${item.firstName} ${item.lastName}`}</h4>
                                        <span className="text-xs font-semibold text-content-100">({item.email})</span>
                                        <div className="flex flex-col items-center space-y-2 mt-4">
                                            <span className="text-xs font-semibold text-content-300">
                                                {item.friends.length} bạn bè
                                            </span>
                                            <span className="text-xs font-semibold text-content-300">
                                                {item.postsCount} bài viết
                                            </span>
                                            <div className="flex item-center space-x-2">
                                                {item.ban ? (
                                                    <>
                                                        <span className="block w-3 h-3 bg-red-500 rounded-full"></span>
                                                        <span className="text-xs font-semibold">Banned</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
                                                        <span className="text-xs font-semibold">Active</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {index === selectedUser && (
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
                    )
                ) : (
                    <Container classNames="py-20 rounded-3xl text-2xl font-semibold">Không có người dùng nào</Container>
                )}
            </div>
            <div className="flex-1 text-center p-10 bg-light-400 dark:bg-dark-200 rounded-md">
                {currentUser ? <UserBox data={currentUser as User} /> : <div>Chọn người dùng để hiển thị</div>}
            </div>
        </>
    );
};

export default ManageUser;
