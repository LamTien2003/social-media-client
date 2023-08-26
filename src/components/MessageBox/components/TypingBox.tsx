import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    usersTyping: {
        firstName: string;
        lastName: string;
        photo: string;
    }[];
}
const TypingBox = (props: Props) => {
    const { usersTyping } = props;
    return (
        <div className="flex items-center justify-end space-x-2 w-full text-center">
            {usersTyping.map((item, index) => (
                <img src={item.photo} className="w-5 h-5 object-cover rounded-full" key={index} />
            ))}
            <FontAwesomeIcon icon={faEllipsis} fade className=" py-2 px-4 bg-light-300 rounded-xl" />
        </div>
    );
};

export default TypingBox;
