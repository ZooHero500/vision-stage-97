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
    <div className="relative">
      {/* 背景光晕 */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-red-600/20 blur-xl rounded-full opacity-40" />
      
      {/* 悬浮式模式选择器 */}
      <div className="relative z-10 flex justify-center">
        <div className="flex gap-6 bg-black/30 backdrop-blur-xl rounded-full p-2 border border-red-500/20">
          {modes.map((mode) => (
            <Button
              key={mode.id}
              variant="ghost"
              className={cn(
                "h-16 w-16 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative overflow-hidden",
                currentMode === mode.id 
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/50" 
                  : "hover:bg-red-500/20 text-white/70 hover:text-white border-2 border-transparent hover:border-red-500/30"
              )}
              onClick={() => onModeChange(mode.id)}
            >
              {currentMode === mode.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 blur-sm rounded-full animate-pulse" />
              )}
              <div className="relative z-10 scale-75 group-hover:scale-90 transition-transform">
                {mode.icon}
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded backdrop-blur">
                {mode.label}
              </div>
            </Button>
          ))}
        </div>
      </div>
      
      {/* 动态控制区域 */}
      {children && (
        <div className="mt-6 flex justify-center">
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};