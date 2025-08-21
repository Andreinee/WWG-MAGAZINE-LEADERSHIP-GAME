
import React, { useState } from 'react';
import Button from './Button';
import Logo from './Logo';
import { PlayerScore } from '../types';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onViewLeaderboard: () => void;
  onAddToLeaderboard: (player: Omit<PlayerScore, 'id'>) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart, onAddToLeaderboard, onViewLeaderboard }) => {
    const [name, setName] = useState('');
    const [business, setBusiness] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && business.trim()) {
            onAddToLeaderboard({ name, business, score });
            setSubmitted(true);
        }
    };

    return (
        <div className="flex flex-col items-center text-center p-6 bg-wwg-gray-800 rounded-lg shadow-2xl animate-fade-in">
            <Logo className="mb-4" />
            <h2 className="font-serif text-3xl text-wwg-gold mb-2">Game Over!</h2>
            <p className="text-xl text-wwg-gray-200 mb-2">Your Final Score:</p>
            <p className="text-5xl font-bold text-wwg-green mb-6">{score} <span className="text-2xl text-wwg-gray-200">/ {totalQuestions}</span></p>

            {!submitted ? (
                 <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-3 mb-6">
                    <h3 className="font-semibold text-lg text-wwg-gray-200">Add to Leaderboard!</h3>
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[280px] h-[40px] rounded-lg bg-wwg-gray-700 text-wwg-gray-200 px-4 placeholder-wwg-gray-200/50 focus:outline-none focus:ring-2 focus:ring-wwg-gold"
                        required
                    />
                     <input 
                        type="text" 
                        placeholder="Your Business/Organization" 
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        className="w-[280px] h-[40px] rounded-lg bg-wwg-gray-700 text-wwg-gray-200 px-4 placeholder-wwg-gray-200/50 focus:outline-none focus:ring-2 focus:ring-wwg-gold"
                        required
                    />
                    <Button onClick={() => {}} className="bg-wwg-gold" disabled={!name.trim() || !business.trim()}>
                        <button type="submit" className="w-full h-full">Submit Score</button>
                    </Button>
                </form>
            ) : (
                <p className="text-wwg-green font-semibold mb-6">Your score has been submitted!</p>
            )}

            <div className="flex flex-col items-center space-y-3 mb-8">
                <Button onClick={onRestart} className="bg-wwg-green">Play Again</Button>
                <Button onClick={onViewLeaderboard} className="bg-wwg-gray-700 text-wwg-gray-200">View Leaderboard</Button>
            </div>

             <div className="w-full text-center p-4 bg-wwg-gray-900 rounded-lg">
                <h3 className="font-bold text-lg text-wwg-gold mb-2">Lead with Impact. Be Seen.</h3>
                <p className="text-sm text-wwg-gray-200">
                   Just as biblical leaders needed wisdom and strategy, modern business owners need visibility and a powerful narrative. Your story of faith and entrepreneurship deserves to be heard. 
                </p>
                <p className="text-sm mt-2 font-semibold text-wwg-gray-200">
                   <span className="text-wwg-green">Walk with God (WWG) Magazine</span> is the premier PR partner for Kingdom-driven leaders. We get your story in front of a global audience that shares your values.
                </p>
                <p className="text-sm mt-2 text-wwg-gray-200">
                  Ready to amplify your influence? Let's talk.
                </p>
            </div>
        </div>
    );
};

export default ResultsScreen;
