import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
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

  toggleClick(trackIndex: number, stepIndex: number) {
    this.tracks.update(value => {
    return value.map((track, index) => {
      if (index !== trackIndex) {
        return track;
      }


      return {
        ...track,
        steps: track.steps.map((step, i) => i === stepIndex ? !step : step)
      };

      
    });
  });
  }

}
