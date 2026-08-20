import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { AudioEngine } from '../audio-engine/audio-engine';

@Injectable({
  providedIn: 'root',
})
export class SequencerState {
  engine = inject(AudioEngine);

  tracks = signal( [
    {
      name: 'kick',
      steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      muted: true,
      soloed: false
    },
    {
      name: 'clap',
      steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      muted: false,
      soloed: false
    },
    {
      name: 'hat',
      steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      muted: false,
      soloed: false
    },
    {
      name: 'snare',
      steps: [false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false],
      muted: false,
      soloed: false
    }
  ]);



  toggleClick(trackIndex: number, stepIndex: number) {
    this.tracks.update(value => {

    return value.map((track, index) => {

      if (index !== trackIndex) {
        return track;
      } else {
          return {
            ...track,
            steps: track.steps.map((step, i) => {

              //play sound on toggle, for testing
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

  toggleMute(trackIndex: number) {
      this.tracks.update (value => {
        return value.map((track,index) => {
          if(index !== trackIndex) {
            return track;
          } else {
            return {
              ...track,
              muted: !track.muted
            }
          }
        });
      });
  }

  toggleSolo(trackIndex: number) {
    this.tracks.update (value => {
      return value.map((track,index) => {
        if(index !== trackIndex) {
          return {...track,
          soloed: false
        }
        } else {
          return {
            ...track,
            soloed: !track.soloed
          }
        }
      });
    });
  }
  
  resetPattern() {
    this.tracks.update(value => {
      return value.map(track => {
        return {
          ...track,
          steps: track.steps.map(() => false),
          muted: false,
          soloed: false
        }
      });
    });
  }

}
