
import React from 'react';
import { Lock } from 'lucide-react';

const PrivateProjectBadge = () => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
      <Lock size={12} className="mr-1" />
      Private
    </div>
  );
};

export default PrivateProjectBadge;
