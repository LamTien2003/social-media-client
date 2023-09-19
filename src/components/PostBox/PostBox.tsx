import Post from '@/type/Post';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faDeleteLeft,
    faEllipsis,
    faHeart,
    faMessage,
    faThumbsUp,
    faWarning,
} from '@fortawesome/free-solid-svg-icons';

import Container from '@/components/Container/Container';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CommentBox from './components/CommentBox';
import PopupImages from './components/PopupImages';

// import { useInView } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import EmotionBox from './components/EmotionBox';
import IconBoxWithPopup from '../IconBoxWithPopup/IconBoxWithPopup';
import ReportPopup from './components/ReportPopup';

interface PostBoxProps {
    data: Post;
}

const PostBox = (props: PostBoxProps) => {
    // const isInView = useInView(boxRef);
    const { data } = props;

    const [isCommentBox, setIsCommentBox] = useState<boolean>(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [isReportPopup, setIsReportPopup] = useState(false);

    const ImagesList = () => {
        if (data?.imagePost?.length > 3) {
            const images = data?.imagePost?.slice(0, 3);
            return (
                <div className="flex space-x-4 w-full mt-4">
                    {images.map((item, index) => {
                        if (index === 2) {
                            return (
                                <NavLink
                                    to=""
                                    className="min-w-[150px] max-w-full w-full block relative"
                                    key={index}
                                    onClick={() => setOpenPopup(true)}
                                >
                                    <img src={item} alt="" className="w-full min-h-[300px] rounded-md object-cover" />
                                    <span className="absolute top-0 left-0 right-0 bottom-0 bg-blur-100 min-h-[300px] rounded-md text-xl text-white font-semibold flex items-center justify-center">
                                        {`+ ${data?.imagePost?.length - 3}`}
                                    </span>
                                </NavLink>
                            );
                        }
                        return (
                            <NavLink
                                to=""
                                className="min-w-[150px] max-w-full w-full block relative"
                                key={index}
                                onClick={() => setOpenPopup(true)}
                            >
                                <img src={item} alt="" className="w-full min-h-[300px] rounded-md object-cover" />
                            </NavLink>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="flex space-x-4 w-full mt-4">
                {data.imagePost.map((item, index) => {
                    return (
                        <NavLink
                            to=""
                            className="min-w-[150px] max-w-full w-full block relative"
                            key={index}
                            onClick={() => setOpenPopup(true)}
                        >
                            <img src={item} alt="" className="w-full rounded-md object-cover" />
                        </NavLink>
                    );
                })}
            </div>
        );
    };

    return (
        <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 300, opacity: 1 }}
            viewport={{ once: true }}
            // transition={{ duration: 0.5 }}
            className="w-full"
        >
            <Container classNames="flex flex-col items-start px-6 pt-6 pb-2">
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center space-x-5">
                        <NavLink to={`/profile/${data?.user?.id}`}>
                            <img src={data?.user?.photo} alt="" className="w-11 h-11 rounded-full" />
                        </NavLink>
                        <NavLink to={`/profile/${data?.user?.id}`} className="flex flex-col items-start">
                            <p className="font-bold text-xs text-black dark:text-white">{`${data?.user?.firstName} ${data?.user?.lastName}`}</p>
                            <span className="text-content-300 dark:text-content-100 text-xs font-normal">
                                {data?.createdAtFromNow}
                            </span>
                        </NavLink>
                    </div>

                    <IconBoxWithPopup className="w-auto dark:text-white" icon={<FontAwesomeIcon icon={faEllipsis} />}>
                        <div className="z-50 absolute top-8 right-0 w-[300px] h-[200px] p-6 text-left overflow-y-scroll text-black dark:text-white text-xs bg-white dark:bg-dark-500 border border-content-100 dark:border-none dark:shadow-none rounded-md">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-4 pb-2 border-b border-b-light-400">
                                    <FontAwesomeIcon icon={faBookmark} className="text-lg" />
                                    <div className="flex flex-1 flex-col items-start">
                                        <p className="text-sm font-semibold">Lưu bài viết</p>
                                        <p className="text-content-100 text-xs">Lưu bài viết vào danh sách của bạn</p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 pb-2 border-b border-b-light-400"
                                    onClick={() => setIsReportPopup(true)}
                                >
                                    <FontAwesomeIcon icon={faWarning} className="text-lg" />
                                    <div className="flex flex-1 flex-col items-start">
                                        <p className="text-sm font-semibold">Tố cáo bài viết</p>
                                        <p className="text-content-100 text-xs">Gửi tố cáo bài viết cho chúng tôi</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 pb-2 border-b border-b-light-400">
                                    <FontAwesomeIcon icon={faDeleteLeft} className="text-lg" />
                                    <div className="flex flex-1 flex-col items-start">
                                        <p className="text-sm font-semibold">Xóa bài viết</p>
                                        <p className="text-content-100 text-xs">Xóa bài viết</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </IconBoxWithPopup>
                </div>

                <div className="mt-4 mr-12">
                    <p className="text-gray-500 dark:text-content-200 text-xs leading-7 text-left font-medium ">
                        {data?.content}
                        {/* <NavLink to="" className="text-content-blue text-xs ml-1">
                            See more
                        </NavLink> */}
                    </p>
                </div>

                <ImagesList />

                <div className="w-full flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-1">
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="text-white bg-content-blue-100 p-2 rounded-full text-sm"
                        />
                        <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="text-white bg-red-500 p-2 rounded-full text-sm"
                            />
                            <span className="text-black dark:text-white">{data?.likes?.length} reactions</span>
                        </div>
                    </div>
                    <div className="flex items-center text-xs font-semibold text-white">
                        <FontAwesomeIcon icon={faMessage} className="text-white p-2 rounded-full text-sm" />
                        <span className="text-black dark:text-white">{data?.comments?.length} Comment</span>
                    </div>
                </div>

                <div className="w-full flex items-center border-t border-light-400 dark:border-t-light-100 text-content-100 mt-2 py-1">
                    <EmotionBox idPost={data?.id} likeList={data?.likes} postedBy={data?.user} />
                    <div
                        className="w-1/2 flex justify-center items-center space-x-2 text-sm py-2 px-6 rounded-md cursor-pointer group text-content-300 hover:bg-content-300 hover:text-white dark:hover:bg-slate-600 dark:text-white dark:hover:text-dark-200"
                        onClick={() => setIsCommentBox((prev) => !prev)}
                    >
                        <FontAwesomeIcon icon={faMessage} />
                        <span className="font-semibold">Bình luận</span>
                    </div>
                </div>

                {isCommentBox && <CommentBox listComment={data?.comments} idPost={data?.id} />}
                {openPopup && <PopupImages imageList={data?.imagePost} onClickOutSide={() => setOpenPopup(false)} />}
                {isReportPopup && <ReportPopup idPost={data?.id} onClickOutSide={() => setIsReportPopup(false)} />}
            </Container>
        </motion.div>
    );
};

export default PostBox;
