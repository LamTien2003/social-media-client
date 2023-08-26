import { socket } from '@/services/socket';
import Notification from '@/type/Notification';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    notifications: Notification[] | [];
}

const NotifyBox = (props: Props) => {
    const { notifications } = props;

    return (
        <div className="absolute top-10 right-0 w-[310px] h-[390px] py-6 text-left overflow-y-scroll text-black dark:text-white text-xs bg-white dark:bg-dark-500 border border-content-100 dark:border-none dark:shadow-none rounded-md  ">
            <h4 className="text-sm font-bold mb-4 mx-4 ">Thông báo</h4>
            <div className="w-full flex flex-col space-y-4">
                {notifications.map((item, index) => (
                    <NavLink
                        className={`flex space-x-4 ${!item.isSeen && 'bg-light-300 '} rounded-md mx-2 p-2`}
                        key={index}
                        to={item.type === 'friend' ? `/profile/${item.entityId}` : `/post/${item.entityId}`}
                    >
                        <img src={item.sender?.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <p className="text-content-100 text-xs">
                            <span className="text-content-300 font-semibold mr-1">{`${item.sender.firstName} ${item.sender.lastName}`}</span>
                            <span>
                                {item.type === 'reaction'
                                    ? 'vừa thả cảm xúc cho bài viết của bạn'
                                    : item.content
                                    ? item.content
                                    : 'vừa gửi cho bạn yêu cầu kết bạn'}
                            </span>
                        </p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default NotifyBox;
