import images from '@/assets/images';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Auth = () => {
    const [feature, setFeature] = useState('login');

    return (
        <div className="flex transition-all">
            {feature === 'login' && (
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
                        <input
                            type="text"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="Tên tài khoản"
                        />
                        <input
                            type="password"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="**********"
                        />
                        <button className="w-1/2 px-2 py-3 bg-blue-500 rounded-full text-white font-fold hover:opacity-80 transition-all">
                            Đăng nhập
                        </button>
                        <button
                            className="text-content-100 font-semibold text-xs"
                            onClick={() => setFeature('register')}
                        >
                            Đăng ký tài khoản
                        </button>
                        <button className="text-content-100 font-semibold text-xs">Quên mật khẩu?</button>
                    </div>

                    <div className="w-20 h-20 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-light rounded-full border-8 border-dark-300 rotate-[30deg]">
                        <img src={images.LogoDark} alt="" className=" w-full" />
                    </div>
                </>
            )}
            {feature === 'register' && (
                <>
                    <div className="w-1/2 min-h-screen flex flex-col items-center justify-center space-y-6 bg-dark-300 ">
                        <img
                            src={images.image1}
                            alt=""
                            className="w-[100px] h-[100px] rounded-full border border-dark-50 p-3"
                        />
                        <input
                            type="text"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="Tên tài khoản"
                        />
                        <input
                            type="password"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="Nhập mật khẩu"
                        />
                        <input
                            type="password"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="Xác nhận mật khẩu"
                        />
                        <input
                            type="text"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="Nhập địa chỉ Gmail"
                        />
                        <input
                            type="text"
                            className="w-1/2 h-10 bg-dark-400 text-white  px-6 py-4 rounded-lg"
                            placeholder="Nhập số điện thoại"
                        />
                        <button className="w-1/2 px-2 py-3 bg-blue-500 rounded-full text-white font-fold hover:opacity-80 transition-all">
                            Đăng Ký
                        </button>
                        <button className="text-content-100 font-semibold text-xs" onClick={() => setFeature('login')}>
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
            )}
        </div>
    );
};

export default Auth;
