
import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  breadcrumbs,
}) => {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between pb-4 border-b mb-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <ChevronRightIcon className="h-4 w-4 mx-1" />}
                {item.href ? (
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2 sm:mt-0">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default DashboardHeader;
