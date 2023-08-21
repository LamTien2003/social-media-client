import images from '@/assets/images';

const CommentBox: React.FC = () => {
    return (
        <div className="w-full border-t border-t-light-400 dark:border-t-light-100 dark:text-white py-2">
            <div className="flex relative min-h-[40px]">
                <span className="absolute top-2 left-2 ">
                    {' '}
                    <img src={images.story} alt="" className="w-6 h-6 rounded-full object-cover" />
                </span>
                <div
                    placeholder="Viết bình luận..."
                    contentEditable={true}
                    className="w-full max-w-[600px] min-h-[40px] text-left p-2 pl-14 bg-white border border-gray-300 dark:border-none dark:bg-dark-400 text-content-100 text-xs font-semibold rounded-xl outline-none transition-all"
                ></div>
            </div>
            {[...Array(3)].map((_, index) => (
                <div className="flex my-2" key={index}>
                    <div className="w-1/12 pt-2 ">
                        <img src={images.story} alt="" className="w-8 max-h-8 object-cover rounded-full" />
                    </div>
                    <div className="flex-1 bg-light-300 rounded-lg text-sm text-left px-4 py-2 dark:bg-dark-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo
                        non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus{' '}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentBox;
