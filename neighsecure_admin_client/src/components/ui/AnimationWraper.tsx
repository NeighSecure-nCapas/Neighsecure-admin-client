import React from "react";
import {motion} from "framer-motion";

interface AnimationWrapProps {
    children?: React.ReactNode;
    delay?: number;
    className?: string;
    position: number;
}

export default function AnimationWrap(
    {children,
        delay,
        className,
        position
    }: AnimationWrapProps) {
    return (
        <motion.div
            initial={{y: position, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 1, ease: "easeInOut", type: "spring", delay: delay}}
            viewport={{once: true}}
            className={className}
        >
            {children}
        </motion.div>
    );
}
