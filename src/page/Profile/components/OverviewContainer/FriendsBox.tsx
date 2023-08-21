import images from '@/assets/images';
import Container from '@/components/Container/Container';
import Loading from '@/components/Loading/Loading';
import { NavLink } from 'react-router-dom';

interface Props {
    listFriends:
        | {
              id: string;
              firstName: string;
              lastName: string;
              photo: string;
              commonFriends: number;
          }[]
        | [];
    isLoading: boolean;
}
const FriendsBox = (props: Props) => {
    const { listFriends, isLoading } = props;
    return (
        <Container classNames="flex flex-col space-y-6 px-0 py-6">
            <div className="flex justify-between px-6 ">
                <h5 className="text-xs font-bold dark:text-white">Bạn bè</h5>
                <NavLink to="" className="text-content-blue text-xs font-semibold">
                    Xem tất cả
                </NavLink>
            </div>
            <div className="w-full flex flex-wrap px-3">
                {listFriends?.slice(0, 4).map((item, index) => (
                    <NavLink to={`/profile/${item.id}`} className="w-1/2 p-1 text-left" key={index}>
                        <img src={item.photo} alt="" className="w-full h-[150px] object-cover rounded-md" />
                        <span className="text-xs font-semibold text-left px-1">{`${item.firstName} ${item.lastName}`}</span>
                    </NavLink>
                ))}
                {!listFriends?.length && <div className="w-full text-center font-medium">Không có bạn bè</div>}
                {isLoading && <Loading />}
            </div>
            <button className="bg-content-200 w-6/12 mx-auto p-2 rounded-full text-xs font-semibold mb-">
                Xem thêm
            </button>
        </Container>
    );
};

export default FriendsBox;
