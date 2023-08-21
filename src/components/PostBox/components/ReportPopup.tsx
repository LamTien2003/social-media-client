import Container from '@/components/Container/Container';
import Loading from '@/components/Loading/Loading';
import Popup from '@/components/Popup/Popup';
import { useReportPostMutation } from '@/services/reportApiSlice';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

interface Props {
    idPost: string;
    onClickOutSide: () => void;
}
const reasons = ['Ảnh khỏa thân', 'Spam', 'Chứa từ ngữ cấm', 'Nội dung bạo lực', 'Nội dung gây quấy rối'];
const ReportPopup = (props: Props) => {
    const { idPost, onClickOutSide } = props;
    const [report, { isLoading }] = useReportPostMutation();

    const handleReport = async (reason: string) => {
        try {
            const response = await report({ id: idPost, reason }).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            onClickOutSide();
            toast.success('Đơn tố cáo bài viết đã được gửi, chúng tôi sẽ tiến hành tra cứu một cách sớm nhất');
        } catch (err: any) {
            console.log(err);
        }
    };
    return (
        <Popup onClickOutSide={onClickOutSide}>
            <Container classNames="w-[600px] h-[400px] overflow-y-scroll">
                {isLoading && <Loading className="text-center" />}
                <div className="flex flex-col space-y-2 py-2">
                    <h5 className="text-xl font-bold dark:text-white">Hãy chọn một trong các vấn đề</h5>
                    <p className="text-xs text-content-300">
                        Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi
                        báo cáo với Facebook.
                    </p>
                </div>
                <div className="flex flex-col space-y-4">
                    {reasons.map((item, index) => (
                        <div
                            className="group w-full p-4 text-base font-bold text-left rounded-md cursor-pointer hover:bg-content-200 transition-all dark:text-white dark:hover:text-black"
                            onClick={() => handleReport(item)}
                            key={index}
                        >
                            {item}
                            <FontAwesomeIcon icon={faArrowRight} className="hidden group-hover:inline-block ml-4" />
                        </div>
                    ))}
                </div>
            </Container>
        </Popup>
    );
};

export default ReportPopup;
