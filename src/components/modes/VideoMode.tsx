import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Upload, Play, Download, Wand2 } from 'lucide-react';

interface GeneratedVideo {
  id: string;
  url: string;
  thumbnail: string;
  prompt?: string;
  sourceImage?: string;
  timestamp: Date;
  duration: number;
  style: string;
}

export const VideoMode = () => {
  const [textPrompt, setTextPrompt] = useState('');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [style, setStyle] = useState('realistic');
  const [duration, setDuration] = useState('3');
  const [currentVideo, setCurrentVideo] = useState<GeneratedVideo | null>(null);
  const [videoHistory, setVideoHistory] = useState<GeneratedVideo[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSourceImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (inputMode === 'text' && !textPrompt.trim()) return;
    if (inputMode === 'image' && !sourceImage) return;

    setIsGenerating(true);
    setProgress(0);

    // 模拟生成过程
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 模拟生成完成
          const newVideo: GeneratedVideo = {
            id: Date.now().toString(),
            url: `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`,
            thumbnail: `https://picsum.photos/320/180?random=${Date.now()}`,
            prompt: inputMode === 'text' ? textPrompt : undefined,
            sourceImage: inputMode === 'image' ? sourceImage : undefined,
            timestamp: new Date(),
            duration: parseInt(duration),
            style
          };
          
          setCurrentVideo(newVideo);
          setVideoHistory(prev => [newVideo, ...prev.slice(0, 3)]);
          setIsGenerating(false);
          
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);
  };

  const handlePlay = (video: GeneratedVideo) => {
    // 这里添加视频播放逻辑
    console.log('Playing video:', video);
  };

  const handleDownload = (video: GeneratedVideo) => {
    // 模拟下载功能
    console.log('Downloading video:', video);
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex gap-8">
      {/* 主要生成区域 */}
      <div className="flex-1 flex flex-col gap-6">
        {/* 输入控制区域 */}
        <div className="bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
            <Wand2 size={24} />
            视频生成
          </h3>
          
          <Tabs value={inputMode} onValueChange={(value) => setInputMode(value as 'text' | 'image')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="text">文本生成视频</TabsTrigger>
              <TabsTrigger value="image">图片生成视频</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4">
              <Input
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="描述您想要生成的视频场景，例如：海浪轻拍沙滩，夕阳西下..."
                className="text-lg h-14 bg-input/50 border-border/50"
              />
            </TabsContent>
            
            <TabsContent value="image" className="space-y-4">
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center bg-input/20">
                {sourceImage ? (
                  <div className="relative">
                    <img
                      src={sourceImage}
                      alt="Source"
                      className="max-w-full max-h-48 mx-auto rounded-lg shadow-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSourceImage(null)}
                      className="absolute top-2 right-2"
                    >
                      移除
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground mb-4">
                      上传图片作为视频起始帧
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      选择图片
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* 生成参数 */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="选择风格" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">真实风格</SelectItem>
                <SelectItem value="cinematic">电影风格</SelectItem>
                <SelectItem value="anime">动漫风格</SelectItem>
                <SelectItem value="abstract">抽象风格</SelectItem>
              </SelectContent>
            </Select>

            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-input/50">
                <SelectValue placeholder="视频长度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3秒</SelectItem>
                <SelectItem value="5">5秒</SelectItem>
                <SelectItem value="10">10秒</SelectItem>
                <SelectItem value="15">15秒</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleGenerate}
              disabled={
                (inputMode === 'text' && !textPrompt.trim()) || 
                (inputMode === 'image' && !sourceImage) || 
                isGenerating
              }
              className="text-lg"
            >
              {isGenerating ? '生成中...' : '生成视频'}
            </Button>
          </div>

          {/* 生成进度 */}
          {isGenerating && (
            <div className="mt-6 space-y-2 animate-fade-in">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>正在生成视频...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground">
                预计需要 {duration} 分钟，请耐心等待...
              </p>
            </div>
          )}
        </div>

        {/* 当前生成的视频 */}
        <div className="flex-1 bg-card/50 rounded-xl border border-border/30 p-8 backdrop-blur-sm">
          {currentVideo ? (
            <div className="h-full flex flex-col animate-scale-in">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">生成结果</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    时长: {currentVideo.duration}秒 | 风格: {
                      style === 'realistic' ? '真实风格' : 
                      style === 'cinematic' ? '电影风格' :
                      style === 'anime' ? '动漫风格' : '抽象风格'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlay(currentVideo)}
                    className="gap-2"
                  >
                    <Play size={16} />
                    播放
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(currentVideo)}
                    className="gap-2"
                  >
                    <Download size={16} />
                    下载
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden relative group">
                <img
                  src={currentVideo.thumbnail}
                  alt="Video thumbnail"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                    <Play size={24} className="text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                {currentVideo.prompt && (
                  <p className="text-sm text-muted-foreground font-mono mb-2">
                    提示词: "{currentVideo.prompt}"
                  </p>
                )}
                {currentVideo.sourceImage && (
                  <p className="text-sm text-muted-foreground">
                    基于上传图片生成
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Video size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">选择输入方式开始生成视频</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 历史记录侧边栏 */}
      <div className="w-80 bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">生成历史</h3>
        
        <div className="space-y-4">
          {videoHistory.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              暂无生成历史
            </p>
          ) : (
            videoHistory.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer p-3 rounded-lg border border-border/30 hover:border-primary/50 transition-all duration-200 hover:shadow-glow/10"
                onClick={() => setCurrentVideo(video)}
              >
                <div className="aspect-video mb-3 overflow-hidden rounded-lg bg-muted/30 relative">
                  <img
                    src={video.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center">
                      <Play size={12} className="text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {video.prompt && (
                    <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
                      "{video.prompt}"
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {video.duration}s | {video.timestamp.toLocaleTimeString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(video);
                      }}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};