import AddPostBox from '../../components/AddPostBox/AddPostBox';
import FriendRequestBox from './components/FriendRequestBox';
import StoryBox from './components/StoryBox';
import PostBox from '@/components/PostBox/PostBox';
import SuggestFrirendBox from './components/SuggestFrirendBox';

export const Home = () => {
    return (
        <div className="flex max-w-[960px] mx-auto">
            <div className="flex flex-col items-center w-4/6 mobile:w-full">
                <StoryBox />
                <AddPostBox />
                {[...Array(10)].map((_, index) => (
                    <PostBox key={index} />
                ))}
            </div>
            <div className="w-2/6 flex flex-col items-center justify-start space-y-4 ml-4 mobile:hidden ">
                <FriendRequestBox />
                <SuggestFrirendBox />
            </div>
        </div>
    );
};
