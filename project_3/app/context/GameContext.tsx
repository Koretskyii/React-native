import React, { createContext, useContext, useState, useEffect } from 'react';

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type GameStats = {
  taps: number;
  doubleTaps: number;
  longPresses: number;
  pans: number;
  flingRight: number;
  flingLeft: number;
  pinches: number;
};

type GameContextType = {
  score: number;
  addScore: (points: number) => void;
  stats: GameStats;
  recordAction: (action: keyof GameStats) => void;
  tasks: Task[];
  resetGame: () => void;
};

const initialTasks: Task[] = [
  { id: 'taps', title: 'Зробити 10 кліків', isCompleted: false },
  { id: 'doubleTaps', title: 'Зробити подвійний клік 5 разів', isCompleted: false },
  { id: 'longPress', title: 'Утримувати об\'єкт 3 секунди', isCompleted: false },
  { id: 'pan', title: 'Перетягнути об\'єкт', isCompleted: false },
  { id: 'flingRight', title: 'Зробити свайп вправо', isCompleted: false },
  { id: 'flingLeft', title: 'Зробити свайп вліво', isCompleted: false },
  { id: 'pinch', title: 'Змінити розмір об\'єкта', isCompleted: false },
  { id: 'score100', title: 'Отримати 100 очок', isCompleted: false },
  { id: 'master', title: 'Майстер жестів (всі завдання)', isCompleted: false },
];

const initialStats = { taps: 0, doubleTaps: 0, longPresses: 0, pans: 0, flingRight: 0, flingLeft: 0, pinches: 0 };

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(prevTasks => {
      let changed = false;
      const newTasks = prevTasks.map(task => {
        if (task.isCompleted) return task;
        
        let completed = false;
        switch (task.id) {
          case 'taps': completed = stats.taps >= 10; break;
          case 'doubleTaps': completed = stats.doubleTaps >= 5; break;
          case 'longPress': completed = stats.longPresses >= 1; break;
          case 'pan': completed = stats.pans >= 1; break;
          case 'flingRight': completed = stats.flingRight >= 1; break;
          case 'flingLeft': completed = stats.flingLeft >= 1; break;
          case 'pinch': completed = stats.pinches >= 1; break;
          case 'score100': completed = score >= 100; break;
        }
        
        if (completed) changed = true;
        return { ...task, isCompleted: completed };
      });

      // Handle the master task
      const masterTask = newTasks.find(t => t.id === 'master');
      if (masterTask && !masterTask.isCompleted) {
        const allOthersCompleted = newTasks.filter(t => t.id !== 'master').every(t => t.isCompleted);
        if (allOthersCompleted) {
          masterTask.isCompleted = true;
          changed = true;
        }
      }

      return changed ? newTasks : prevTasks;
    });
  }, [score, stats]);

  const addScore = (points: number) => setScore(s => s + points);
  
  const recordAction = (action: keyof GameStats) => {
    setStats(s => ({ ...s, [action]: s[action] + 1 }));
  };

  const resetGame = () => {
    setScore(0);
    setStats(initialStats);
    setTasks(initialTasks);
  };

  return (
    <GameContext.Provider value={{ score, addScore, stats, recordAction, tasks, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
