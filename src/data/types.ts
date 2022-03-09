export interface IProduct {
  id: number;
  title: string;
  description: string;
  interest: string;
  minSum: number;
  maxSum: number;
  minTerm: number;
  maxTerm: number;
  sumDescription: string;
  termDescription: string;
  currency: string;
  paymentPeriods: string;
  withdrawals: number;
  earlyTermination: number;
  depositRate: any;
  interestCapitalization: number;
  futureValue?: any;
  effectiveInterestRate?: any;
  interestRate?: any;
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

export interface IUser {
  id: number;
  login: string;
  password: string;
}

export interface IUserLogin {
  login: string;
  password: string;
  showPassword: boolean;
}
