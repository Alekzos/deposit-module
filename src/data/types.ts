export interface IDeposit {
  id: number;
  title: string;
  description: string;
  interest: string;
  minSum: number;
  maxSum: number;
  minTerm: number;
  maxTerm: number;
  termDescription: string;
  currency: string;
  paymentPeriods: string;
  withdrawals: number;
  earlyTermination: number;
}

export interface ISliderWithTextFieldProps {
  Currencies?: any;
  currency?: string;
  days?: boolean;
  step: number;
  min: number;
  max: number;
  value: number;
  caption: string;
  handleInputChange?: any;
  handleSliderChange?: any;
}
