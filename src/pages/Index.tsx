import { useState } from 'react';
import { DisplayStage } from '@/components/DisplayStage';
import { ControlPanel, DisplayMode } from '@/components/ControlPanel';
import { ChatMode } from '@/components/modes/ChatMode';
import { TTSMode } from '@/components/modes/TTSMode';
import { ImageMode } from '@/components/modes/ImageMode';
import { VideoMode } from '@/components/modes/VideoMode';
import ShaderBackground from '@/components/ShaderBackground';

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
    <ShaderBackground>
      <div className="h-screen p-6 flex flex-col gap-4 overflow-hidden">
        {/* 顶部Logo区域 */}
        <div className="flex justify-center py-4">
          <img 
            src="/lovable-uploads/aa93550f-c575-4a2f-a1a6-06d4ddeda60c.png" 
            alt="云瀚互动 Intimate Cloud" 
            className="h-12 object-contain"
          />
        </div>

        {/* 主舞台区域 */}
        <DisplayStage
          title={config.title}
          subtitle={config.subtitle}
          className="flex-1 min-h-0"
        >
          {config.component}
        </DisplayStage>

        {/* 底部控制面板 */}
        <ControlPanel
          currentMode={currentMode}
          onModeChange={setCurrentMode}
        />
      </div>
    </ShaderBackground>
  );
};

export default Index;
