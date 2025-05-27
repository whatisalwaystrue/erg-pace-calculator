# Rowing Erg Pace Calculator

A single-page web application built with Angular to help rowers calculate and predict race times on an ergometer.

## Features

- **Split Calculator**: Convert between time and split (pace per 500m)
- **Race Time Prediction**: Predict performance at different distances based on known results
- **Common Distances**: Quick access to standard rowing race distances (500m, 1000m, 2000m, 5000m, 6000m, 10000m)

## How to Use

### Split Calculator

1. Enter a distance in meters
2. Enter either a time (MM:SS.t format) or a split
3. Click "Calculate Split" to convert time to split
4. Click "Calculate Time" to convert split to time

### Race Time Prediction

1. Enter known performance details:
   - Distance in meters
   - Time achieved
2. Enter target distance
3. Select prediction algorithm:
   - Default (1.06 exponent): Standard prediction model
   - Paul's Law (1.03 exponent): Alternative prediction model with more conservative estimates
4. Click "Predict Race Time" to see estimated finish time and split

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How the Calculator Works

The Race Time Prediction feature uses power law models commonly used in rowing and running performance predictions. The application offers two prediction algorithms:

1. **Default Algorithm**: Uses an exponent of 1.06, which has been found to be reasonably accurate for rowing ergometer performances across different distances.
   - Formula: `predicted_time = known_time * (target_distance / known_distance)^1.06`

2. **Paul's Law**: Uses an exponent of 1.03, providing more conservative predictions that some athletes prefer.
   - Formula: `predicted_time = known_time * (target_distance / known_distance)^1.03`

## License

This project is open source, feel free to use and modify as needed.