import images from '@/assets/images';

const NotifyBox = () => {
    return (
        <div className="absolute top-10 right-0 w-[310px] h-[390px] p-6 text-left overflow-y-scroll text-black dark:text-white text-xs bg-white dark:bg-dark-500 border border-content-100 dark:border-none dark:shadow-none rounded-md  ">
            <h4 className="text-sm font-bold mb-4">Thông báo</h4>
            <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <img src={images.cat} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-sm font-semibold">Lâm Tiến</h5>
                        <p className="text-content-100 text-xs">There are many variation of pass</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotifyBox;
