import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Volume2, 
  Image as ImageIcon, 
  Video 
} from 'lucide-react';

export type DisplayMode = 'chat' | 'tts' | 'image' | 'video';

interface ControlPanelProps {
  currentMode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
  children?: ReactNode;
}

interface ModeConfig {
  id: DisplayMode;
  label: string;
  icon: ReactNode;
  description: string;
}

const modes: ModeConfig[] = [
  {
    id: 'chat',
    label: '文本对话',
    icon: <MessageSquare size={32} />,
    description: '智能对话交互'
  },
  {
    id: 'tts',
    label: '语音合成',
    icon: <Volume2 size={32} />,
    description: '文本转语音'
  },
  {
    id: 'image',
    label: '图片生成',
    icon: <ImageIcon size={32} />,
    description: '文本生成图像'
  },
  {
    id: 'video',
    label: '视频生成',
    icon: <Video size={32} />,
    description: '图像生成视频'
  }
];

export const ControlPanel = ({ currentMode, onModeChange, children }: ControlPanelProps) => {
  return (
    <div className="bg-gradient-panel rounded-2xl border border-border/50 shadow-panel backdrop-blur-sm p-8 animate-slide-up">
      {/* 模式选择器 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {modes.map((mode) => (
          <Button
            key={mode.id}
            variant="ghost"
            className={cn(
              "h-auto p-6 flex flex-col items-center gap-3 rounded-xl border-2 transition-all duration-300",
              "hover:scale-105 hover:shadow-glow/20",
              currentMode === mode.id
                ? "border-primary bg-primary/10 text-primary shadow-glow animate-glow-pulse"
                : "border-border/30 hover:border-primary/50 hover:bg-primary/5"
            )}
            onClick={() => onModeChange(mode.id)}
          >
            <div className={cn(
              "transition-colors duration-300",
              currentMode === mode.id ? "text-primary" : "text-muted-foreground"
            )}>
              {mode.icon}
            </div>
            <div className="text-center">
              <div className={cn(
                "text-lg font-semibold mb-1",
                currentMode === mode.id ? "text-primary" : "text-foreground"
              )}>
                {mode.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {mode.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
      
      {/* 动态控制区域 */}
      {children && (
        <div className="border-t border-border/30 pt-6">
          {children}
        </div>
      )}
    </div>
  );
};