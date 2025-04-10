import React from 'react';
import KeyIndicatorCard from './KeyIndicatorCard';
import {useAtomValue} from 'jotai';
import {keyIndicatorsAtom} from '@/atoms/dashboardAtoms';
import Button from '@/ui-lib/Button/Button';
import {useSetAtom} from "jotai/index";
import {isVariableEditorOpenAtom} from "@/atoms/dashboardAtoms";

/**
 * Component to display all key performance indicators
 */
const KeyIndicators: React.FC = () => {
    const keyIndicators = useAtomValue(keyIndicatorsAtom);
    const setIsVariableEditorOpen = useSetAtom(isVariableEditorOpenAtom);


    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold">Key Performance Indicators</h2>
                <Button
                    label={'Variables'}
                    isActive
                    icon={
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714Z"
                                fill="#FCFCFC"/>
                        </svg>
                    }
                    iconPosition={'end'}
                    className={'px-2 bg-[#1a1a1a]'}
                    onClick={() => setIsVariableEditorOpen(true)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-2 md:gap-5">
                {keyIndicators.map((indicator) => (
                    <KeyIndicatorCard key={indicator.id} indicator={indicator}/>
                ))}
            </div>
        </div>
    );
};

export default KeyIndicators;
