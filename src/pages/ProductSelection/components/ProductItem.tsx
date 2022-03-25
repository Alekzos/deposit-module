import React from "react";

import { IProduct } from "../../../data/types";
import { numberWithSpaces } from "../../../utils/utils";
import { Currencies, pageURLs } from "../../../data/consts";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useAppDispatch } from "../../../redux/hooks";
import { productSelectionSlice } from "../../../redux/productReducer";

import { Link } from "react-router-dom";

interface ProductItemProps {
  product: IProduct;
  depositSum: number;
  depositTerm: number;
}

//компонент для вывода самой карточки
const ProductItem: React.FC<ProductItemProps> = ({
  product,
  depositSum,
  depositTerm,
}) => {
  const dispatch = useAppDispatch();
  const { setProduct } = productSelectionSlice.actions;
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2">
            {product.effectiveInterestRate ? (
              <>
                Эффективная ставка:{" "}
                <strong>{product.effectiveInterestRate}%</strong>
                <br />
              </>
            ) : (
              <>
                Cтавка:  <strong>{product.interestRate}%</strong>
                <br />
              </>
            )}
            Ваш доход: 
            <strong>
              {numberWithSpaces(product.futureValue)}{" "}
              {product.currency === Currencies.rub ? "₽" : "$"}
            </strong>
            <br />
            <br />
            Срок: <strong>{product.termDescription}</strong>
            <br />
            Сумма: 
            <strong>{product.sumDescription}</strong>
            <br />
            Частичное снятие и пополнение: 
            <strong>{product.withdrawals ? "да" : "нет"}</strong>
            <br />
            Досрочное расторжение: 
            <strong>{product.earlyTermination ? "да" : "нет"}</strong>
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={pageURLs.applicationPage}>
            <Button
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                //переделал, чтобы передевать везде не 3 параметра, а 1 продукт
                let selectedProduct = product;
                selectedProduct.selectedDepositSum = depositSum;
                selectedProduct.selectedDepositTerm = depositTerm;
                dispatch(setProduct(selectedProduct));
              }}
              size="small"
            >
              Оформить
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductItem;
