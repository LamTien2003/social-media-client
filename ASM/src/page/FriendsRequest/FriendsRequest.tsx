import images from '@/assets/images';

const FriendsRequest = () => {
    return (
        <div className=" flex flex-col items-start px-10 space-y-4">
            <h2 className="text-lg font-bold dark:text-white ">Lời mời kết bạn</h2>
            <div className="w-full flex flex-wrap justify-left">
                {[...Array(15)].map((_, index) => (
                    <div
                        className="w-[210px] flex flex-col  items-start rounded-xl shadow-xl border-[0.8px] border-light-300 pb-3 my-2 mx-2 dark:border-light-100 dark:shadow-none"
                        key={index}
                    >
                        <img
                            src={images.story}
                            alt=""
                            className="w-full max-h-[230px] rounded-tr-xl rounded-tl-xl object-cover"
                        />
                        <div className="w-full px-4 mt-2 text-left">
                            <h4 className="font-semibold text-md dark:text-white">Lâm Tiến</h4>
                            <span className="text-xs text-content-300 font-semibold">7 bạn chung</span>
                        </div>
                        <div className="w-full flex flex-col space-y-1 items-center justify-center px-2 mt-2">
                            <button className="w-full py-2.5 px-2 bg-content-blue text-white text-xs font-bold rounded-lg">
                                Xác nhận
                            </button>
                            <button className="w-full py-2.5 px-2 bg-content-100 text-white text-xs font-bold rounded-lg">
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsRequest;
