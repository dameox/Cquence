import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AudioEngine {
  audioContext = new AudioContext();
  sampleBuffers = new Map<string, AudioBuffer>();

  constructor() {
    this.loadSample('kick1');
    this.loadSample('clap1');
    this.loadSample('hat1');
    this.loadSample('snare1');
  }

  loadSample = async (name: string) => {
    try {
      const res = await fetch(`/${name}.wav`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sampleBuffers.set(name, audioBuffer);
    } catch (error) {
      console.error(`Error fetching ${name} sample:`, error);
    }
  };

  playSample(name: string, time?: number, gain: number = 0.8) {
    const buffer = this.sampleBuffers.get(name);
    if(buffer) {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = gain;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      source.start(time ?? this.audioContext.currentTime);
    } else {
      console.log(`Sample ${name} not found.`);
    }
  }

}
