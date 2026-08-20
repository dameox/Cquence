import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SequencerBody } from './sequencer-body/sequencer-body'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SequencerBody],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Cquence');
}
