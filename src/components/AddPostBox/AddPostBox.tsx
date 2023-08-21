import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { useAddPostMutation } from '@/services/postApiSlice';
import { faPen, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const AddPostBox = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [text, setText] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string[]>([]);
    const [addPost, { isLoading }] = useAddPostMutation();
    const textRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files && e.target?.files[0]) {
            const file = e.target.files[0];
            setFiles((prev) => [...prev, file]);
            setPreviewImage((prev) => [...prev, URL.createObjectURL(file)]);
        }
    };

    const handleTextChange = (e: FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const value = target.innerText;
        setText(value);
    };

    const handleSubmit = async () => {
        try {
            const form = new FormData();
            files.forEach((file) => form.append('imagePost', file));
            form.append('content', text);

            const response = await addPost(form).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            setText('');
            setFiles([]);
            setPreviewImage([]);
            (textRef.current as HTMLDivElement).innerText = '';
            toast.success(response?.data?.message);
        } catch (err: any) {
            toast.warn(err);
        }
    };

    return (
        <Container>
            <div className="flex items-center justify-start space-x-3">
                <FontAwesomeIcon icon={faPen} className="text-content-blue bg-white p-2 rounded-full text-sm" />
                <p className="text-content-100 font-semibold text-xs ">Create Post</p>
            </div>
            {isLoading && <Loading />}
            <div className="flex mt-5 relative">
                <span className="absolute top-2 left-2">
                    {' '}
                    <img src={currentUser?.photo} alt="" className="w-7 h-7 rounded-full object-cover" />
                </span>
                <div
                    ref={textRef}
                    className="w-full min-h-[100px] text-left bg-white border border-gray-300 dark:border-none dark:bg-dark-400 text-content-100 text-xs font-semibold rounded-lg placeholder:text-content-100 placeholder:text-xs p-2 pl-14 outline-none transition-all"
                    placeholder="Bạn đang nghĩ gì ?"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={handleTextChange}
                ></div>
            </div>
            {Boolean(previewImage.length) && (
                <div className="flex space-x-4 mt-4 p-2 overflow-scroll">
                    {previewImage.map((item, index) => (
                        <img src={item} className="w-[150px] h-[200px] object-cover rounded-md" alt="" key={index} />
                    ))}
                </div>
            )}
            <div className="flex space-x-4 mt-4 justify-between">
                <div className="flex space-x-4 mt-4">
                    <label htmlFor="photo" className="flex items-center space-x-2 cursor-pointer">
                        <FontAwesomeIcon icon={faPhotoVideo} className="text-green-500" />
                        <span className="text-gray-600 dark:text-content-light-grey font-medium text-sm mobile:hidden">
                            Photo/Video
                        </span>
                    </label>
                    <input type="file" hidden id="photo" onChange={handleFileChange} />
                </div>
                <button
                    className="bg-red px-8 py-2 rounded-lg bg-content-blue-100 text-content-light-grey"
                    onClick={handleSubmit}
                >
                    Thêm bài viết
                </button>
            </div>
        </Container>
    );
};

export default AddPostBox;
