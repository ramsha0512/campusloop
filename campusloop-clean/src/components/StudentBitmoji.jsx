import React, { useState } from 'react';
import { getStudentBitmoji, getFallbackBitmojiSvg } from '../utils/avatars';

export const StudentBitmoji = ({ name = 'Student', size = 36, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const avatarUrl = getStudentBitmoji(name);
  const fallbackUrl = getFallbackBitmojiSvg(name);

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-[#EEF0FF] dark:bg-[#222137] border border-[#E8E7EE] dark:border-[#2C2B42] shadow-sm select-none ${className}`}
      style={{ width: size, height: size }}
      title={name}
    >
      <img
        src={hasError ? fallbackUrl : avatarUrl}
        alt={`${name}'s Bitmoji Avatar`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
