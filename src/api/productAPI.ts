import axios from "axios";
import { IProduct } from "../data/types";
import { doCalc } from "../pages/ProductSelection/doCalc";
import { jsonDataURLs } from "../data/consts";

export const getProducts = async (
  currency: string,
  depositTerm: number,
  depositOptions: any,
  value: number
) => {
  //получение
  const products = await axios
    .get<IProduct[]>(jsonDataURLs.products)
    .then(async function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  //фильтрация
  const filteredProducts = (products || []).filter(
    (product) =>
      product.currency === currency &&
      (depositTerm <= product.maxTerm || product.maxTerm === 0) &&
      depositTerm <= product.maxTerm &&
      depositTerm >= product.minTerm &&
      (value <= product.maxSum || product.maxSum === 0) &&
      value >= product.minSum &&
      product.withdrawals === Number(depositOptions.withdrawals) &&
      product.earlyTermination === Number(depositOptions.earlyTermination)
  );

  //расчет
  const calculatedProducts = filteredProducts.map((product) => ({
    ...product,
    interestRate: doCalc(
      depositOptions.earlyTermination,
      depositOptions.withdrawals,
      depositOptions.interestCapitalization,
      currency,
      value,
      depositTerm
    )[0],
    futureValue: doCalc(
      depositOptions.earlyTermination,
      depositOptions.withdrawals,
      depositOptions.interestCapitalization,
      currency,
      value,
      depositTerm
    )[1],
    effectiveInterestRate: doCalc(
      depositOptions.earlyTermination,
      depositOptions.withdrawals,
      depositOptions.interestCapitalization,
      currency,
      value,
      depositTerm
    )[2],
  }));

  return calculatedProducts;
};
