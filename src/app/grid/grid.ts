import { Component, inject } from '@angular/core';
import { AudioEngine } from '../audio-engine/audio-engine';
import { SequencerState } from '../sequencer-state/sequencer-state';
import { Scheduler } from '../scheduler/scheduler';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
    sequencerState: SequencerState | undefined;
    scheduler: Scheduler | undefined;

  constructor() {
    this.sequencerState = inject(SequencerState);
    this.scheduler = inject(Scheduler);
  }
    
  

}
