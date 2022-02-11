export interface IDeposit {
    "id": number, 
    "title": string, 
    "description": string, 
    "interest": string,
    "minSum": number, 
    "maxSum": number, 
    "minTerm": number,  
    "maxTerm": number, 
    "termDescription":"",
    "currency":"rub",
    "paymentPeriods":string, 
    "withdrawals": number,
    "earlyTermination":number 
}