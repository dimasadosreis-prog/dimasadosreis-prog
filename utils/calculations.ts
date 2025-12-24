
import { SimulationParams, SimulationResult, SummaryData } from '../types';

export const calculateCompoundInterest = (params: SimulationParams): SimulationResult[] => {
  const { initialValue, monthlyValue, interestRate, rateType, period, periodType } = params;
  
  const totalMonths = periodType === 'years' ? period * 12 : period;
  
  // Convert interest rate to monthly decimal
  let monthlyRate: number;
  if (rateType === 'monthly') {
    monthlyRate = interestRate / 100;
  } else {
    // Convert annual to monthly: (1 + i_a) = (1 + i_m)^12 => i_m = (1 + i_a)^(1/12) - 1
    monthlyRate = Math.pow(1 + (interestRate / 100), 1 / 12) - 1;
  }

  const results: SimulationResult[] = [];
  let currentBalance = initialValue;
  let currentInvested = initialValue;
  let accumulatedInterest = 0;

  // Month 0 (Initial state)
  results.push({
    month: 0,
    interest: 0,
    totalInterest: 0,
    investedAmount: currentInvested,
    totalBalance: currentBalance
  });

  for (let m = 1; m <= totalMonths; m++) {
    const interestOfMonth = currentBalance * monthlyRate;
    accumulatedInterest += interestOfMonth;
    currentBalance += interestOfMonth + monthlyValue;
    currentInvested += monthlyValue;

    results.push({
      month: m,
      interest: interestOfMonth,
      totalInterest: accumulatedInterest,
      investedAmount: currentInvested,
      totalBalance: currentBalance
    });
  }

  return results;
};

export const getSummary = (results: SimulationResult[]): SummaryData => {
  const last = results[results.length - 1];
  return {
    totalInvested: last.investedAmount,
    totalInterest: last.totalInterest,
    finalBalance: last.totalBalance
  };
};
