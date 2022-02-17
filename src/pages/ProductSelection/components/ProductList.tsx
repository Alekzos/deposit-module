import React from "react";
import ProductItem from "./ProductItem";
import { IProduct } from "../../../data/types";

import Stack from "@mui/material/Stack";
interface ProductListProps {
  products: void | IProduct[];
  currency: string;
  depositTerm: number;
  depositOptions: any;
  value: number;
}

//компонент для вывода списка депозитов
const ProductList: React.FC<ProductListProps> = ({
  products,
  currency,
  depositTerm,
  depositOptions,
  value,
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      {(products || [])
        .filter(
          (product) => product.currency === currency //&&
          // (depositTerm <= deposit.maxTerm || deposit.maxTerm === 0) &&
          // depositTerm <= deposit.maxTerm &&
          // depositTerm >= deposit.minTerm &&
          // (value <= deposit.maxSum || deposit.maxSum === 0) &&
          // value >= deposit.minSum &&
          // deposit.withdrawals === Number(depositOptions.checkWithdrawals) &&
          // deposit.earlyTermination ===
          //   Number(depositOptions.checkEarlyTermination)
        )
        .map((filteredProducts) => {
          // console.log(Number(depositOptions.checkWithdrawals));
          // console.log(filteredDeposit.withdrawals);
          return (
            <ProductItem
              key={filteredProducts.id}
              deposit={filteredProducts}
              value={value}
              depositTerm={depositTerm}
            />
          );
        })}
      {/* // .map((filteredDeposit) => (
        //   <ProductItem key={filteredDeposit.id} deposit={filteredDeposit} />
        // ))} */}
    </Stack>
  );
};

export default ProductList;
