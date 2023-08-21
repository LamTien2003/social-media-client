import { twMerge } from 'tailwind-merge';
interface Props {
    children: React.ReactNode;
    classNames?: string;
}
const Container = (props: Props) => {
    const { children, classNames } = props;

    return (
        <div
            className={twMerge(
                `bg-white dark:bg-dark-300 rounded-lg mt-4 w-full p-6 shadow-2xl dark:shadow-none transition-all ${classNames}`,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
