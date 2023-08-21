import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import images from '@/assets/images';

const EmotionBox = () => {
    return (
        <div className="flex space-x-4 p-4 bg-white rounded-full border border-gray-200 shadow-lg dark:bg-dark-300 dark:border-light-100">
            <FontAwesomeIcon
                icon={faThumbsUp}
                className="text-white bg-content-blue p-2 rounded-full cursor-pointer hover:scale-125 transition-all"
            />
            <FontAwesomeIcon
                icon={faHeart}
                className="text-white bg-red-500 p-2 rounded-full cursor-pointer hover:scale-125 transition-all"
            />
            <img
                src={images.iconHaha}
                className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
            />
            <img
                src={images.iconSad}
                className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
            />
            <img
                src={images.iconWow}
                className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
            />
            <img
                src={images.iconAngry}
                className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
            />
        </div>
    );
};

export default EmotionBox;
