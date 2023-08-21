import Loading from '@/components/Loading/Loading';
import BlogBox from './BlogBox';
import { useGetReportsQuery } from '@/services/reportApiSlice';
import Container from '@/components/Container/Container';

const ManageBlog: React.FC = () => {
    const { data, isLoading, error } = useGetReportsQuery();
    return (
        <div className="w-full p-20">
            <h2 className="text-lg font-bold">Danh sách thư tố cáo</h2>
            <div className="p-6 -mx-[80px]">
                <div className="flex py-10">
                    <div className="w-3/12 px-4 text-xs font-bold">Danh sách </div>
                    <div className="w-1/12 px-4 text-xs font-bold">Ngày đăng</div>
                    <div className="w-1/12 px-4 text-xs font-bold">Người đăng</div>
                    <div className="w-1/12 px-4 text-xs font-bold">Người tố cáo</div>
                    <div className="w-1/12 px-4 text-xs font-bold">Lý do tố cáo</div>
                    <div className="w-1/12 px-4 text-xs font-bold">Trạng thái bài viết</div>
                    <div className="w-1/12 px-4 text-xs font-bold">Trạng thái user</div>
                    <div className="w-1/12 px-4 text-xs font-bold">Chi tiết bài viết</div>
                    <div className="w-2/12 px-4 text-xs font-bold">Hành động</div>
                </div>

                {!error ? (
                    isLoading ? (
                        <Loading />
                    ) : (
                        <div className="flex flex-col ">
                            {data?.data?.data?.map((item, index) => (
                                <BlogBox data={item} key={index} />
                            ))}
                        </div>
                    )
                ) : (
                    <Container classNames="py-20 rounded-3xl text-2xl font-semibold">
                        Không có thư báo cáo nào
                    </Container>
                )}
            </div>
        </div>
    );
};

export default ManageBlog;
