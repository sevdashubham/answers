import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.03511 6.38632C2.03511 4.15722 3.84216 2.35018 6.07126 2.35018C8.30034 2.35018 10.1074 4.15722 10.1074 6.38632C10.1074 8.6154 8.30034 10.4225 6.07126 10.4225C3.84216 10.4225 2.03511 8.6154 2.03511 6.38632ZM6.07126 0.735718C2.95052 0.735718 0.420654 3.26558 0.420654 6.38632C0.420654 9.50707 2.95052 12.0369 6.07126 12.0369C7.34046 12.0369 8.51199 11.6185 9.45532 10.912L13.5728 15.0294C13.888 15.3446 14.3991 15.3446 14.7143 15.0294C15.0296 14.7142 15.0296 14.203 14.7143 13.8878L10.5969 9.77038C11.3034 8.82706 11.7219 7.65553 11.7219 6.38632C11.7219 3.26558 9.192 0.735718 6.07126 0.735718Z"
            fill="#EDEDED"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-0 ring-0 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search variables"
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
