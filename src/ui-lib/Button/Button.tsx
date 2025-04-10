import React, {ReactNode} from 'react';

interface ButtonProps {
    label: string;
    isActive: boolean;
    onClick?: () => void;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, isActive, onClick, icon, iconPosition, className }) => {
    return (
        <button
            className={`flex flex-row items-center py-[7px] px-5 rounded border hover:bg-[#1a1a1a] ${
                isActive
                    ? 'border-[#5A5A5A] text-white bg-[#242424]'
                    : 'border-transparent text-white hover:border-neutral-800'
            } ${className}`}
            onClick={onClick}
        >
            {icon && iconPosition === 'start' && <span className='mr-2'>{icon}</span>}
            {label}
            {icon && iconPosition === 'end' && <span className='ml-4'>{icon}</span>}
        </button>
    );
};

export default Button;
