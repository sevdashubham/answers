import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface VariableAccordionProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

const VariableAccordion: React.FC<VariableAccordionProps> = ({
  title,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="mb-4 bg-[#222324] rounded-[4px] border border-[#525252] overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-4 py-3 text-left text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-[#C8E972]">{title}</span>
        <span className="rounded-2xl py-2 px-3 border border-[#C8E972] bg-[#18181A] bg-opacity-50">
          <svg
            className={`h-5 w-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#C8E972"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height === undefined ? 'auto' : `${height}px` }}
      >
        <div ref={contentRef} className="px-4 pb-4 pt-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VariableAccordion;
