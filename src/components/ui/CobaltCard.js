import React from 'react';

const CobaltCard = ({ children, className, onClick }) => (
  <div 
    onClick={onClick} 
    className={`cobalt-card clickable relative overflow-hidden group transition-all duration-300 ease-out border border-white/10 hover:border-[#2433FF] ${className}`}
  >
    {children}
  </div>
);

export default CobaltCard;