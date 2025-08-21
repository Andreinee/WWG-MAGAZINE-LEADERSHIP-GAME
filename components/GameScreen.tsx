
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import Button from './Button';

interface GameScreenProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  currentScore: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
  question,
  onAnswer,
  onNext,
  questionNumber,
  totalQuestions,
  currentScore
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    
    const isCorrect = option === question.answer;
    setSelectedAnswer(option);
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-wwg-gray-700 text-wwg-gray-200 hover:bg-wwg-gold';
    }
    if (option === question.answer) {
      return 'bg-wwg-green animate-pulse';
    }
    if (option === selectedAnswer && option !== question.answer) {
      return 'bg-red-500';
    }
    return 'bg-wwg-gray-800 text-wwg-gray-700 opacity-70';
  };

  return (
    <div className="w-full p-4 md:p-6 bg-wwg-gray-800 rounded-lg shadow-2xl flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
            <div className="text-sm font-semibold">Question {questionNumber}/{totalQuestions}</div>
            <div className="text-sm font-semibold text-wwg-gold">Score: {currentScore}</div>
        </div>
        <div className="w-full bg-wwg-gray-700 rounded-full h-2.5 mb-6">
            <div className="bg-wwg-green h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
        </div>

        <p className="text-center text-lg font-semibold text-wwg-gray-200 mb-6 min-h-[6rem] flex items-center">{question.question}</p>

        <div className="flex flex-col space-y-3 mb-6">
            {question.options.map((option) => (
            <Button
                key={option}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={getButtonClass(option)}
            >
                {option}
            </Button>
            ))}
        </div>

        {isAnswered && (
            <div className="w-full text-center p-4 bg-wwg-gray-900 rounded-lg animate-fade-in">
                <h3 className="font-bold text-wwg-gold">{selectedAnswer === question.answer ? "Correct!" : "Not Quite"}</h3>
                <p className="text-sm mt-2 text-wwg-gray-200">{question.explanation}</p>
                <p className="text-xs italic mt-2 text-wwg-gray-200">{question.scripture}</p>
                <div className="mt-4 pt-4 border-t border-wwg-gray-700">
                    <p className="text-xs font-bold text-wwg-green uppercase">Leadership Lesson</p>
                    <p className="text-sm mt-1 text-wwg-gray-200">{question.application}</p>
                </div>
                <div className="mt-6 flex justify-center">
                    <Button onClick={onNext} className="bg-wwg-gold w-[200px]">
                        {questionNumber === totalQuestions ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        )}
    </div>
  );
};

export default GameScreen;
