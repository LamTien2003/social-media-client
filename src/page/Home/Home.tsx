import AddPostBox from '../../components/AddPostBox/AddPostBox';
import FriendRequestBox from './components/FriendRequestBox';
import StoryBox from './components/StoryBox';
import PostBox from '@/components/PostBox/PostBox';
import SuggestFrirendBox from './components/SuggestFrirendBox';
import { useGetPostsQuery } from '@/services/postApiSlice';
import Loading from '@/components/Loading/Loading';

export const Home = () => {
    const { data, isLoading } = useGetPostsQuery();
    const posts = data?.data?.data;
    return (
        <div className="flex max-w-[960px] mx-auto">
            <div className="flex flex-col items-center w-4/6 mobile:w-full">
                <StoryBox />
                <AddPostBox />
                {isLoading ? <Loading /> : posts?.map((item, index) => <PostBox key={index} data={item} />)}
            </div>
            <div className="w-2/6 flex flex-col items-center justify-start space-y-4 ml-4 mobile:hidden ">
                <FriendRequestBox />
                <SuggestFrirendBox />
            </div>
        </div>
    );
};
