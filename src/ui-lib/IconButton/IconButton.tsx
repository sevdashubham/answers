import React, {ReactNode} from 'react';

interface IconButtonProps {
    icon: ReactNode;
    onClick?: () => void;
    label?: string;
    className?: string;
}

/**
 * Reusable icon button component
 */
const IconButton: React.FC<IconButtonProps> = ({
                                                   icon,
                                                   onClick,
                                                   label,
                                                   className,
                                               }) => {
    return (
        <button
            className={`h-10 w-10 flex items-center justify-center rounded border border-[#5A5A5A] text-white bg-[#242424] hover:bg-[#1a1a1a] ${className}`}
            onClick={onClick}
            title={label}
        >
            {icon}
            {label && <span className="ml-2">{label}</span>}
        </button>
    );
};

export default IconButton;
