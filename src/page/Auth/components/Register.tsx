import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import Loading from '@/components/Loading/Loading';
import images from '@/assets/images';
import { useRegisterMutation } from '@/services/authApiSlice';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    className?: string;
    onClickChangeFeatures: (features: 'login' | 'register') => void;
}
const Register = (props: RegisterProps) => {
    const { onClickChangeFeatures } = props;

    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: yup.object({
            firstName: yup.string().required('Không được để trống').max(30, 'Không được vượt quá 30 kí tự'),
            lastName: yup.string().required('Không được để trống').max(30, 'Không được vượt quá 30 kí tự'),
            email: yup
                .string()
                .required('Không được để trống')
                .max(50, 'Không được vượt quá 50 kí tự')
                .email('Email không đúng'),
            password: yup.string().required('Không được để trống').min(8, 'Mật khẩu phải lớn hơn 8 kí tự'),
            passwordConfirm: yup
                .string()
                .required('Không được để trống')
                .min(8, 'Mật khẩu phải lớn hơn 8 kí tự')
                .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
        }),

        onSubmit: async (values) => {
            try {
                const response = await register({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                }).unwrap();

                if (response.status !== 201 || response?.data?.status !== 'success') {
                    throw response;
                }
                toast.success('Đăng ký thành công');
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
    return (
        <>
            <div className="w-1/2 min-h-screen flex flex-col items-center justify-center space-y-6 bg-dark-300 ">
                <img
                    src={images.image1}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full border border-dark-50 p-3"
                />
                <div className="w-1/2 flex flex-col space-y-2">
                    <input
                        type="text"
                        className="w-full h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                        placeholder="Nhập Họ"
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                        <span className="text-xs font-semibold text-red-500">{formik.errors.firstName}</span>
                    )}
                </div>
                <div className="w-1/2 flex flex-col space-y-2">
                    <input
                        type="text"
                        className="w-full h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                        placeholder="Nhập Tên"
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                        <span className="text-xs font-semibold text-red-500">{formik.errors.lastName}</span>
                    )}
                </div>
                <div className="w-1/2 flex flex-col space-y-2">
                    <input
                        type="text"
                        className="w-full h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                        placeholder="Nhập địa chỉ gmail"
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
                        placeholder="Nhập mật khẩu"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <span className="text-xs font-semibold text-red-500">{formik.errors.password}</span>
                    )}
                </div>
                <div className="w-1/2 flex flex-col space-y-2">
                    <input
                        type="password"
                        className="w-full h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                        placeholder="Nhập mật khẩu"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                        <span className="text-xs font-semibold text-red-500">{formik.errors.passwordConfirm}</span>
                    )}
                </div>

                <button
                    className="w-1/2 px-2 py-3 bg-blue-500 rounded-full text-white font-fold hover:opacity-80 transition-all"
                    onClick={handleSubmitForm}
                >
                    {isLoading ? <Loading /> : 'Đăng Ký'}
                </button>
                <button
                    className="text-content-100 font-semibold text-xs"
                    onClick={() => onClickChangeFeatures('login')}
                >
                    Đã có tài khoản? Đăng nhập tại đây
                </button>
            </div>

            <div className="w-1/2 min-h-screen bg-blue-light flex items-center justify-center">
                <h4 className="max-w-[400px] mx-auto text-4xl text-white font-bold leading-snug drop-shadow-xl">
                    Đăng ký tài khoản
                </h4>
            </div>

            <div className="w-20 h-20 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-light rounded-full border-8 border-dark-300 rotate-[30deg]">
                <img src={images.LogoDark} alt="" className=" w-full" />
            </div>
        </>
    );
};

export default Register;
