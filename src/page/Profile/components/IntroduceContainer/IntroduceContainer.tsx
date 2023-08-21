import Container from '@/components/Container/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import User from '@/type/User';
import { useChangeMeMutation } from '@/services/userApiSlice';
import { toast } from 'react-toastify';

const IntroduceContainer = () => {
    const { user, currentUser } = useOutletContext<{ user: User; currentUser: User }>();
    const [changeMe, { isLoading: isChangging }] = useChangeMeMutation();

    const [isEditFirstName, setIsEditFirstName] = useState(false);
    const [isEditLastName, setIsEditLastName] = useState(false);
    const [isEditLocation, setIsEditLocation] = useState(false);
    const [isEditOccupation, setIsEditOccupation] = useState(false);
    const [isEditIntroduce, setIsEditIntroduce] = useState(false);

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [location, setLocation] = useState(user?.location || '');
    const [occupation, setOccupation] = useState(user?.occupation || '');
    const [introduce, setIntroduce] = useState('');
    const introduceRef = useRef<HTMLDivElement>(null);

    const handleTextChange = (e: FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const value = target.innerText;
        setIntroduce(value);
    };
    const handleSubmit = async (formData: FormData, callback?: () => void) => {
        try {
            const response = await changeMe(formData).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            callback && callback();
            toast.success('Thay đổi thông tin thành công');
        } catch (err: any) {
            toast.error(err.msg);
        }
    };
    const handleSubmitIntroduce = async () => {
        try {
            const formData = new FormData();
            introduce && formData.append('introduce', introduce);

            await handleSubmit(formData, () => setIsEditIntroduce(false));
        } catch (err: any) {
            toast.error(err.msg);
        }
    };
    const handleSubmitInfo = async () => {
        try {
            const formData = new FormData();
            firstName && formData.append('firstName', firstName);
            lastName && formData.append('lastName', lastName);
            location && formData.append('location', location);
            occupation && formData.append('occupation', occupation);

            await handleSubmit(formData, () => {
                setIsEditFirstName(false);
                setIsEditLastName(false);
                setIsEditLocation(false);
                setIsEditOccupation(false);
            });
        } catch (err: any) {
            toast.error(err.msg);
        }
    };

    return (
        <div className="flex items-start space-x-4">
            <div className="w-4/12">
                <Container classNames="p-0">
                    <div className="border-b border-b-dark-100-100 p-6">
                        <h5 className="text-sm font-bold dark:text-white">
                            Giới thiệu
                            <span className="cursor-pointer ml-2" onClick={() => setIsEditIntroduce((prev) => !prev)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                        </h5>
                        <div
                            className={`px-4 py-2 text-content-100 text-xs font-semibold leading-6 my-3 rounded-md break-words ${
                                isEditIntroduce && 'border-2 border-content-300'
                            }`}
                            suppressContentEditableWarning
                            contentEditable={isEditIntroduce}
                            ref={introduceRef}
                            onInput={handleTextChange}
                            dangerouslySetInnerHTML={{ __html: user?.introduce }}
                        ></div>
                        {isEditIntroduce && (
                            <button
                                className="bg-content-blue py-2 px-4 text-white font-semibold text-xs rounded-lg"
                                onClick={handleSubmitIntroduce}
                            >
                                Lưu thay đổi
                            </button>
                        )}
                    </div>
                </Container>
            </div>
            <div className="flex-1">
                <Container>
                    <h5 className="text-sm font-bold dark:text-white">Thông tin tài khoản</h5>
                    <div className="flex flex-col mt-4">
                        <div className="flex items-center space-x-4 px-4 py-2 text-sm font-semibold rounded-lg">
                            <span>Họ: </span>
                            {!isEditFirstName ? (
                                <span>{firstName} </span>
                            ) : (
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onBlur={() => setIsEditFirstName((prev) => !prev)}
                                    className="flex-1 outline-2 border border-content-300 rounded-md px-2"
                                />
                            )}
                            <span className="cursor-pointer ml-2" onClick={() => setIsEditFirstName((prev) => !prev)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 p-4 text-sm font-semibold rounded-lg">
                            <span>Tên: </span>
                            {!isEditLastName ? (
                                <span>{lastName} </span>
                            ) : (
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onBlur={() => setIsEditLastName((prev) => !prev)}
                                    className="flex-1 outline-2 border border-content-300 rounded-md px-2"
                                />
                            )}
                            <span className="cursor-pointer ml-2" onClick={() => setIsEditLastName((prev) => !prev)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 p-4 text-sm font-semibold rounded-lg">
                            <span>Nơi sinh sống: </span>
                            {!isEditLocation ? (
                                <span>{location} </span>
                            ) : (
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onBlur={() => setIsEditLocation((prev) => !prev)}
                                    className="flex-1 outline-2 border border-content-300 rounded-md px-2"
                                />
                            )}
                            <span className="cursor-pointer ml-2" onClick={() => setIsEditLocation((prev) => !prev)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 p-4 text-sm font-semibold rounded-lg">
                            <span>Nghề nghiệp: </span>
                            {!isEditOccupation ? (
                                <span>{occupation} </span>
                            ) : (
                                <input
                                    type="text"
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                    onBlur={() => setIsEditOccupation((prev) => !prev)}
                                    className="flex-1 outline-2 border border-content-300 rounded-md px-2"
                                />
                            )}
                            <span className="cursor-pointer ml-2" onClick={() => setIsEditOccupation((prev) => !prev)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                        </div>
                        <button
                            className="bg-content-blue py-2 px-4 text-white font-semibold text-xs rounded-lg"
                            onClick={handleSubmitInfo}
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default IntroduceContainer;
