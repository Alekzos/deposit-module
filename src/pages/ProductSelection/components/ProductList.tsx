import React from "react";
import ProductItem from "./ProductItem";
import { IProduct } from "../../../data/types";

import Stack from "@mui/material/Stack";
interface ProductListProps {
  products: void | IProduct[];
  value: number;
}

//компонент для вывода списка депозитов
const ProductList: React.FC<ProductListProps> = ({ products, value }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      {(products || []).map((product) => {
        return <ProductItem key={product.id} product={product} value={value} />;
      })}
    </Stack>
  );
};

export default ProductList;
