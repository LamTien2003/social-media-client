import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { NavLink } from 'react-router-dom';

const FriendRequestBox = () => {
    return (
        <Container classNames="mt-0 p-0">
            <div className="flex justify-between p-6 border-b border-b-dark-500-100 ">
                <h4 className="text-xs font-bold dark:text-white">Friend Request</h4>
                <NavLink to="" className="text-xs text-content-blue font-semibold">
                    See all
                </NavLink>
            </div>
            <div className="flex flex-col items-start justify-center my-4">
                {[...Array(5)].map((_, index) => (
                    <div className="flex flex-col items-start justify-center space-y-4 my-3 px-6 w-full" key={index}>
                        <div className="flex items-center space-x-4">
                            <img src={images.story} alt="" className="w-12 h-12 rounded-full" />
                            <div className="flex flex-col items-start space-y-1">
                                <h4 className="text-xs text-black font-bold dark:text-white">Anthony Daugloi</h4>
                                <span className="text-content-100 text-xs font-semibold dark:text-content-300">
                                    12 bạn chung
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="bg-content-blue text-white text-xs font-bold rounded-full px-6 py-[10px]">
                                Confirm
                            </button>
                            <button className="bg-light-300 text-content-300 text-xs font-bold rounded-full px-6 py-[10px]">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default FriendRequestBox;
