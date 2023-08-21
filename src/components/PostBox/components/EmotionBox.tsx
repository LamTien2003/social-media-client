import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { motion, useSpring } from 'framer-motion';

import { useReactionPostMutation, useRemoveReactionPostMutation } from '@/services/postApiSlice';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react/headless';

import images from '@/assets/images';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Loading from '@/components/Loading/Loading';

const emotion = {
    like: (
        <>
            <FontAwesomeIcon
                icon={faThumbsUp}
                className="text-white bg-content-blue p-1 rounded-full cursor-pointer transition-all"
            />
            <span className="text-content-blue font-bold">Thích</span>
        </>
    ),
    heart: (
        <>
            <FontAwesomeIcon
                icon={faHeart}
                className="text-white bg-red-500 p-1 rounded-full cursor-pointer transition-all"
            />
            <span className="text-red-500 font-bold">Yêu thích</span>
        </>
    ),
    haha: (
        <>
            <img
                src={images.iconHaha}
                className="text-white bg-yellow-500-500 w-6 h-6 rounded-full cursor-pointer transition-all"
            />
            <span className="text-yellow-500 font-bold">Haha</span>
        </>
    ),
    sad: (
        <>
            <img
                src={images.iconSad}
                className="text-white bg-yellow-500 w-6 h-6 rounded-full cursor-pointer transition-all"
            />
            <span className="text-yellow-500 font-bold">Buồn</span>
        </>
    ),
    wow: (
        <>
            <img
                src={images.iconWow}
                className="text-white bg-yellow-500 w-6 h-6 rounded-full cursor-pointer transition-all"
            />
            <span className="text-yellow-500 font-bold">Woww</span>
        </>
    ),
    angry: (
        <>
            <img
                src={images.iconAngry}
                className="text-white bg-yellow-500 w-6 h-6 rounded-full cursor-pointer transition-all"
            />
            <span className="text-yellow-500 font-bold">Giận dữ</span>
        </>
    ),
};

interface EmotionBoxProps {
    idPost: string;
    likeList: {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            photo: string;
        };
        emotion: 'like' | 'haha' | 'sad' | 'angry' | 'wow';
    }[];
}

const EmotionBox = (props: EmotionBoxProps) => {
    const { idPost, likeList } = props;
    const currentUser = useSelector((state: RootState) => state.user.user);

    const [reaction, { isLoading }] = useReactionPostMutation();
    const [removeReaction, { isLoading: isLoadingRemove }] = useRemoveReactionPostMutation();
    const handleReaction = async (emotion: string) => {
        try {
            const response = await reaction({ id: idPost, emotion }).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
        } catch (err: any) {
            toast.warn(err);
        }
    };
    const isLike = useMemo(() => {
        return likeList.find((item) => item.user.id === currentUser?.id);
    }, [currentUser?.id, likeList]);

    // Framer motion
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
        <Tippy
            render={(attrs) => (
                <motion.div style={{ scale, opacity }} tabIndex={-1} {...attrs}>
                    <div className="flex space-x-4 p-4 bg-white rounded-full border border-gray-200 shadow-lg dark:bg-dark-300 dark:border-light-100">
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            onClick={() => handleReaction('like')}
                            className="text-white bg-content-blue p-2 rounded-full cursor-pointer hover:scale-125 transition-all"
                        />
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => handleReaction('heart')}
                            className="text-white bg-red-500 p-2 rounded-full cursor-pointer hover:scale-125 transition-all"
                        />
                        <img
                            src={images.iconHaha}
                            onClick={() => handleReaction('haha')}
                            className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
                        />
                        <img
                            src={images.iconSad}
                            onClick={() => handleReaction('sad')}
                            className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
                        />
                        <img
                            src={images.iconWow}
                            onClick={() => handleReaction('wow')}
                            className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
                        />
                        <img
                            src={images.iconAngry}
                            onClick={() => handleReaction('angry')}
                            className="text-white bg-yellow-500-500 w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-all"
                        />
                    </div>
                </motion.div>
            )}
            interactive
            onMount={onMount}
            onHide={onHide}
            delay={200}
            animation={true}
        >
            <div className="w-1/2 flex justify-center items-center space-x-2 text-sm py-2 px-6 rounded-md cursor-pointer text-content-300 hover:text-content-200 dark:hover:bg-slate-600 dark:text-white dark:hover:text-dark-200">
                {isLike ? (
                    <div className="flex items-center space-x-2" onClick={() => removeReaction(idPost)}>
                        {emotion[isLike.emotion]}
                        {isLoadingRemove && <Loading />}
                    </div>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span className="text-content-300 font-semibold">Thích</span>
                    </>
                )}
                {isLoading && <Loading />}
            </div>
        </Tippy>
    );
};

export default EmotionBox;
