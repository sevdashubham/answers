import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Position = "left" | "right";

interface PositionStyle {
    initial: { x?: string; y?: string };
    animate: { x?: number; y?: number };
    exit: { x?: string; y?: string };
    style: {
        width: string | number;
        height: string | number;
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
}

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    position?: Position;
    width?: string;
    height?: string;
    backgroundColor?: string;
    duration?: number;
}

const Drawer: React.FC<DrawerProps> = ({
                                           isOpen,
                                           onClose,
                                           children,
                                           position = "left",
                                           width = "100%",
                                           height = "100%",
                                           backgroundColor = "#ffffff",
                                           duration = 0.3,
                                       }) => {
    // Set initial and animate properties based on position
    const getPositionStyles = (): PositionStyle => {
        switch (position) {
            case "left":
                return {
                    initial: { x: "-100%" },
                    animate: { x: 0 },
                    exit: { x: "-100%" },
                    style: {
                        width,
                        height,
                        left: 0,
                        top: 0,
                    },
                };
            case "right":
                return {
                    initial: { x: "100%" },
                    animate: { x: 0 },
                    exit: { x: "100%" },
                    style: {
                        width,
                        height,
                        right: 0,
                        top: 0,
                    },
                };
            default:
                return {
                    initial: { x: "-100%" },
                    animate: { x: 0 },
                    exit: { x: "-100%" },
                    style: {
                        width,
                        height,
                        left: 0,
                        top: 0,
                    },
                };
        }
    };

    const positionProps = getPositionStyles();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-40">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="absolute shadow-lg z-50 overflow-auto border-l border-[#525252] max-w-[600px]"
                        style={{
                            ...positionProps.style,
                            backgroundColor,
                        }}
                        initial={positionProps.initial}
                        animate={positionProps.animate}
                        exit={positionProps.exit}
                        transition={{
                            type: "tween",
                            duration,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="p-4">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Drawer;
