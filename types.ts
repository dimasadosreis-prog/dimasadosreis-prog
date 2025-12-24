
export interface SimulationResult {
  month: number;
  interest: number;
  totalInterest: number;
  investedAmount: number;
  totalBalance: number;
}

export interface SimulationParams {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  rateType: 'monthly' | 'annual';
  period: number;
  periodType: 'months' | 'years';
}

export interface SummaryData {
  totalInvested: number;
  totalInterest: number;
  finalBalance: number;
}
