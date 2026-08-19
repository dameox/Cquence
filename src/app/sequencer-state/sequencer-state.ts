import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { AudioEngine } from '../audio-engine/audio-engine';

@Injectable({
  providedIn: 'root',
})
export class SequencerState {
  engine: AudioEngine | undefined;

  tracks = signal( [
    {
      name: 'kick',
      steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
    },
    {
      name: 'clap',
      steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]
    },
    {
      name: 'hat',
      steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
    },
    {
      name: 'snare',
      steps: [false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false]
    }
  ]);

  constructor() {
    this.engine = inject(AudioEngine);
  }

  toggleClick(trackIndex: number, stepIndex: number) {
    this.tracks.update(value => {

    return value.map((track, index) => {

      if (index !== trackIndex) {
        return track;
      } else {
          return {
            ...track,
            steps: track.steps.map((step, i) => {
              //if(i=== stepIndex && step === false) {
                //this.engine?.playSample(track.name + '1');
              //}
              return i === stepIndex ? !step : step;
            }) 
          }
      }
      
    });
  });
  }


}
