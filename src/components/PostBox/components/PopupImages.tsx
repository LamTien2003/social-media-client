import Popup from '@/components/Popup/Popup';
import { Pagination, A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface PopupImagesProps {
    onClickOutSide: () => void;
    imageList: string[];
}
const PopupImages = (props: PopupImagesProps) => {
    const { imageList, onClickOutSide } = props;
    return (
        <Popup onClickOutSide={() => onClickOutSide()}>
            <div className=" flex justify-center mx-auto w-[500px] h-[500px]">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Navigation, Pagination, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {imageList.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item} alt="" className="max-w-[500px] max-h-[500px] object-cover mx-auto" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Popup>
    );
};

export default PopupImages;
