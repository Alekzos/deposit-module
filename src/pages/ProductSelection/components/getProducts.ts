import axios from "axios";
import { IProduct } from "../../../data/types";
import { doCalc } from "../../../utils/doCalc";

export const getProducts = async (
  productsDataURL: string,
  currency: string,
  depositTerm: number,
  depositOptions: any,
  value: number
) => {
  //получение
  let products = await axios
    .get<IProduct[]>(productsDataURL)
    .then(async function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("всегда выводит false:");
  console.log(depositOptions);

  //фильтрация
  let filteredProducts = (products || []).filter(
    (product) => product.currency === currency //&&

    //временно скрыто, чтобы не было пустого отфильтрованного списка
    // (depositTerm <= product.maxTerm || product.maxTerm === 0) &&
    // depositTerm <= product.maxTerm &&
    // depositTerm >= product.minTerm &&
    // (value <= product.maxSum || product.maxSum === 0) &&
    // value >= product.minSum &&
    // product.withdrawals === Number(depositOptions.withdrawals) &&
    // product.earlyTermination === Number(depositOptions.earlyTermination)
  );

  //расчет

  const calculatedProducts = filteredProducts.map((product) => ({
    ...product,
    depositRate: Number(
      doCalc(
        depositOptions.earlyTermination,
        depositOptions.withdrawals,
        depositOptions.interestСapitalization,
        currency,
        value,
        depositTerm
      )
    ),
  }));

  console.log(calculatedProducts);
  return calculatedProducts;
};
