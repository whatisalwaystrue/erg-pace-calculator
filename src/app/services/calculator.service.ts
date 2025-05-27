import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  /**
   * Convert seconds to time string (MM:SS.t format)
   */
  secondsToTimeString(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) {
      return '--:--';
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds * 10) % 10);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${tenths}`;
  }

  /**
   * Convert time string (MM:SS.t) to seconds
   */
  timeStringToSeconds(timeString: string): number {
    if (!timeString || timeString === '--:--') {
      return 0;
    }
    
    const parts = timeString.split(':');
    if (parts.length !== 2) {
      return 0;
    }
    
    const minutes = parseInt(parts[0], 10);
    let seconds = 0;
    
    if (parts[1].includes('.')) {
      const secParts = parts[1].split('.');
      seconds = parseInt(secParts[0], 10) + (parseInt(secParts[1], 10) / 10);
    } else {
      seconds = parseInt(parts[1], 10);
    }
    
    return (minutes * 60) + seconds;
  }

  /**
   * Calculate split (pace per 500m) from time and distance
   */
  calculateSplit(timeSeconds: number, distanceMeters: number): string {
    if (timeSeconds <= 0 || distanceMeters <= 0) {
      return '--:--';
    }
    
    const splitSeconds = (timeSeconds / distanceMeters) * 500;
    return this.secondsToTimeString(splitSeconds);
  }

  /**
   * Calculate time from split (pace) and distance
   */
  calculateTimeFromSplit(splitTimeString: string, distanceMeters: number): string {
    const splitSeconds = this.timeStringToSeconds(splitTimeString);
    if (splitSeconds <= 0 || distanceMeters <= 0) {
      return '--:--';
    }
    
    const totalSeconds = (splitSeconds / 500) * distanceMeters;
    return this.secondsToTimeString(totalSeconds);
  }

  /**
   * Predict a race time for targetDistance based on a known performance
   * (Uses a simple power law model common in running/rowing)
   * @param knownTimeSeconds Time in seconds for the known performance
   * @param knownDistanceMeters Distance in meters for the known performance
   * @param targetDistanceMeters Target distance in meters
   * @returns Predicted time in seconds for the target distance
   */
  predictRaceTime(knownTimeSeconds: number, knownDistanceMeters: number, targetDistanceMeters: number): number {
    if (knownTimeSeconds <= 0 || knownDistanceMeters <= 0 || targetDistanceMeters <= 0) {
      return 0;
    }
    
    // This uses a power model with exponent of 1.06, which is commonly used for rowing predictions
    const predictedSeconds = knownTimeSeconds * Math.pow(targetDistanceMeters / knownDistanceMeters, 1.06);
    return predictedSeconds;
  }
}