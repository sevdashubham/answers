import React from 'react';
import { KeyIndicator } from '@/types';
import InfoTooltip from '@/ui-lib/InfoTooltip/InfoTooltip';

interface KeyIndicatorCardProps {
  indicator: KeyIndicator;
}

/**
 * Card component for displaying a single key performance indicator
 */
const KeyIndicatorCard: React.FC<KeyIndicatorCardProps> = ({ indicator }) => {
  return (
    <div className="box-border w-full aspect-square bg-[#222324] border border-[#525252] rounded-[5px] p-[30px] flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white text-[18px] tracking-tight leading-[22px]">{indicator.name}</h3>
        <div>
          <InfoTooltip id={indicator.id} description={indicator.description} />
        </div>
      </div>

      <p className="text-xs font-light text-[#BBBBBB] leading-[150%] mb-auto">
        {indicator.description}
      </p>

      <div className="flex justify-end items-center w-full">
        <div className="font-bold text-[32px] text-white tracking-tight leading-[88%]">
          {indicator.value}
        </div>
      </div>
    </div>
  );
};

export default KeyIndicatorCard;
