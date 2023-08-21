import PostBox from '@/components/PostBox/PostBox';
import AddPostBox from '@/components/AddPostBox/AddPostBox';
import AboutBox from './AboutBox';
import PhotosBox from './PhotosBox';

const ProfilePostBox = () => {
    return (
        <div className="flex items-start space-x-4">
            <div className="w-4/12">
                <AboutBox />
                <PhotosBox />
            </div>
            <div className="flex-1">
                <AddPostBox />
                {[...Array(5)].map((_, index) => (
                    <PostBox key={index} />
                ))}
            </div>
        </div>
    );
};

export default ProfilePostBox;
