
//добавление пробелов между числами и обратно для компонента ввода суммы депозита 
export function numberWithSpaces(val: any) {
    val = Number(val.toString().replace(' ', ''));
    let formatedNumber = val.toLocaleString();
    return formatedNumber;
  }

 export function numberWithoutSpaces(val: any, maxVal?: any) {
      val = Number(val.toLocaleString().replace(/\D/g,''));
      if (val >= maxVal) {val = maxVal} // пре превышении лимита установить макс значение
    return val;
  }