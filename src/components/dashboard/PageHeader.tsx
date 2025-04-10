import React from "react";
import { useSetAtom } from "jotai";
import { isVariableEditorOpenAtom } from "@/atoms/dashboardAtoms";
import Button from "@/ui-lib/Button/Button";
import IconButton from "@/ui-lib/IconButton/IconButton";

interface PageHeaderProps {
  title: string;
}

/**
 * Page header component with title and action buttons
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    const setIsVariableEditorOpen = useSetAtom(isVariableEditorOpenAtom);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center">
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                >
                    <path d="M13.75 18.75H7.5L16.25 1.25V11.25H22.5L13.75 28.75V18.75Z" fill="white" />
                </svg>
                <h1 className="ml-1 md:text-3xl text-2xl font-bold">{title}</h1>
            </div>

            <div className="flex flex-wrap gap-2 sm:space-x-3 sm:gap-0 w-full sm:w-auto">
                <IconButton icon={<svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 5H11.5V10L15.78 12.54L16.5 11.33L13 9.25V5ZM12.5 0C10.1131 0 7.82387 0.948211 6.13604 2.63604C4.44821 4.32387 3.5 6.61305 3.5 9H0.5L4.46 13.03L8.5 9H5.5C5.5 7.14348 6.2375 5.36301 7.55025 4.05025C8.86301 2.7375 10.6435 2 12.5 2C14.3565 2 16.137 2.7375 17.4497 4.05025C18.7625 5.36301 19.5 7.14348 19.5 9C19.5 10.8565 18.7625 12.637 17.4497 13.9497C16.137 15.2625 14.3565 16 12.5 16C10.57 16 8.82 15.21 7.56 13.94L6.14 15.36C7.77 17 10 18 12.5 18C14.8869 18 17.1761 17.0518 18.864 15.364C20.5518 13.6761 21.5 11.3869 21.5 9C21.5 6.61305 20.5518 4.32387 18.864 2.63604C17.1761 0.948211 14.8869 0 12.5 0Z"
                        fill="#B9B9B9"
                    />
                </svg>} aria-label="History"/>

                <Button label={'Edit Variables'} isActive onClick={() => setIsVariableEditorOpen(true)}/>

                <IconButton icon={<svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.25 10C8.25 10.4142 8.58579 10.75 9 10.75C9.41421 10.75 9.75 10.4142 9.75 10L8.25 10ZM9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L3.6967 5.24264C3.40381 5.53553 3.40381 6.01041 3.6967 6.3033C3.98959 6.59619 4.46447 6.59619 4.75736 6.3033L9 2.06066L13.2426 6.3033C13.5355 6.59619 14.0104 6.59619 14.3033 6.3033C14.5962 6.01041 14.5962 5.53553 14.3033 5.24264L9.53033 0.46967ZM9.75 10L9.75 1L8.25 1L8.25 10L9.75 10Z"
                        fill="#B9B9B9"
                    />
                    <path
                        d="M1 10V15C1 16.6569 2.34315 18 4 18H14C15.6569 18 17 16.6569 17 15V10"
                        stroke="#B9B9B9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>}/>
            </div>
        </div>
    );
};

export default PageHeader;
