import images from '@/assets/images';
import { NavLink } from 'react-router-dom';
import Search from '@/components/Search/Search';
import { motion } from 'framer-motion';

interface Props {
    style?: React.CSSProperties;
}

const Messagebar = (props: Props) => {
    const { style } = props;
    return (
        <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 400, opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.25 }}
            className=" fixed top-[80px] bottom-3 right-0 w-[260px] min-h-[90vh] bg-white dark:bg-dark-500 p-4 border border-content-100 dark:border-none mobile:hidden rounded-lg overflow-y-scroll transition-all "
            style={{ ...style }}
        >
            <Search className="mb-2 py-1" />
            <h3 className="text-xs font-bold text-content-200 mb-4">Contacts</h3>
            <div className="flex flex-col items-start">
                {[...Array(20)].map((_, index) => (
                    <NavLink to="" className="flex items-center py-2 px-3 my-1" key={index}>
                        <img src={images.avatar} alt="" className="rounded-full w-1/5" />
                        <span className="text-sm font-bold text-dark-500 dark:text-content-200 ml-4"> Lâm Tiến</span>
                        <span className="rounded-full bg-green-500 w-2 h-2 ml-10"></span>
                    </NavLink>
                ))}
            </div>
        </motion.div>
    );
};

export default Messagebar;
