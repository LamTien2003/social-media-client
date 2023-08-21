import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import images from '@/assets/images';
const StoryBox = () => {
    return (
        <div className="flex space-x-3 w-full ">
            <Swiper spaceBetween={50} slidesPerView={5}>
                <SwiperSlide>
                    <div className="min-w-[125px] h-[200px] bg-dark-400 dark:bg-dark-300 rounded-xl relative mobile:w-1/3">
                        <span className="absolute flex justify-center items-center bottom-3 left-2/4 -translate-x-1/2 w-12 h-12 bg-white text-content-blue rounded-full text-center text-4xl cursor-pointer ">
                            +
                        </span>
                    </div>
                </SwiperSlide>

                {[...Array(10)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative min-w-[125px] h-[200px] rounded-xl object-cover cursor-pointer after:absolute after:content-[''] after:w-full after:h-full after:from-slate-900 after:bottom-0 after:left-0 after:rounded-xl after:bg-[linear-gradient(180deg,_rgba(0,0,0,.01)_60%,_rgba(0,0,0,.9)_100%)] mobile:w-1/3"
                            style={{
                                backgroundImage: `url(${images.cat})`,
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full z-10">
                                <img src={images.cat} alt="" className="w-12 h-12 rounded-full object-cover" />
                                <p className="text-white font-semibold text-sm">Lâm Tiến</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default StoryBox;
