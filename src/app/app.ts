import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Grid } from './grid/grid'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Grid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Cquence');
}
