"use client";

import React, { useState, useEffect } from 'react';
import { acme, angkor, audiowide, honk } from './fonts';

interface Results {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const BulkingCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const calculateNutrition = () => {
    const weightNum = parseFloat(weight);
    const durationNum = parseInt(duration);
    
    if (isNaN(weightNum) || isNaN(durationNum)) {
      alert('Please enter valid numbers for weight and duration.');
      return;
    }

    const baseCalories = weightNum * 15;
    const proteinGrams = weightNum * 2;
    const carbGrams = (baseCalories * 0.5) / 4;
    const fatGrams = (baseCalories * 0.25) / 9;

    const bulkingCalories = baseCalories + 500;

    setResults({
      calories: Math.round(bulkingCalories),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fat: Math.round(fatGrams),
    });
  };

  const resetForm = () => {
    setWeight("");
    setDuration("");
    setResults(null);
  };

  if (!mounted) return null;

  return (

      <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 transition-colors duration-300">
        <h1 className={` text-6xl font-bold text-center mb-4 text-gray-800 dark:text-white ${honk.className}`}>Bulking Bites</h1>
        <div className="mb-4">
          <label className={` block text-gray-700 dark:text-gray-300 mb-2 ${audiowide.className} `}>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className={` block text-gray-700 dark:text-gray-300 mb-2 ${audiowide.className} `}>Duration (weeks):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
            <h2 className={` text-xl font-semibold text-center mb-2 text-gray-800 dark:text-white ${angkor.className} `}>Daily Intake:</h2>
            <p className={` text-gray-700 dark:text-gray-300 ${acme.className} `}>Calories: {results.calories}</p>
            <p className={` text-gray-700 dark:text-gray-300 ${acme.className} `}>Protein: {results.protein}g</p>
            <p className={` text-gray-700 dark:text-gray-300 ${acme.className} `}>Carbs: {results.carbs}g</p>
            <p className={` text-gray-700 dark:text-gray-300 ${acme.className} `}>Fat: {results.fat}g</p>
          </div>
        )}
      </div>
  );
};

export default BulkingCalculator;