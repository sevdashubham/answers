import React from 'react';
import { useAtom } from 'jotai';
import { infoTooltipAtom } from '@/atoms/dashboardAtoms';

interface InfoTooltipProps {
  id: string;
  description: string;
}

/**
 * Information tooltip component that shows on hover
 */
const InfoTooltip: React.FC<InfoTooltipProps> = ({ id, description }) => {
  const [infoTooltip, setInfoTooltip] = useAtom(infoTooltipAtom);
  
  return (
    <div className="relative inline-block">
      <button
        className="text-gray-500 hover:text-white flex items-center justify-center w-3.5 h-3.5"
        onMouseEnter={() => setInfoTooltip(id)}
        onMouseLeave={() => setInfoTooltip(null)}
        aria-label="More information"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.30012 11.2H7.70012V9.8H6.30012V11.2ZM7.00012 0C6.08087 0 5.17062 0.18106 4.32134 0.532843C3.47206 0.884626 2.70038 1.40024 2.05037 2.05025C0.73762 3.36301 0.00012207 5.14348 0.00012207 7C0.00012207 8.85651 0.73762 10.637 2.05037 11.9497C2.70038 12.5998 3.47206 13.1154 4.32134 13.4672C5.17062 13.8189 6.08087 14 7.00012 14C8.85664 14 10.6371 13.2625 11.9499 11.9497C13.2626 10.637 14.0001 8.85651 14.0001 7C14.0001 6.08075 13.8191 5.17049 13.4673 4.32122C13.1155 3.47194 12.5999 2.70026 11.9499 2.05025C11.2999 1.40024 10.5282 0.884626 9.67891 0.532843C8.82963 0.18106 7.91937 0 7.00012 0ZM7.00012 12.6C3.91312 12.6 1.40012 10.087 1.40012 7C1.40012 3.913 3.91312 1.4 7.00012 1.4C10.0871 1.4 12.6001 3.913 12.6001 7C12.6001 10.087 10.0871 12.6 7.00012 12.6ZM7.00012 2.8C6.25752 2.8 5.54532 3.095 5.02022 3.6201C4.49512 4.1452 4.20012 4.85739 4.20012 5.6H5.60012C5.60012 5.2287 5.74762 4.8726 6.01017 4.61005C6.27272 4.3475 6.62882 4.2 7.00012 4.2C7.37143 4.2 7.72752 4.3475 7.99007 4.61005C8.25262 4.8726 8.40012 5.2287 8.40012 5.6C8.40012 7 6.30012 6.825 6.30012 9.1H7.70012C7.70012 7.525 9.80012 7.35 9.80012 5.6C9.80012 4.85739 9.50512 4.1452 8.98002 3.6201C8.45492 3.095 7.74273 2.8 7.00012 2.8Z" fill="#888888"/>
        </svg>
      </button>
      {infoTooltip === id && (
        <div className="absolute right-0 top-6 bg-gray-900 p-3 rounded-md shadow-lg z-10 w-56 text-sm text-white">
          {description}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;