import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DisplayStageProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export const DisplayStage = ({ children, title, subtitle, className }: DisplayStageProps) => {
  return (
    <div className={cn(
      "flex-1 bg-card rounded-lg border border-border",
      className
    )}>
      <div className="h-full flex flex-col p-8">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};