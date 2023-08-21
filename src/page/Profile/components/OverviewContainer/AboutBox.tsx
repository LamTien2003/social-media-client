import Container from '@/components/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons';
import User from '@/type/User';

interface Props {
    data: User;
}
const AboutBox = (props: Props) => {
    const { data } = props;

    return (
        <Container classNames="shadow-md text-left p-0">
            <div className="border-b border-b-dark-100-100 p-6 pb-1">
                <h5 className="text-sm font-bold dark:text-white">Giới thiệu</h5>
                <p className="text-content-100 text-xs font-semibold leading-6 my-2">{data?.introduce}</p>
            </div>
            <div className="flex flex-col items-left p-6 space-y-5 dark:text-white">
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faLock} className="text-content-100 w-5 h-5" />
                    <div className="flex flex-col">
                        <p className="text-xs font-bold">Chế độ riêng tư</p>
                        <span className="text-content-100 text-xs font-semibold">What's up, how are you?</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faLocationDot} className="text-content-100 w-5 h-5" />
                    <div className="flex flex-col">
                        <p className="text-xs font-bold">Nơi ở</p>
                        <span className="text-content-100 text-xs font-semibold">{data?.location}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faBriefcase} className="text-content-100 w-5 h-5" />
                    <div className="flex flex-col">
                        <p className="text-xs font-bold">Công việc</p>
                        <span className="text-content-100 text-xs font-semibold">{data?.occupation}</span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AboutBox;
