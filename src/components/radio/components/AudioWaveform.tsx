// Arohi Radio - Audio-Reactive Waveform Visualizer
// HTML5 Canvas rendering smooth, organic audio frequency waves reacting to real-time audio playback

import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../services/AudioEngineService';

interface AudioWaveformProps {
  isPlaying: boolean;
  accentColor?: string; // hex or CSS color
  barCount?: number;
  height?: number;
  mode?: 'bars' | 'wave' | 'compact';
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isPlaying,
  accentColor = '#06B6D4',
  barCount = 32,
  height = 40,
  mode = 'bars',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = 64;
    const dataArray = new Uint8Array(bufferLength);

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, width, h);

      if (isPlaying) {
        audioEngine.getByteFrequencyData(dataArray);
      } else {
        // Idle gentle baseline
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = 10;
        }
      }

      phase += 0.04;

      if (mode === 'compact') {
        // Simple 4-5 dynamic jumping bars (Spotify / Apple Music style)
        const bars = 5;
        const barWidth = 3;
        const gap = 3;
        const totalW = bars * barWidth + (bars - 1) * gap;
        const startX = (width - totalW) / 2;

        ctx.fillStyle = accentColor;
        for (let i = 0; i < bars; i++) {
          const val = isPlaying ? (dataArray[i * 4] / 255) : 0.15;
          const barH = Math.max(3, val * (h - 4));
          const y = (h - barH) / 2;
          const x = startX + i * (barWidth + gap);
          
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barH, 2);
          ctx.fill();
        }
      } else if (mode === 'wave') {
        // Continuous fluid sine wave
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = accentColor;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = isPlaying ? 10 : 2;

        const sliceWidth = width / (barCount - 1);
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          const raw = dataArray[i % bufferLength] / 255;
          const amp = isPlaying ? (raw * 0.7 + 0.1) : 0.05;
          const y = (h / 2) + Math.sin(phase + i * 0.3) * (h / 2.5) * amp;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.stroke();
        ctx.shadowBlur = 0; // Reset
      } else {
        // Editorial vertical bars visualizer
        const barWidth = Math.max(2, (width / barCount) - 2);
        const gap = 2;

        for (let i = 0; i < barCount; i++) {
          const raw = dataArray[Math.floor((i / barCount) * bufferLength)] / 255;
          const animatedVal = isPlaying 
            ? Math.max(0.1, raw + Math.sin(phase + i * 0.2) * 0.1)
            : 0.08;

          const barHeight = Math.max(3, animatedVal * (h - 6));
          const x = i * (barWidth + gap);
          const y = (h - barHeight) / 2;

          // Gradient bar
          const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
          gradient.addColorStop(0, accentColor);
          gradient.addColorStop(1, `${accentColor}44`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 1.5);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, accentColor, barCount, mode, height]);

  return (
    <canvas
      ref={canvasRef}
      width={mode === 'compact' ? 36 : barCount * 5}
      height={height}
      className={`block select-none pointer-events-none ${className}`}
    />
  );
};
