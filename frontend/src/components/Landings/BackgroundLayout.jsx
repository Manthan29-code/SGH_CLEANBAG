import React from 'react';
import cleanbageLogo from '../../assets/cleanbage-logo.svg';

function BackgroundLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Background Logo */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url(${cleanbageLogo})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          zIndex: 0
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default BackgroundLayout; 