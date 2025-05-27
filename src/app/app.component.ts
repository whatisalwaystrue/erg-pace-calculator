import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorService, PredictionAlgorithm } from './services/calculator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rowing Erg Pace Calculator';
  
  // Input values
  knownDistance: number = 2000;
  knownTime: string = '';
  knownSplit: string = '';
  targetDistance: number = 5000;
  
  // Results
  predictedTime: string = '';
  predictedSplit: string = '';

  // Current year for the footer
  currentYear = new Date().getFullYear();

  // Common race distances
  commonDistances: number[] = [500, 1000, 2000, 5000, 6000, 10000];
  
  // Mode options
  calculatorModes = ['Split Calculation', 'Time Prediction'];
  selectedMode = this.calculatorModes[0];

  // Prediction algorithm options
  predictionAlgorithms = [
    { id: PredictionAlgorithm.Default, name: 'Default (1.06 exponent)' },
    { id: PredictionAlgorithm.PaulsLaw, name: 'Paul\'s Law' }
  ];
  selectedAlgorithm: PredictionAlgorithm = PredictionAlgorithm.Default;
  
  constructor(public calculatorService: CalculatorService) { }
  
  calculateSplit(): void {
    const timeInSeconds = this.calculatorService.timeStringToSeconds(this.knownTime);
    if (timeInSeconds > 0 && this.knownDistance > 0) {
      this.knownSplit = this.calculatorService.calculateSplit(timeInSeconds, this.knownDistance);
    }
  }
  
  calculateTimeFromSplit(): void {
    if (this.knownSplit && this.knownDistance > 0) {
      this.knownTime = this.calculatorService.calculateTimeFromSplit(this.knownSplit, this.knownDistance);
    }
  }
  
  predictRaceTime(): void {
    const knownTimeSeconds = this.calculatorService.timeStringToSeconds(this.knownTime);
    
    if (knownTimeSeconds > 0 && this.knownDistance > 0 && this.targetDistance > 0) {
      const predictedSeconds = this.calculatorService.predictRaceTime(
        knownTimeSeconds, 
        this.knownDistance, 
        this.targetDistance,
        this.selectedAlgorithm
      );
      
      this.predictedTime = this.calculatorService.secondsToTimeString(predictedSeconds);
      this.predictedSplit = this.calculatorService.calculateSplit(predictedSeconds, this.targetDistance);
    }
  }
  
  setCommonDistance(distance: number, isTarget: boolean = false): void {
    if (isTarget) {
      this.targetDistance = distance;
    } else {
      this.knownDistance = distance;
    }
  }
  
  resetCalculator(): void {
    this.knownTime = '';
    this.knownSplit = '';
    this.predictedTime = '';
    this.predictedSplit = '';
  }
}
