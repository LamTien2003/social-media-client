import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { NavLink } from 'react-router-dom';
import icons from '@/assets/icons';
const SuggestFrirendBox = () => {
    return (
        <Container classNames="mt-0 p-0">
            <div className="flex justify-between p-6 border-b border-b-dark-500-100 ">
                <h4 className="text-xs font-bold dark:text-white">Suggest Friend</h4>
                <NavLink to="" className="text-xs text-content-blue font-semibold">
                    See all
                </NavLink>
            </div>
            <div className="flex flex-col items-start justify-center my-4">
                <div className="flex flex-col items-start justify-center space-y-4 my-3 px-6 w-full">
                    {[...Array(5)].map((_, index) => (
                        <div className="w-full flex items-center justify-between space-x-4" key={index}>
                            <div className="flex items-center space-x-4">
                                <img src={images.story} alt="" className="w-12 h-12 rounded-full " />
                                <div className="flex flex-col items-start space-y-1">
                                    <h4 className="text-xs text-black font-bold dark:text-white">Anthony Daugloi</h4>
                                    <span className="text-content-100 text-xs font-semibold dark:text-content-300">
                                        12 bạn chung
                                    </span>
                                </div>
                            </div>
                            <button>
                                <img src={icons.addFriendIcon} alt="" className="w-5 h-5 dark:filter dark:invert" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default SuggestFrirendBox;
