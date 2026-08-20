import { computed, Injectable, signal } from '@angular/core';
import { inject } from '@angular/core';
import { AudioEngine } from '../audio-engine/audio-engine';
import { SequencerState } from '../sequencer-state/sequencer-state';

@Injectable({
  providedIn: 'root',
})
export class Scheduler {
  audioEngine = inject(AudioEngine);
  sequencerState = inject(SequencerState);

  currentStep = signal(0);
  nextStepTime = 0;
  bpm = signal(120);
  lookaheadWindow = 0.1;
  intervalId: any;
  isPlaying = signal(false);
  anySoloed = false;

  stepDuration = computed(() => 60 / this.bpm() / 4);

  
 

 

  tick(){
    this.anySoloed = this.sequencerState!.tracks().some(track => track.soloed);

    while(this.nextStepTime < this.audioEngine!.audioContext.currentTime + this.lookaheadWindow){
      this.sequencerState!.tracks().forEach((track) => {

        if(track.steps[this.currentStep()] && (this.anySoloed ? track.soloed : !track.muted)) {
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
