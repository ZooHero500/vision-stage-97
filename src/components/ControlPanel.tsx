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
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 relative">
      {/* 玻璃拟态渐变光效 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* 模式选择器 */}
        <div className="grid grid-cols-4 gap-3">
          {modes.map((mode) => (
            <Button
              key={mode.id}
              variant={currentMode === mode.id ? "default" : "ghost"}
              className={cn(
                "h-16 p-3 flex flex-col items-center gap-1.5 transition-all duration-300 backdrop-blur-sm",
                currentMode === mode.id 
                  ? "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20" 
                  : "hover:bg-white/10 text-muted-foreground hover:text-foreground border border-transparent hover:border-white/20"
              )}
              onClick={() => onModeChange(mode.id)}
            >
              <div className="opacity-80">{mode.icon}</div>
              <div className="text-xs font-medium leading-none">
                {mode.label}
              </div>
            </Button>
          ))}
        </div>
        
        {/* 动态控制区域 */}
        {children && (
          <div className="border-t border-white/10 pt-4 mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};