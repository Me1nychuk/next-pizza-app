import * as React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentLink: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentLink,
}) => (
  <div>
    <h1>замовлення № {orderId}!</h1>

    <p>
      Оплатіть замовлення на суму: {totalAmount} грн, натисніть на{" "}
      <a href={paymentLink}>посилання</a> для оплати.
    </p>
  </div>
);
