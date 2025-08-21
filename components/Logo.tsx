
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = ''}) => {
    return (
        <div className={`text-center ${className}`}>
            <h1 className="font-serif text-3xl font-bold tracking-wider">
                <span className="text-wwg-gray-200">WWG</span>
                <span className="text-wwg-gold">.</span>
            </h1>
            <p className="text-wwg-gray-200 text-xs tracking-[0.3em]">MAGAZINE</p>
        </div>
    );
};

export default Logo;
