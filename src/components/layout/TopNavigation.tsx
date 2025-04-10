import React, {useState} from 'react';
import Button from '@/ui-lib/Button/Button';
import SearchBar from '@/ui-lib/SearchBar/SearchBar';
import IconButton from '@/ui-lib/IconButton/IconButton';
import {userAtom, signOut} from "@/atoms/authAtoms";
import {useAtom} from "jotai";

/**
 * Top navigation bar component with tabs and search
 */
const TopNavigation: React.FC = () => {
    // Default to "chargingStations"
    const [activeTab, setActiveTab] = useState('chargingStations');
    const [user] = useAtom(userAtom);
    const [menuOpen, setMenuOpen] = useState(false);
    // Define tab data for easy management
    const tabs = [
        {id: 'chargingStations', label: 'Charging Stations'},
        {id: 'fleetSizing', label: 'Fleet Sizing'},
        {id: 'parking', label: 'Parking'}
    ];

    const handleSignOut = async () => {
        await signOut();
        setMenuOpen(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between items-center pl-3 pr-6 py-5">
            {/* Left Tabs - Centered on mobile */}
            <div className="flex flex-row items-center lg:items-start">
                <div className="fixed top-6 left-4">
                    <IconButton
                        icon={<svg width="20" height="14" viewBox="0 0 20 14" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1 12H19C19.5523 12 20 12.4477 20 13C20 13.5128 19.614 13.9355 19.1166 13.9933L19 14H1C0.44772 14 0 13.5523 0 13C0 12.4872 0.38604 12.0645 0.88338 12.0067L1 12ZM0.99988 6L18.9999 5.9978C19.5522 5.9978 20 6.4454 20 6.9977C20 7.5105 19.6141 7.9333 19.1167 7.9911L19.0001 7.9978L1.00012 8C0.44784 8.0001 0 7.5524 0 7.0001C0 6.4873 0.38594 6.0646 0.88326 6.0067L0.99988 6ZM1 0H19C19.5523 0 20 0.44772 20 1C20 1.51284 19.614 1.93551 19.1166 1.99327L19 2H1C0.44772 2 0 1.55228 0 1C0 0.48716 0.38604 0.0644901 0.88338 0.00673008L1 0Z"
                                fill="currentColor"/>
                        </svg>}
                        className={'border-0 !bg-[#0E0D0D] mr-5 lg:mr-0'}
                    />
                </div>
                <div className="ml-16 grid grid-cols-1 md:flex gap-2 w-full md:px-4">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            isActive={activeTab === tab.id}
                            label={tab.label}
                            onClick={() => setActiveTab(tab.id)}
                            className="text-center justify-center"
                        />
                    ))}
                </div>
            </div>

            {/* Right Search */}
            <div className="ml-16 flex justify-center lg:justify-end">
                <SearchBar/>
                {/* Avatar Dropdown */}
                {user && (
                    <div className="relative pl-4">
                        <div className="flex items-center h-full">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-8 h-8 rounded-full bg-[#C9FF3B] flex items-center justify-center text-[#242424] font-semibold focus:outline-none"
                        >
                            {user.email?.[0]?.toUpperCase() || "U"}
                        </button>
                        </div>

                        {menuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] border border-neutral-700 rounded shadow-lg z-10">
                                <div className="px-4 py-2 text-sm text-white truncate border-b border-neutral-700">
                                    {user.email}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] flex items-center justify-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-log-out text-red-400"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                        <polyline points="16 17 21 12 16 7"/>
                                        <line x1="21" x2="9" y1="12" y2="12"/>
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopNavigation;
