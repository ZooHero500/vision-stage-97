import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Square, Mic } from 'lucide-react';

export const TTSMode = () => {
  const [text, setText] = useState('欢迎使用文本转语音功能！请输入您想要转换的文本内容。');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [voice, setVoice] = useState('female-1');

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // 这里添加实际的TTS播放逻辑
  };

  const handleStop = () => {
    setIsPlaying(false);
    // 这里添加实际的TTS停止逻辑
  };

  // 模拟波形数据
  const waveformBars = Array.from({ length: 50 }, (_, i) => {
    const height = isPlaying 
      ? Math.random() * 80 + 20 
      : Math.sin(i * 0.3) * 20 + 40;
    return height;
  });

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col gap-8">
      {/* 文本输入区 */}
      <div className="bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-foreground">输入文本</h3>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入需要转换为语音的文本..."
          className="text-lg min-h-32 bg-input/50 border-border/50 resize-none"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          字符数: {text.length} / 1000
        </div>
      </div>

      {/* 波形可视化 */}
      <div className="bg-card/50 rounded-xl border border-border/30 p-8 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-6 text-center text-foreground">语音波形</h3>
        <div className="flex items-end justify-center gap-1 h-32 mb-6">
          {waveformBars.map((height, index) => (
            <div
              key={index}
              className={`w-2 bg-gradient-to-t transition-all duration-150 rounded-full ${
                isPlaying
                  ? 'from-primary to-accent animate-pulse'
                  : 'from-muted to-muted-foreground'
              }`}
              style={{ 
                height: `${height}%`,
                animationDelay: `${index * 50}ms`
              }}
            />
          ))}
        </div>

        {/* 播放控制 */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePlay}
            className="h-16 w-16 rounded-full p-0 border-2"
            disabled={!text.trim()}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleStop}
            className="h-12 w-12 rounded-full p-0"
            disabled={!isPlaying}
          >
            <Square size={20} />
          </Button>
        </div>
      </div>

      {/* 控制参数 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 声线选择 */}
        <div className="bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
            <Mic size={20} />
            声线选择
          </h4>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger className="text-lg bg-input/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female-1">女声-温柔</SelectItem>
              <SelectItem value="female-2">女声-活泼</SelectItem>
              <SelectItem value="male-1">男声-沉稳</SelectItem>
              <SelectItem value="male-2">男声-磁性</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 语速控制 */}
        <div className="bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4 text-foreground">语速</h4>
          <div className="space-y-4">
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <div className="text-center text-muted-foreground">
              {speed[0]}x
            </div>
          </div>
        </div>

        {/* 音调控制 */}
        <div className="bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4 text-foreground">音调</h4>
          <div className="space-y-4">
            <Slider
              value={pitch}
              onValueChange={setPitch}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <div className="text-center text-muted-foreground">
              {pitch[0]}x
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};