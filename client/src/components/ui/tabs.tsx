import React from 'react';
import { cn } from '../../utils/cn';

interface TabsProps {
  tabs: {
    id: string;
    label: React.ReactNode;
  }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex border-b border-gray-200 dark:border-gray-800', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors relative',
            activeTab === tab.id
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 dark:bg-primary-400" />
          )}
        </button>
      ))}
    </div>
  );
};