import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { faPen, faPhotoVideo, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPostBox = () => {
    return (
        <Container>
            <div className="flex items-center justify-start space-x-3">
                <FontAwesomeIcon icon={faPen} className="text-content-blue bg-white p-2 rounded-full text-sm" />
                <p className="text-content-100 font-semibold text-xs ">Create Post</p>
            </div>
            <div className="flex mt-5 relative">
                <span className="absolute top-2 left-2">
                    {' '}
                    <img src={images.story} alt="" className="w-7 h-7 rounded-full object-cover" />
                </span>
                <textarea
                    name=""
                    id=""
                    placeholder="Bạn đang nghĩ gì ?"
                    className="w-full min-h-[100px] bg-white border border-gray-300 dark:border-none dark:bg-dark-400 text-content-100 text-xs font-semibold rounded-lg placeholder:text-content-100 placeholder:text-xs p-2 pl-14 outline-none transition-all"
                ></textarea>
            </div>
            <div className="flex space-x-4 mt-4 justify-between">
                <div className="flex space-x-4 mt-4">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <FontAwesomeIcon icon={faVideo} className="text-red-700" />
                        <span className="text-gray-600 dark:text-content-light-grey font-medium text-sm mobile:hidden">
                            Live Video
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <FontAwesomeIcon icon={faPhotoVideo} className="text-green-500" />
                        <span className="text-gray-600 dark:text-content-light-grey font-medium text-sm mobile:hidden">
                            Photo/Video
                        </span>
                    </div>
                </div>
                <button className="bg-red px-8 py-2 rounded-lg bg-content-blue-100 text-content-light-grey">
                    Post
                </button>
            </div>
        </Container>
    );
};

export default AddPostBox;
