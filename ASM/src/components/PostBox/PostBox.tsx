import images from '@/assets/images';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import Container from '@/components/Container/Container';
import { useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import EmotionBox from './components/EmotionBox';
import CommentBox from './components/CommentBox';
// import { useInView } from 'framer-motion';
const PostBox = () => {
    // const isInView = useInView(boxRef);

    const [isCommentBox, setIsCommentBox] = useState<boolean>(false);
    const springConfig = { damping: 20, stiffness: 150 };
    const initialScale = 0.5;
    const opacity = useSpring(0, springConfig) as any;
    const scale = useSpring(initialScale, springConfig) as any;

    const onMount = () => {
        scale.set(1);
        opacity.set(1);
    };

    const onHide = ({ unmount }: { unmount: any }) => {
        const cleanup = scale.onChange((value: number) => {
            if (value <= initialScale) {
                cleanup();
                unmount();
            }
        });
        scale.set(initialScale);
        opacity.set(0);
    };
    return (
        <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 300, opacity: 1 }}
            viewport={{ once: true }}
            // transition={{ duration: 0.5 }}
        >
            <Container classNames="flex flex-col items-start px-6 pt-6 pb-2">
                <div className="flex items-center space-x-5">
                    <img src={images.avatar} alt="" className="w-11 h-11 rounded-full" />
                    <div className="flex flex-col items-start">
                        <p className="font-bold text-xs text-black dark:text-white">Lâm Tiến</p>
                        <span className="text-content-300 dark:text-content-100 text-xs font-normal">3 hour ago</span>
                    </div>
                </div>

                <div className="mt-4 mr-12">
                    <p className="text-gray-500 dark:text-content-200 text-xs leading-7 text-left font-medium ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo
                        non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus{' '}
                        <NavLink to="" className="text-content-blue text-xs ml-1">
                            See more
                        </NavLink>
                    </p>
                </div>

                <div className="flex space-x-4 w-full mt-4">
                    <NavLink to="" className="w-1/3 block relative">
                        <img src={images.story} alt="" className="w-full rounded-md object-cover" />
                    </NavLink>
                    <NavLink to="" className="w-1/3 block relative">
                        <img src={images.story} alt="" className="w-full rounded-md object-cover" />
                    </NavLink>
                    <NavLink to="" className="w-1/3 block relative">
                        <img src={images.story} alt="" className="w-full rounded-md object-cover" />
                        <span className="absolute top-0 left-0 right-0 bottom-0 bg-blur-100 rounded-md text-xl text-white font-semibold flex items-center justify-center">
                            +2
                        </span>
                    </NavLink>
                </div>

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
                            <span className="text-black dark:text-white">2.8K reactions</span>
                        </div>
                    </div>
                    <div className="flex items-center text-xs font-semibold text-white">
                        <FontAwesomeIcon icon={faMessage} className="text-white p-2 rounded-full text-sm" />
                        <span className="text-black dark:text-white">22 Comment</span>
                    </div>
                </div>

                <div className="w-full flex items-center border-t border-light-400 dark:border-t-light-100 text-content-100 mt-2 py-1">
                    <Tippy
                        render={(attrs) => (
                            <motion.div style={{ scale, opacity }} tabIndex={-1} {...attrs}>
                                <EmotionBox />
                            </motion.div>
                        )}
                        interactive
                        onMount={onMount}
                        onHide={onHide}
                        delay={200}
                        animation={true}
                    >
                        <div className="w-1/2 flex justify-center items-center space-x-2 text-sm py-2 px-6 rounded-md cursor-pointer  text-content-300 hover:bg-content-300 hover:text-white dark:hover:bg-slate-600 dark:text-white dark:hover:text-dark-200">
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>Thích</span>
                        </div>
                    </Tippy>
                    <div
                        className="w-1/2 flex justify-center items-center space-x-2 text-sm py-2 px-6 rounded-md cursor-pointer group text-content-300 hover:bg-content-300 hover:text-white dark:hover:bg-slate-600 dark:text-white dark:hover:text-dark-200"
                        onClick={() => setIsCommentBox((prev) => !prev)}
                    >
                        <FontAwesomeIcon icon={faMessage} />
                        <span>Bình luận</span>
                    </div>
                </div>

                {isCommentBox && <CommentBox />}
            </Container>
        </motion.div>
    );
};

export default PostBox;
