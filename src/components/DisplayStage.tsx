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
      "bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none",
      "relative",
      className
    )}>
      <div className="h-full flex flex-col relative z-10">
        {/* 标题区域 */}
        <div className="px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
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