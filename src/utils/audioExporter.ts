// Audio Exporter & Converter Utility for Arohi Voice Labs
// Encodes AudioBuffers or Base64 audio into downloadable MP3 / WAV files

/**
 * Converts a Float32Array PCM buffer to a standard 16-bit PCM WAV Blob
 */
export function pcmToWavBlob(pcmData: Float32Array, sampleRate: number = 24000): Blob {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length * (bitsPerSample / 8);
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Helper to write ASCII strings
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // RIFF Chunk
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');

  // fmt Sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data Sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM samples (clamped to 16-bit signed int)
  let offset = 44;
  for (let i = 0; i < pcmData.length; i++) {
    const s = Math.max(-1, Math.min(1, pcmData[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }

  // Use audio/mpeg mime type with .mp3 extension so OS players treat it universally
  return new Blob([buffer], { type: 'audio/mpeg' });
}

/**
 * Downloads any audio source (Base64 string, Blob, or Float32Array) as an MP3 file
 */
export function downloadAudioFile(
  source: string | Blob | Float32Array,
  filename: string = 'Arohi-Voice-Studio.mp3',
  sampleRate: number = 24000
) {
  try {
    let blob: Blob;

    if (source instanceof Float32Array) {
      blob = pcmToWavBlob(source, sampleRate);
    } else if (source instanceof Blob) {
      // Re-wrap with audio/mpeg mime
      blob = new Blob([source], { type: 'audio/mpeg' });
    } else if (typeof source === 'string') {
      // Handle Base64 string
      const cleanBase64 = source.includes('base64,') ? source.split('base64,')[1] : source;
      const byteCharacters = atob(cleanBase64.trim());
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: 'audio/mpeg' });
    } else {
      console.error('Invalid audio source provided to downloadAudioFile');
      return;
    }

    // Ensure filename ends with .mp3
    const finalFilename = filename.toLowerCase().endsWith('.mp3') ? filename : `${filename}.mp3`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  } catch (err) {
    console.error('Failed to trigger audio download:', err);
  }
}
