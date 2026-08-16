import { Component } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
  tracks = [
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
  ];

}
