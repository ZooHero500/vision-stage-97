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
      "bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-raycast overflow-hidden",
      className
    )}>
      <div className="h-full flex flex-col">
        {/* 标题区域 */}
        <div className="px-6 py-4 border-b border-border/50 bg-card/30">
          <h1 className="text-xl font-medium text-foreground mb-1">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 flex items-center justify-center p-6 min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};