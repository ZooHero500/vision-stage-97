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
    <div className="bg-card rounded-lg border border-border p-6">
      {/* 模式选择器 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {modes.map((mode) => (
          <Button
            key={mode.id}
            variant={currentMode === mode.id ? "default" : "outline"}
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onModeChange(mode.id)}
          >
            {mode.icon}
            <div className="text-center">
              <div className="font-medium">
                {mode.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {mode.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
      
      {/* 动态控制区域 */}
      {children && (
        <div className="border-t border-border pt-4">
          {children}
        </div>
      )}
    </div>
  );
};