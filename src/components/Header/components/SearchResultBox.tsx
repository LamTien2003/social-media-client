import { RootState } from '@/store/store';
import User from '@/type/User';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
interface Props {
    data: User[];
}
const SearchResultBox = (props: Props) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const { data } = props;
    return (
        <div className=" shadow-xl rounded-lg w-[360px] min-h-[100px] max-h-[200px] overflow-y-scroll bg-white">
            <h5 className="text-xs text-content-300 font-bold p-4 ">Tài khoản</h5>
            {data.map((item) => (
                <NavLink
                    to={`/profile/${item.id}`}
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-light-300"
                    key={item.id}
                >
                    <img src={item.photo} className="w-10 h-10 object-cover rounded-full" />
                    <div className="flex flex-col space-y-1 justify-center ">
                        <h3 className="text-sm font-bold">{`${item.firstName} ${item.lastName}`}</h3>
                        {currentUser?.friends.some((friend) => friend.id === item.id) && (
                            <span className="text-xs text-content-100 font-medium">Bạn bè</span>
                        )}
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default SearchResultBox;
