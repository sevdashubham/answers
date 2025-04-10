import React from "react";

interface SearchProps {
    value?: string;
    handleChange?: (value: string) => void;
    className?: string
}

const SearchBar: React.FC<SearchProps> = ({
                                              value = '',
                                              handleChange,
                                              className
                                                  }) => {
    return (
        <div className={`flex items-center border border-neutral-700 rounded py-2 px-3 w-full bg-[#161618] lg:max-w-[12rem] ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white opacity-100 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange?.(e.target.value)}
                placeholder="Search"
                className="bg-transparent text-white placeholder-white font-medium text-sm w-full outline-none"
            />
        </div>
    );
};

export default SearchBar;
