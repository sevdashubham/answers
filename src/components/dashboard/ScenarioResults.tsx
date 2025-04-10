import React, { useState, useRef, useEffect } from "react";
import { useAtomValue } from "jotai";
import { scenarioResultsAtom } from "@/atoms/dashboardAtoms";

// Mock data for testing
const mockResults = [
  {
    id: '1',
    description: 'The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
  },
  {
    id: '2',
    description: 'The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
  }
];

/**
 * Component to display scenario results with smooth collapse animation
 * Now with responsive design for mobile and tablet devices
 */
const ScenarioResults: React.FC = () => {
  // Use mockResults as fallback if atom is not available in test environment
  const scenarioResultsData = useAtomValue(scenarioResultsAtom);
  const scenarioResults = scenarioResultsData || mockResults;

  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // Measure the content height when it changes or mounts
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [scenarioResults]);

  // Update content height on window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <div className="mb-4 md:mb-6">
        {/* Header with sparkles icon and collapsible button */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex flex-row gap-3 items-center">
          <span className="flex-shrink-0">
            {/* Sparkles icon */}
            <svg
                width="16"
                height="16"
                className="w-4 h-4 md:w-5 md:h-5"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M14.7273 0L13.6964 2.25L11.4545 3.27273L13.6964 4.30364L14.7273 6.54545L15.75 4.30364L18 3.27273L15.75 2.25M6.54545 2.45455L4.5 6.95455L0 9L4.5 11.0455L6.54545 15.5455L8.59091 11.0455L13.0909 9L8.59091 6.95455M14.7273 11.4545L13.6964 13.6964L11.4545 14.7273L13.6964 15.75L14.7273 18L15.75 15.75L18 14.7273L15.75 13.6964"
                  fill="#DAFD7F"
              />
            </svg>
          </span>
            <h3 className="font-semibold pb-1 text-xl md:text-2xl text-[#DCFF7F]">
            Best Scenario Results
          </h3>
          </div>

          {/* Improved collapsible button with smooth transition */}
          <button
              className="bg-transparent rounded-lg md:rounded-2xl py-1 px-2 md:py-2 md:px-3 flex items-center justify-center border border-[#DAFD7F] hover:bg-[#2A2A2A] transition-colors duration-200 ml-2 flex-shrink-0"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse results" : "Expand results"}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 md:h-4 md:w-4 text-[#DAFD7F] transition-transform duration-300 ease-in-out ${
                    isExpanded ? "" : "transform rotate-180"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#DAFD7F"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>

        {/* Smoothly animated content container */}
        <div
            ref={contentRef}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isExpanded ? `${contentHeight}px` : "0px",
              opacity: isExpanded ? 1 : 0,
              marginBottom: isExpanded ? "1rem" : "0"
            }}
        >
          {scenarioResults.map((result, index) => (
              <div
                  key={index}
                  className="bg-black bg-opacity-20 border border-[#DCFF7F]/30 rounded-lg md:rounded-xl py-3 px-4 md:py-4 md:px-6 mb-2 md:mb-3 flex justify-between items-start md:items-center"
              >
                <p className="text-sm md:text-base text-[#DCFF7F] font-medium pr-2 break-words">
                  {result.description}
                </p>
                {/* Three-dot menu button */}
                <button className="text-[#DAFD7F] hover:text-white transition-colors duration-200 flex-shrink-0 p-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ScenarioResults;
