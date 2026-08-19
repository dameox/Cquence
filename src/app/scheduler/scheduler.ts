import { computed, Injectable, signal } from '@angular/core';
import { inject } from '@angular/core';
import { AudioEngine } from '../audio-engine/audio-engine';
import { SequencerState } from '../sequencer-state/sequencer-state';

@Injectable({
  providedIn: 'root',
})
export class Scheduler {
  audioEngine: AudioEngine | undefined;
  sequencerState: SequencerState | undefined;

  currentStep = signal(0);
  nextStepTime = 0;
  bpm = signal(120);
  lookaheadWindow = 0.1;
  intervalId: any;
  isPlaying = signal(false);

  stepDuration = computed(() => 60 / this.bpm() / 4);

  
  constructor() {
    this.audioEngine = inject(AudioEngine);
    this.sequencerState = inject(SequencerState);
  }

  tick(){
    while(this.nextStepTime < this.audioEngine!.audioContext.currentTime + this.lookaheadWindow){
      this.sequencerState!.tracks().forEach((track, trackIndex) => {

        if(track.steps[this.currentStep()]){
          this.audioEngine!.playSample(track.name + '1', this.nextStepTime);
        }

      });
        this.currentStep.set((this.currentStep() + 1) % 16);
        this.nextStepTime += this.stepDuration();
    }
}

start() {
  this.nextStepTime = this.audioEngine!.audioContext.currentTime;
  this.intervalId = setInterval(() => this.tick(), 25);
  this.isPlaying.set(true);
}

stop() {
  clearInterval(this.intervalId);
  this.isPlaying.set(false);
}

}
