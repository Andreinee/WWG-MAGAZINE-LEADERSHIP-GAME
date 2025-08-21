
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Question, PlayerScore } from './types';
import { ALL_QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import { shuffleArray } from './utils/shuffle';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);

  useEffect(() => {
    try {
      const storedLeaderboard = localStorage.getItem('wwgLeaderboard');
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error("Failed to load leaderboard from localStorage", error);
      localStorage.removeItem('wwgLeaderboard');
    }
  }, []);

  const startGame = useCallback(() => {
    const shuffledQuestions = shuffleArray([...ALL_QUESTIONS]);
    setQuestions(shuffledQuestions.slice(0, 15));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.Results);
    }
  }, [currentQuestionIndex, questions.length]);
  
  const viewLeaderboard = useCallback(() => {
    setGameState(GameState.Leaderboard);
  }, []);

  const restartGame = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const addToLeaderboard = useCallback((player: Omit<PlayerScore, 'id'>) => {
    const newScore: PlayerScore = { ...player, id: Date.now() };
    const updatedLeaderboard = [...leaderboard, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updatedLeaderboard);
    try {
      localStorage.setItem('wwgLeaderboard', JSON.stringify(updatedLeaderboard));
    } catch (error) {
      console.error("Failed to save leaderboard to localStorage", error);
    }
    viewLeaderboard();
  }, [leaderboard, viewLeaderboard]);


  const renderScreen = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={startGame} />;
      case GameState.Playing:
        return (
          <GameScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            currentScore={score}
          />
        );
      case GameState.Results:
        return (
            <ResultsScreen 
                score={score} 
                totalQuestions={questions.length} 
                onRestart={startGame}
                onAddToLeaderboard={addToLeaderboard}
                onViewLeaderboard={viewLeaderboard}
            />
        );
      case GameState.Leaderboard:
        return <LeaderboardScreen scores={leaderboard} onRestart={restartGame} />;
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="bg-wwg-gray-900 min-h-screen text-wwg-gray-200 font-sans flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg mx-auto">
            {renderScreen()}
        </div>
    </div>
  );
};

export default App;
