import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, Wand2, Download, Trash2 } from 'lucide-react';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  style: string;
}

export const ImageMode = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [style, setStyle] = useState('realistic');
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    // 模拟生成过程
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 模拟生成完成
          const newImage: GeneratedImage = {
            id: Date.now().toString(),
            url: `https://picsum.photos/512/512?random=${Date.now()}`,
            prompt,
            timestamp: new Date(),
            style
          };
          
          setCurrentImage(newImage);
          setImageHistory(prev => [newImage, ...prev.slice(0, 4)]);
          setIsGenerating(false);
          
          // 模拟localStorage缓存
          localStorage.setItem('generated-images', JSON.stringify([newImage, ...imageHistory]));
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleClear = () => {
    setCurrentImage(null);
    setImageHistory([]);
    localStorage.removeItem('generated-images');
  };

  const handleDownload = (image: GeneratedImage) => {
    // 模拟下载功能
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `generated-image-${image.id}.jpg`;
    link.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex gap-8">
      {/* 主要生成区域 */}
      <div className="flex-1 flex flex-col gap-6">
        {/* 输入区域 */}
        <div className="bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
            <Wand2 size={24} />
            文本生成图像
          </h3>
          
          <div className="space-y-4">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述您想要生成的图像，例如：一只可爱的橘猫坐在花园里..."
              className="text-lg h-14 bg-input/50 border-border/50"
              onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
            />
            
            <div className="flex gap-4">
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="w-48 bg-input/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">真实风格</SelectItem>
                  <SelectItem value="anime">动漫风格</SelectItem>
                  <SelectItem value="oil-painting">油画风格</SelectItem>
                  <SelectItem value="watercolor">水彩风格</SelectItem>
                  <SelectItem value="digital-art">数字艺术</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1 text-lg h-12"
              >
                {isGenerating ? '生成中...' : '生成图像'}
              </Button>
            </div>
          </div>

          {/* 生成进度 */}
          {isGenerating && (
            <div className="mt-6 space-y-2 animate-fade-in">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>正在生成图像...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </div>

        {/* 当前生成的图像 */}
        <div className="flex-1 bg-card/50 rounded-xl border border-border/30 p-8 backdrop-blur-sm">
          {currentImage ? (
            <div className="h-full flex flex-col animate-scale-in">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">生成结果</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    风格: {style === 'realistic' ? '真实风格' : 
                           style === 'anime' ? '动漫风格' :
                           style === 'oil-painting' ? '油画风格' :
                           style === 'watercolor' ? '水彩风格' : '数字艺术'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(currentImage)}
                  className="gap-2"
                >
                  <Download size={16} />
                  下载
                </Button>
              </div>
              
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
                <img
                  src={currentImage.url}
                  alt={currentImage.prompt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground font-mono">
                  "{currentImage.prompt}"
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">在左侧输入描述来生成图像</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 历史记录侧边栏 */}
      <div className="w-80 bg-card/50 rounded-xl border border-border/30 p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">生成历史</h3>
          {imageHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {imageHistory.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              暂无生成历史
            </p>
          ) : (
            imageHistory.map((image) => (
              <div
                key={image.id}
                className="group cursor-pointer p-3 rounded-lg border border-border/30 hover:border-primary/50 transition-all duration-200 hover:shadow-glow/10"
                onClick={() => setCurrentImage(image)}
              >
                <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted/30">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
                  "{image.prompt}"
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {image.timestamp.toLocaleTimeString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Download size={12} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};