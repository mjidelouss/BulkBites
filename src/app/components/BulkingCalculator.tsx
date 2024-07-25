"use client";

import React, { useState, useEffect } from 'react';
import { acme, angkor, audiowide, cinzel, honk } from './fonts';

interface Results {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  dailyCaloriesSurplus: number;
  sleepHours: number;
  waterIntake: number;
  mealFrequency: number;
  workoutFrequency: number;
}

const BulkingCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [desiredGain, setDesiredGain] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const calculateNutrition = () => {
    const weightNum = parseFloat(weight);
    const durationNum = parseInt(duration);
    const desiredGainNum = parseFloat(desiredGain);
    
    if (isNaN(weightNum) || isNaN(durationNum) || isNaN(desiredGainNum)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    const baseCalories = weightNum * 15;
    const baseProteinGrams = weightNum * 2;
    const baseCarbGrams = (baseCalories * 0.5) / 4;
    const baseFatGrams = (baseCalories * 0.25) / 9;

    const totalCaloriesSurplus = desiredGainNum * 7700;
    const dailyCaloriesSurplus = totalCaloriesSurplus / (durationNum * 7);

    // Adjust protein intake based on calorie surplus
    const additionalProtein = (dailyCaloriesSurplus * 0.3) / 4; // 30% of surplus calories from protein
    const bulkingProtein = Math.round(baseProteinGrams + additionalProtein);

    const bulkingCalories = Math.round(baseCalories + dailyCaloriesSurplus);
    const bulkingCarbs = Math.round(baseCarbGrams + (dailyCaloriesSurplus * 0.5) / 4);
    const bulkingFat = Math.round(baseFatGrams + (dailyCaloriesSurplus * 0.2) / 9);

    setResults({
      calories: bulkingCalories,
      protein: bulkingProtein,
      carbs: bulkingCarbs,
      fat: bulkingFat,
      dailyCaloriesSurplus: Math.round(dailyCaloriesSurplus),
      sleepHours: 8,
      waterIntake: Math.round(weightNum * 0.033 * 10) / 10, // 33ml per kg of body weight, rounded to 1 decimal
      mealFrequency: 5,
      workoutFrequency: 4
    });
  };

  const resetForm = () => {
    setWeight("");
    setDuration("");
    setDesiredGain("");
    setResults(null);
  };

  if (!mounted) return null;

  return (
    <div className="w-2/5 bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 transition-colors duration-300">
      <h1 className={`text-6xl font-bold text-center mb-4 text-gray-800 dark:text-white ${honk.className}`}>Bulking Bites</h1>
      <div className="mb-4">
        <label className={`block text-gray-700 dark:text-gray-300 mb-2 ${audiowide.className}`}>Current Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label className={`block text-gray-700 dark:text-gray-300 mb-2 ${audiowide.className}`}>Duration (weeks):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label className={`block text-gray-700 dark:text-gray-300 mb-2 ${audiowide.className}`}>Desired Weight Gain (kg):</label>
        <input
          type="number"
          value={desiredGain}
          onChange={(e) => setDesiredGain(e.target.value)}
          className="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white"
        />
      </div>
      <button
        onClick={calculateNutrition}
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-600 rounded transition-colors duration-300"
      >
        Calculate
      </button>
      <button
        onClick={resetForm}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-600 rounded transition-colors duration-300"
      >
        Reset
      </button>
      {results && (
        <div className="mt-4 p-5 bg-gray-200 dark:bg-gray-700 rounded animate-fade-in">
          <h2 className={`text-xl font-semibold text-center mb-2 text-gray-800 dark:text-white ${angkor.className}`}>Daily Plan</h2>
          <div className='grid grid-cols-2 gap-2'>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Calories = <span className={`text-blue-400 ${cinzel.className}`}>{results.calories}</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Protein = <span className={`text-blue-400 ${cinzel.className}`}>{results.protein}g</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Carbs = <span className={`text-blue-400 ${cinzel.className}`}>{results.carbs}g</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Fat = <span className={`text-blue-400 ${cinzel.className}`}>{results.fat}g</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Calorie Surplus = <span className={`text-blue-400 ${cinzel.className}`}>{results.dailyCaloriesSurplus}</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Sleep = <span className={`text-blue-400 ${cinzel.className}`}>{results.sleepHours} hours</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Water Intake = <span className={`text-blue-400 ${cinzel.className}`}>{results.waterIntake} liters</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Meal Frequency = <span className={`text-blue-400 ${cinzel.className}`}>{results.mealFrequency} meals/day</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Workouts = <span className={`text-blue-400 ${cinzel.className}`}>{results.workoutFrequency} times/week</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkingCalculator;