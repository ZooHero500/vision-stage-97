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
      "flex-1 bg-gradient-stage rounded-2xl border-2 border-stage-border/30",
      "shadow-stage backdrop-blur-sm relative overflow-hidden",
      "animate-fade-in",
      className
    )}>
      {/* 发光边框效果 */}
      <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl" />
      
      {/* 内容区域 */}
      <div className="relative z-10 h-full flex flex-col p-12">
        {/* 标题区域 */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-muted-foreground font-medium">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
      
      {/* 装饰性元素 */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-glow-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-glow-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};