import { Component, inject } from '@angular/core';
import { Grid } from '../grid/grid'; 
import { Scheduler } from '../scheduler/scheduler';
import { SequencerState } from '../sequencer-state/sequencer-state';

@Component({
  selector: 'app-sequencer-body',
  imports: [Grid],
  templateUrl: './sequencer-body.html',
  styleUrl: './sequencer-body.css',
})
export class SequencerBody {
  scheduler = inject(Scheduler);
  sequencerState = inject(SequencerState);
  
  setBpm(event: any) {
    this.scheduler.bpm.set(Number(event.target.value));
}
  setSwing(event: any) {
    this.scheduler.swingAmount.set(Number(event.target.value));
  }
}
