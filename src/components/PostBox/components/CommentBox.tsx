import images from '@/assets/images';
import { useCommentPostMutation } from '@/services/postApiSlice';
import { faPaperPlane, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Comment from '@/type/Comment';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface CommentBoxProps {
    listComment: Comment[];
    idPost: string;
}
const CommentBox = (props: CommentBoxProps) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const { listComment, idPost } = props;

    const [text, setText] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [comment, { isLoading }] = useCommentPostMutation();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files && e.target?.files[0]) {
            const file = e.target.files[0];
            setFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const handleTextChange = (e: FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const value = target.innerText;
        setText(value);
    };
    const textRef = useRef<HTMLDivElement>(null);
    const handleSubmitComment = async () => {
        try {
            const form = new FormData() as FormData;
            form.append('comment', text);
            if (file !== null) {
                form.append('imageComment', file);
            }

            const response = await comment({ id: idPost, formData: form }).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            (textRef?.current as HTMLDivElement).innerText = '';
            setFile(null);
            setText('');
            setPreviewImage('');
            toast.success(response?.data?.message);
        } catch (err: any) {
            toast.warn(err?.msg);
        }
    };
    return (
        <div className="w-full border-t border-t-light-400 dark:border-t-light-100 dark:text-white py-2">
            <div className="flex flex-col bg-white border border-gray-300 dark:border-none dark:bg-dark-400 rounded-xl transition-all">
                <div className="flex relative min-h-[40px]">
                    <span className="absolute top-2 left-2 ">
                        <img src={currentUser?.photo} alt="" className="w-6 h-6 rounded-full object-cover" />
                    </span>
                    <div
                        className="w-full max-w-[600px] min-h-[40px] text-left p-2 pl-14 pr-[106px] text-content-100 text-xs font-semibold outline-none transition-all"
                        placeholder="Viết bình luận..."
                        contentEditable={true}
                        ref={textRef}
                        onInput={handleTextChange}
                    ></div>
                    <div className="absolute top-2 right-4 flex space-x-4 cursor-pointer ">
                        <span
                            className="text-sm font-semibold text-content-300 border-r border-light-300 px-2 "
                            onClick={handleSubmitComment}
                        >
                            Gửi <FontAwesomeIcon icon={faPaperPlane} />
                        </span>

                        <div>
                            <label htmlFor="photoComment">
                                <FontAwesomeIcon icon={faUpload} className="text-content-300" />
                            </label>
                            <input
                                type="file"
                                hidden
                                id="photoComment"
                                name="photoComment"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>

                {previewImage && (
                    <img src={previewImage} alt="" className="w-36 h-32 object-cover rounded-sm mx-14 my-2" />
                )}
            </div>
            {listComment.map((item, index) => (
                <div className="flex my-2" key={index}>
                    <div className="w-1/12 pt-2 ">
                        <img src={item?.user?.photo} alt="" className="w-8 max-h-8 object-cover rounded-full" />
                    </div>
                    <div className="flex-1 bg-light-300 rounded-lg text-xs font-medium text-left px-4 py-2 dark:bg-dark-400">
                        <div className="flex items-center space-x-1 text-sm font-bold mb-1">
                            <span>{`${item?.user?.firstName} ${item?.user?.lastName}`}</span>
                            <span className="text-content-300 text-[10px] font-semibold">{item?.createdAtFromNow}</span>
                        </div>
                        {item?.comment}
                        {item?.imageComment && (
                            <img src={item?.imageComment} alt="" className="w-52 h-52 object-cover mt-2" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentBox;
