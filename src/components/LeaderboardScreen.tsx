
import React from 'react';
import { PlayerScore } from '../types';
import Button from './Button';
import Logo from './Logo';

interface LeaderboardScreenProps {
  scores: PlayerScore[];
  onRestart: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ scores, onRestart }) => {
  return (
    <div className="flex flex-col items-center w-full p-6 bg-wwg-gray-800 rounded-lg shadow-2xl animate-fade-in">
        <Logo className="mb-4" />
        <h2 className="font-serif text-3xl text-wwg-gold mb-6">Top 10 Leaders</h2>
        <div className="w-full flex flex-col space-y-2">
            {scores.length > 0 ? (
                scores.map((score, index) => (
                    <div key={score.id} className="flex items-center justify-between bg-wwg-gray-700 p-3 rounded-lg w-full">
                        <div className="flex items-center">
                            <span className={`font-bold text-lg w-8 ${index < 3 ? 'text-wwg-gold' : 'text-wwg-gray-200'}`}>
                                {index + 1}
                            </span>
                            <div>
                                <p className="font-semibold text-wwg-gray-200">{score.name}</p>
                                <p className="text-xs text-wwg-gray-200/70">{score.business}</p>
                            </div>
                        </div>
                        <span className="font-bold text-lg text-wwg-green">{score.score}</span>
                    </div>
                ))
            ) : (
                <p className="text-center text-wwg-gray-200">No scores yet. Be the first to play!</p>
            )}
        </div>
        <div className="mt-8">
            <Button onClick={onRestart} className="bg-wwg-green">
                Play Now
            </Button>
        </div>
    </div>
  );
};

export default LeaderboardScreen;
