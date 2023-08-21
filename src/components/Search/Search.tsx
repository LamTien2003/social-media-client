import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    children?: React.ReactNode;
    className?: string;
    placeholder?: string;
}
const Search = (props: Props) => {
    const { className, placeholder = 'Search...' } = props;
    return (
        <div
            className={`flex flex-1 items-center justify-center space-x-2 bg-gray-200 dark:bg-dark-300 rounded-full py-2 px-4 transition-all ${className}`}
        >
            <label htmlFor="search" className="w-1/12 text-dark-500 dark:text-dark-350 text-left cursor-pointer">
                <FontAwesomeIcon icon={faSearch} className="text-base" />
            </label>
            <input
                id="search"
                name="search"
                type="text"
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-gray-400 dark:text-white text-xs autofill:bg-transparent autofill:text-red-950 placeholder:text-gray-400 dark:placeholder:text-dark-350 "
            />
        </div>
    );
};

export default Search;
