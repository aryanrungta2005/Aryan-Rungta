import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CATEGORIES, MOCK_GOALS, MOCK_PODS } from '../constants';
import { Goal, Pod, SpendingCategory } from '../types';

interface FinanceContextType {
  dailyBudget: number;
  spentToday: number;
  categories: SpendingCategory[];
  goals: Goal[];
  pods: Pod[];
  addExpense: (amount: number, categoryId: string) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, amount: number) => void; // Top-up
  addPod: (pod: Pod) => void;
  settlePod: (id: string) => void;
  emergencyWithdraw: (amount?: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyBudget] = useState(1250); 
  const [spentToday, setSpentToday] = useState(450); // 1250 - 450 = 800 Remaining
  const [categories, setCategories] = useState<SpendingCategory[]>(MOCK_CATEGORIES);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [pods, setPods] = useState<Pod[]>(MOCK_PODS);

  const addExpense = (amount: number, categoryId: string) => {
    setSpentToday(prev => prev + amount);
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, amount: cat.amount + amount };
      }
      return cat;
    }));
  };

  const addGoal = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const updateGoal = (id: string, amount: number) => {
    // Deduct from wallet/budget (simulated) and add to goal
    setGoals(prev => prev.map(g => {
        if (g.id === id) {
            return { ...g, current: Math.min(g.current + amount, g.target) };
        }
        return g;
    }));
  };

  const addPod = (pod: Pod) => {
    setPods(prev => [...prev, pod]);
  };

  const settlePod = (id: string) => {
      setPods(prev => prev.map(p => {
          if (p.id === id) {
              return { ...p, actionRequired: false, userStatus: 'Settled', userAmount: 0 };
          }
          return p;
      }));
  }

  const emergencyWithdraw = (amount?: number) => {
    if (amount === undefined || amount <= 0) {
         // Full withdraw (Legacy behavior or safeguard)
         setGoals(prev => prev.map(g => ({ ...g, current: 0, status: 'behind' })));
         return;
    }

    setGoals(prev => {
        let remainingToWithdraw = amount;
        // Create a deep copy to modify
        const newGoals = prev.map(g => ({...g}));

        // Strategy: Withdraw from goals that are most filled first? Or just order?
        // Let's do simple iteration for now.
        for (let i = 0; i < newGoals.length; i++) {
            if (remainingToWithdraw <= 0) break;
            
            const goal = newGoals[i];
            if (goal.current > 0) {
                if (goal.current >= remainingToWithdraw) {
                    goal.current -= remainingToWithdraw;
                    remainingToWithdraw = 0;
                    goal.status = 'behind'; // Mark as impacted
                } else {
                    remainingToWithdraw -= goal.current;
                    goal.current = 0;
                    goal.status = 'behind';
                }
            }
        }
        return newGoals;
    });
  };

  return (
    <FinanceContext.Provider value={{
      dailyBudget,
      spentToday,
      categories,
      goals,
      pods,
      addExpense,
      addGoal,
      updateGoal,
      addPod,
      settlePod,
      emergencyWithdraw
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};