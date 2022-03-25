import { inRange } from "../../utils/utils";

//метки для бегунка с датами
export const marksSliderDepositTerm = [
  {
    value: 1,
    label: "1 д.",
  },
  {
    value: 180,
    label: "6 м.",
  },
  {
    value: 365,
    label: "1 г.",
  },
  {
    value: 548,
    label: "1.5 г.",
  },
  {
    value: 730,
    label: "2 г.",
  },
  {
    value: 913,
    label: "2.5 г.",
  },
  {
    value: 1095,
    label: "3 г.",
  },
];

//рассчет бонуса за размер депозита
export const calcValueKf = (value: number, currency: string): any => {
  let valueKf = 1;

  switch (currency) {
    case "rub":
      if (inRange(value, 50000000, 100000000)) {
        valueKf = 1.01;
      } else if (inRange(value, 100000000, 300000000)) {
        valueKf = 1.02;
      } else if (inRange(value, 300000000, 500000000)) {
        valueKf = 1.03;
      } else if (inRange(value, 500000000, 700000000)) {
        valueKf = 1.04;
      } else if (inRange(value, 700000000, 1000000000000)) {
        valueKf = 1.05;
      } else {
        valueKf = 1;
      }
      return valueKf;
    case "usd":
      if (inRange(value, 5000000, 10000000)) {
        valueKf = 1.01;
      } else if (inRange(value, 10000000, 3000000)) {
        valueKf = 1.02;
      } else if (inRange(value, 30000000, 50000000)) {
        valueKf = 1.03;
      } else if (inRange(value, 50000000, 70000000)) {
        valueKf = 1.04;
      } else if (inRange(value, 70000000, 1000000000000)) {
        valueKf = 1.05;
      } else {
        valueKf = 1;
      }
      return valueKf;
  }
};
