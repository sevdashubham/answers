import React, { useState, useEffect, useRef } from "react";

interface VariableItemProps {
  name: string;
  selected?: boolean;
  isActive?: boolean;
  onClick: () => void;
  onToggle: () => void;
  onRemove?: () => void; // Optional remove handler for accordion sections
}

const VariableItem: React.FC<VariableItemProps> = ({
  name,
  selected = false,
  isActive = false,
  onClick,
  onToggle,
  onRemove,
}) => {
  // State for tracking hover time for description popup
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Start/clear timer for hover state
  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHovering(true);
      onClick(); // Show details when hover timer completes
    }, 1500); // 1.5 second delay before showing description
  };
  
  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setIsHovering(false);
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
    };
  }, []);

  // Determine styles based on selected and active states
  const baseClasses =
    "flex items-center px-3 py-2 rounded-full text-sm transition-colors cursor-pointer";

  const getBackgroundClass = () => {
    if (selected && (isHovering)) return "bg-[#CCFF00] bg-opacity-10 text-[#C8E972] border border-[#C9FF3B] relative after:content-[''] after:absolute after:bottom-[-1px] after:left-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:bg-gradient-to-r after:from-[#3BFF72] after:to-[#C9FF3B] after:opacity-[90] after:blur-[4px] after:animate-fade-in transition-all duration-300";    if (selected)
      return "bg-[#CCFF00] bg-opacity-10 border border-[#C9FF3B] text-[#C8E972]";
    if (isActive)
      return "bg-[#595959] bg-opacity-30 text-[#D5D5D5] border border-[#EEEEEE]";
    return "bg-[#595959] bg-opacity-30 text-[#D5D5D5] border border-[#EEEEEE]";
  };

  const getTextClass = () => {
    if (selected) return "text-white";
    return "text-gray-300";
  };

  const classes = `${baseClasses} ${getBackgroundClass()} ${getTextClass()}`;

  // Dynamic color for SVG icons
  const iconColor = selected ? "#C8E972" : "#D5D5D5";

  // Handle click on the entire component to toggle selection
  const handleClick = () => {
    onToggle(); // Toggle selection when clicking anywhere on the component
  };

  return (
    <div 
      className={classes} 
      onClick={handleClick} // Entire component toggles selection
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className="mr-1">{name}</span>
      <div className="flex ml-1">
        {onRemove && (
          <button
            className="focus:outline-none mr-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggle
              onRemove();
            }}
            aria-label="Remove variable"
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        {/* Visual indicators (not buttons) */}
        <div className="flex items-center gap-2">
          <span>
            {/* Sparkles - using dynamic color */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.93007 0L7.37496 1.21154L6.16783 1.76224L7.37496 2.31734L7.93007 3.52448L8.48077 2.31734L9.69231 1.76224L8.48077 1.21154M3.52448 1.32168L2.42308 3.74476L0 4.84615L2.42308 5.94755L3.52448 8.37063L4.62587 5.94755L7.04895 4.84615L4.62587 3.74476M7.93007 6.16783L7.37496 7.37496L6.16783 7.93007L7.37496 8.48077L7.93007 9.69231L8.48077 8.48077L9.69231 7.93007L8.48077 7.37496"
                fill={iconColor}
              />
            </svg>
          </span>
          {/* Checkmark or Plus sign - based on selection state */}
          {selected ? (
            <svg
              width="11"
              height="9"
              viewBox="-1 -1 13 11"
              fill="none"
              stroke="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2501 1.58336L3.25008 8.58336L0.041748 5.37503L0.864248 4.55253L3.25008 6.93253L9.42758 0.760864L10.2501 1.58336Z"
                fill={iconColor}
                stroke={iconColor}
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.08342 5.08329H5.58342V8.58329H4.41675V5.08329H0.916748L0.916748 3.91663H4.41675V0.416626L5.58342 0.416626V3.91663H9.08342V5.08329Z"
                fill={iconColor}
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariableItem;