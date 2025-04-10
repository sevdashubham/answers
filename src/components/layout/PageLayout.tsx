import React, { ReactNode, useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';
import VariablesPanel from '../VariablesPanel/VariablesPanel';

interface PageLayoutProps {
    children: ReactNode;
}

/**
 * Main page layout component with fixed sidebar and top navigation
 * that accommodates variable height for TopNavigation and adds a border
 * to TopNavigation when content is scrolled
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const topNavRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [topNavHeight, setTopNavHeight] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Measure the height of TopNavigation after render and when it changes
    useEffect(() => {
        if (!topNavRef.current) return;

        // Initial measurement
        setTopNavHeight(topNavRef.current.getBoundingClientRect().height);

        // Set up resize observer to handle dynamic height changes
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                setTopNavHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(topNavRef.current);

        // Clean up observer on unmount
        return () => {
            if (topNavRef.current) {
                resizeObserver.unobserve(topNavRef.current);
            }
            resizeObserver.disconnect();
        };
    }, []);

    // Add scroll event listener to detect when content is scrolled
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                setIsScrolled(contentRef.current.scrollTop > 0);
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);

            // Initial check
            handleScroll();
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Fixed top navigation */}
            <div
                className={`fixed top-0 left-0 right-0 z-10 bg-[#0E0D0D] border-t border-l border-r border-[#959595] rounded-tl-[10px] rounded-tr-[10px] ${isScrolled ? 'border-b border-[#525252]' : ''}`}
                ref={topNavRef}
            >
                <TopNavigation />
            </div>

            {/* Fixed sidebar - positioned below topNav */}
            <div
                className="fixed left-0 top-0 z-5 bg-[#0E0D0D] h-full w-16 border-l border-[#959595]"
                style={{ marginTop: `${topNavHeight}px` }}
            >
                <Sidebar />
            </div>

            {/* Main content area with appropriate margins */}
            <div
                className="flex-1 overflow-y-auto"
                style={{
                    marginTop: `${topNavHeight + 1}px`,
                    marginLeft: '4rem' // 16px width sidebar
                }}
                ref={contentRef}
            >
                <div className="p-6 bg-[#161618] border-l border-t border-[#525252] border-r border-r-[#959595] rounded-tl-[5px] min-h-full">
                    {children}
                </div>
            </div>

            {/* Variables panel */}
            <div className="fixed right-0 top-0 z-5 h-full" style={{ marginTop: `${topNavHeight}px` }}>
                <VariablesPanel />
            </div>
        </div>
    );
};

export default PageLayout;
