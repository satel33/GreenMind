/* eslint-disable no-prototype-builtins */
import currency from 'currency.js';
const euro = value => currency(value, { separator: '.', decimal: ',', symbol: '€' });
const dolar = value => currency(value, { separator: ',', decimal: '.', symbol: '$', pattern: '#!', precision: 0 });
const euroWithDotDecimal = value => currency(value, { separator: '.', decimal: ',', symbol: '€'});

const useNumber = (): any => {

  const formatMoney = (value) => {
    return euro(value).format();
  };

  const toInteger = (value) => currency(value, { precision: 0}).intValue;

  const formatDolar = (value) => {
    return dolar(value).format();
  };

  const formatMoneyFromStringDotDecimal = (value) => {
    return euroWithDotDecimal(parseFloat(value)).format();
  };

  return {
    toInteger,
    formatMoney,
    formatDolar,
    formatMoneyFromStringDotDecimal
  };
};

export default useNumber;
