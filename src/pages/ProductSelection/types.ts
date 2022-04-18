import { Currencies } from "../../data/consts";
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
  depositRate: number;
  interestCapitalization: number;
  futureValue?: number;
  effectiveInterestRate?: number;
  interestRate?: number;
  selectedDepositSum?: number;
  selectedDepositTerm?: number;
}

export interface ISliderWithTextFieldProps {
  Currencies?: Currencies;
  currency?: string;
  days?: boolean;
  step: number;
  min: number;
  max: number;
  value: number;
  caption: string;
  handleInputChange?: string;
  handleSliderChange?: any;
}
