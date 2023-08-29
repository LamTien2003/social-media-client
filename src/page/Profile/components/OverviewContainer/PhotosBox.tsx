import Container from '@/components/Container/Container';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
interface Props {
    listImage: string[] | [];
}
const PhotosBox = (props: Props) => {
    const user = useSelector((state: RootState) => state.user.user);
    const { listImage } = props;
    return (
        <Container classNames="flex flex-col space-y-6 px-0 py-6">
            <div className="flex justify-between px-6 ">
                <h5 className="text-xs font-bold dark:text-white">Ảnh</h5>
                <NavLink to={`/profile/${user?.id}/photos`} className="text-content-blue text-xs font-semibold">
                    Xem tất cả
                </NavLink>
            </div>
            <div className="w-full flex flex-wrap px-3">
                {listImage?.slice(0, 6).map((photo, index) => (
                    <div className="w-1/2 p-1" key={index}>
                        <img src={photo} alt="" className="w-full max-h-[150px] object-cover rounded-md" />
                    </div>
                ))}
                {!listImage.length && (
                    <div className="w-full text-center font-medium dark:text-white">Không có ảnh</div>
                )}
            </div>
            <button className="bg-content-200 w-6/12 mx-auto p-2 rounded-full text-xs font-semibold mb-">
                Xem thêm
            </button>
        </Container>
    );
};

export default PhotosBox;
