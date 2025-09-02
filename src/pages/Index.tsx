import { useState } from 'react';
import { DisplayStage } from '@/components/DisplayStage';
import { ControlPanel, DisplayMode } from '@/components/ControlPanel';
import { ChatMode } from '@/components/modes/ChatMode';
import { TTSMode } from '@/components/modes/TTSMode';
import { ImageMode } from '@/components/modes/ImageMode';
import { VideoMode } from '@/components/modes/VideoMode';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<DisplayMode>('chat');

  const getModeConfig = () => {
    switch (currentMode) {
      case 'chat':
        return {
          title: 'AI智能对话',
          subtitle: '与AI进行自然流畅的对话交互',
          component: <ChatMode />
        };
      case 'tts':
        return {
          title: '文本转语音',
          subtitle: '将文本内容转换为自然的语音播放',
          component: <TTSMode />
        };
      case 'image':
        return {
          title: 'AI图像生成',
          subtitle: '通过文本描述生成高质量图像',
          component: <ImageMode />
        };
      case 'video':
        return {
          title: 'AI视频生成',
          subtitle: '从文本或图片生成动态视频内容',
          component: <VideoMode />
        };
    }
  };

  const config = getModeConfig();

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col gap-8">
      {/* 主舞台区域 */}
      <DisplayStage
        title={config.title}
        subtitle={config.subtitle}
        className="flex-1"
      >
        {config.component}
      </DisplayStage>

      {/* 底部控制面板 */}
      <ControlPanel
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />
    </div>
  );
};

export default Index;
