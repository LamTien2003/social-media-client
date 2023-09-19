import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useLoginMutation } from '@/services/authApiSlice';
import { useNavigate } from 'react-router-dom';

import { setToken } from '@/utils/utils';

import Loading from '@/components/Loading/Loading';
import images from '@/assets/images';

interface LoginProps {
    className?: string;
    onClickChangeFeatures: (features: 'login' | 'register') => void;
}
const Login = (props: LoginProps) => {
    const { onClickChangeFeatures } = props;
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required('Không được để trống')
                .max(50, 'Không được vượt quá 50 kí tự')
                .email('Email không đúng'),
            password: yup.string().required('Không được để trống').min(8, 'Mật khẩu phải lớn hơn 8 kí tự'),
        }),

        onSubmit: async (values) => {
            try {
                const response = await login({
                    email: values.email,
                    password: values.password,
                }).unwrap();

                if (response.status !== 200 || response?.data?.status !== 'success') {
                    throw response;
                }
                if (response?.data?.accessToken) {
                    setToken(response.data.accessToken);
                }
                toast.success('Đăng nhập thành công');
                navigate('/');
            } catch (err: any) {
                toast.error(err?.data.msg);
            }
        },
    });

    const handleSubmitForm = () => {
        if (!formik.isValid) {
            return toast.warn('Vui lòng nhập chính xác thông tin');
        }
        formik.handleSubmit();
    };

    const handleLoginWithGoogle = async () => {
        try {
            let timer: NodeJS.Timeout | null = null;
            const URLLogin = `${
                import.meta.env.PROD ? import.meta.env.VITE_URL_PRODUCTION : import.meta.env.VITE_URL_DEVELOPMENT
            }/auth/loginGoogle`;
            const newWindow = window.open(URLLogin, '_blank', 'width=500,height=600');

            // Timer every 5s to check if we have success login
            if (newWindow) {
                timer = setInterval(() => {
                    // If login seccess, refresh to home page to check login and call refreshToken => get User
                    if (newWindow.closed) {
                        timer && clearInterval(timer);
                        window.location.href = '/';
                    }
                }, 500);
            }
        } catch (err: any) {
            toast.error(err?.data?.msg);
        }
    };

    return (
        <>
            <div className="w-1/2 min-h-screen bg-blue-light flex items-center justify-center">
                <h4 className="max-w-[400px] mx-auto text-4xl text-white font-bold leading-snug drop-shadow-xl">
                    Đăng nhập tài khoản
                </h4>
            </div>
            <div className="w-1/2 min-h-screen flex flex-col items-center justify-center space-y-6 bg-dark-300">
                <img
                    src={images.image1}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full border border-dark-50 p-3"
                />
                <div className="w-1/2 flex flex-col space-y-2">
                    <input
                        type="text"
                        className="w-full h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                        placeholder="Tên tài khoản"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <span className="text-xs font-semibold text-red-500">{formik.errors.email}</span>
                    )}
                </div>
                <div className="w-1/2 flex flex-col space-y-2">
                    <input
                        type="password"
                        className="w-full h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                        placeholder="**********"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <span className="text-xs font-semibold text-red-500">{formik.errors.password}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-1/2 px-2 py-3 bg-blue-500 rounded-full text-white font-bold hover:opacity-80 transition-all"
                    onClick={handleSubmitForm}
                >
                    {isLoading ? <Loading /> : 'Đăng nhập'}
                </button>

                <button
                    type="submit"
                    className="w-1/2 px-2 py-3 flex items-center justify-center bg-white text-black font-bold rounded-full hover:opacity-80 transition-all "
                    onClick={handleLoginWithGoogle}
                >
                    <img src={images.googleLogo} alt="" className="w-5 mr-4" />
                    Đăng nhập với Google
                </button>

                <button
                    className="text-content-100 font-semibold text-xs"
                    onClick={() => onClickChangeFeatures('register')}
                >
                    Đăng ký tài khoản
                </button>
                <button className="text-content-100 font-semibold text-xs">Quên mật khẩu?</button>
            </div>

            <div className="w-20 h-20 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-light rounded-full border-8 border-dark-300 rotate-[30deg]">
                <img src={images.LogoDark} alt="" className=" w-full bg-transparent" />
            </div>
        </>
    );
};

export default Login;
