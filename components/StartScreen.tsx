
import React from 'react';
import Button from './Button';
import Logo from './Logo';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-wwg-gray-800 rounded-lg shadow-2xl animate-fade-in">
        <Logo className="mb-6"/>
        <h2 className="font-serif text-4xl text-wwg-gold mb-2">Leaders, Lessons, & Legacies</h2>
        <p className="text-wwg-gray-200 mb-6 max-w-md">
            Test your knowledge of biblical leaders to uncover timeless lessons for your own leadership journey.
        </p>
        <div className="bg-wwg-gray-700 p-4 rounded-lg mb-8 max-w-md">
            <h3 className="font-bold text-wwg-green mb-2">Why This Matters for Leaders</h3>
            <p className="text-sm text-wwg-gray-200">
                Every decision, from Moses delegating tasks to David's repentance, holds a blueprint for success and a warning against failure. As a faith-driven entrepreneur, these lessons are vital for building a legacy of impact and integrity.
            </p>
        </div>
        <Button onClick={onStart} className="bg-wwg-green">
            Start Game
        </Button>
    </div>
  );
};

export default StartScreen;
