import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const GlassCard = ({ children, className, variant = 'light' }) => {
    return (
        <div className={twMerge(
            'rounded-3xl border transition-all duration-300',
            variant === 'light'
                ? 'bg-white/10 border-white/10 hover:bg-white/15'
                : 'bg-black/30 border-white/5 hover:bg-black/40',
            'backdrop-blur-md shadow-xl',
            className
        )}>
            {children}
        </div>
    );
};

export default GlassCard;
