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
    <div className={cn("h-full flex flex-col", className)}>
      {/* 浮动标题区域 */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-red-600/20 blur-xl rounded-full opacity-60" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2 relative z-10">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-center relative z-10">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* 开放式内容区域 */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="w-full max-w-4xl mx-auto relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-red-600/10 via-transparent to-orange-600/10 blur-2xl rounded-full" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};