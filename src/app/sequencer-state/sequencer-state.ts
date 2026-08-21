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
      soloed: false,
      accents: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
    {
      name: 'clap',
      steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      muted: false,
      soloed: false,
      accents: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
    {
      name: 'hat',
      steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      muted: false,
      soloed: false,
      accents: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
    {
      name: 'snare',
      steps: [false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false],
      muted: false,
      soloed: false,
      accents: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    }
  ]);
  trackChance = new Map([
      ['kick', 0.4],
      ['clap', 0.2],
      ['hat', 0.6],
      ['snare', 0.2]
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
  
  toggleAccent(trackIndex: number, stepIndex: number) {
    this.tracks.update(value => {
      return value.map((track,index) => {
        if(index !== trackIndex) {
          return track;
        } else {
          return {
            ...track,
            accents: track.accents.map((accent, i) => {
              return i === stepIndex ? !accent : accent;
            })
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
          soloed: false,
          accents: track.accents.map(() => false)
        }
      });
    });
  }

  randomizePattern() {
    

    this.tracks.update( value => {
      return value.map(track => {
        const chance = this.trackChance.get(track.name);
        if (chance !== undefined) {
          return {
            ...track,
            steps: track.steps.map(() => Math.random() < chance)
          };
        }
        return track;
      });
    });
  }
}
