"use client";

import React, { useState, useEffect } from 'react';
import { acme, angkor, audiowide, cinzel, honk } from './fonts';

interface Results {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  dailyCaloriesSurplus: number;
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
    const proteinGrams = weightNum * 2;
    const carbGrams = (baseCalories * 0.5) / 4;
    const fatGrams = (baseCalories * 0.25) / 9;

    // Calculate daily calorie surplus needed for desired weight gain
    const totalCaloriesSurplus = desiredGainNum * 7700; // Approximate calories per kg of body weight
    const dailyCaloriesSurplus = totalCaloriesSurplus / (durationNum * 7); // Convert weeks to days

    const bulkingCalories = Math.round(baseCalories + dailyCaloriesSurplus);

    setResults({
      calories: bulkingCalories,
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams + (dailyCaloriesSurplus * 0.5) / 4), // Adjust carbs for surplus
      fat: Math.round(fatGrams + (dailyCaloriesSurplus * 0.5) / 9), // Adjust fat for surplus
      dailyCaloriesSurplus: Math.round(dailyCaloriesSurplus),
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
    <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 transition-colors duration-300">
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
        <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded animate-fade-in">
          <h2 className={`text-xl font-semibold text-center mb-2 text-gray-800 dark:text-white ${angkor.className}`}>Daily Intake:</h2>
          <div className='grid grid-cols-2 gap-2'>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Calories = <span className={`text-blue-400 ${cinzel.className}`}>{results.calories}</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Protein = <span className={`text-blue-400 ${cinzel.className}`}>{results.protein}g</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Carbs = <span className={`text-blue-400 ${cinzel.className}`}>{results.carbs}g</span></p>
            <p className={`text-gray-700 dark:text-gray-300 ${acme.className}`}>Fat = <span className={`text-blue-400 ${cinzel.className}`}>{results.fat}g</span></p>
          </div>
          <p className={`mt-4 text-gray-700 dark:text-gray-300 ${acme.className}`}>Daily Calorie Surplus =  <span className={`text-blue-400 ${cinzel.className}`}>{results.dailyCaloriesSurplus}</span></p>
        </div>
      )}
    </div>
  );
};

export default BulkingCalculator;