import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { NavLink } from 'react-router-dom';

const PhotosBox = () => {
    return (
        <Container classNames="flex flex-col space-y-6 px-0 py-6">
            <div className="flex justify-between px-6 ">
                <h5 className="text-xs font-bold dark:text-white">Photos</h5>
                <NavLink to="" className="text-content-blue text-xs font-semibold">
                    See all
                </NavLink>
            </div>
            <div className="w-full flex flex-wrap px-3">
                <div className="w-1/2 p-1">
                    <img src={images.image1} alt="" className="w-full max-h-[150px] object-cover rounded-md" />
                </div>
                <div className="w-1/2 p-1">
                    <img src={images.image2} alt="" className="w-full max-h-[150px] object-cover rounded-md" />
                </div>
                <div className="w-1/2 p-1">
                    <img src={images.image3} alt="" className="w-full max-h-[150px] object-cover rounded-md" />
                </div>
            </div>
            <button className="bg-content-200 w-6/12 mx-auto p-2 rounded-full text-xs font-semibold mb-">
                Xem thêm
            </button>
        </Container>
    );
};

export default PhotosBox;
