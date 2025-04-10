import React from "react";

const SearchBar: React.FC = () => {
    return (
        <div className="flex items-center border border-neutral-700 rounded py-2 px-3 w-full lg:max-w-[12rem]">
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
                placeholder="Search"
                className="bg-transparent text-white placeholder-white font-medium text-sm w-full outline-none"
            />
        </div>
    );
};

export default SearchBar;
