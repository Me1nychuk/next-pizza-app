import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <Container className="mt-10 relative">
        <Title className="font-extrabold mb-8 text-[36px]">
          Оформлення замовлення
        </Title>

        <div className="flex items-start gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <WhiteBlock title="1. Кошик" contentClassName="py-0 px-6">
              <CheckoutItem
                id={1}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif"
                }
                details={"sdasdas fgsdsdg,fsdf sdf ,yt jt,j tt yj"}
                name={"Чорітто"}
                price={374}
                quantity={2}
              />
              <CheckoutItem
                id={2}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif"
                }
                details={"sdasdas fgsdsdg,fsdf sdf ,yt jt,j tt yj"}
                name={"Чорітто"}
                price={374}
                quantity={2}
              />
              <CheckoutItem
                id={3}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif"
                }
                details={"sdasdas fgsdsdg,fsdf sdf ,yt jt,j tt yj"}
                name={"Чорітто"}
                price={374}
                quantity={2}
              />
            </WhiteBlock>

            <WhiteBlock title="2. Персональні дані" contentClassName="">
              <div className="grid grid-cols-2 gap-5">
                <Input name="name" type="text" placeholder="Ваше ім'я" />
                <Input name="surname" type="text" placeholder="Ваше прізвище" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Ваша електронна пошта"
                />
                <Input
                  className="appearance-none no-spin"
                  name="number"
                  type="number"
                  placeholder="Номер телефону"
                />
              </div>
            </WhiteBlock>

            <WhiteBlock title="3. Адреса доставки " contentClassName="">
              <div className="flex flex-col gap-5">
                <Input
                  name="address"
                  type="text"
                  placeholder="Ваша адреса до замовлення"
                />
                <Textarea
                  className="text-base"
                  rows={5}
                  name="comment"
                  placeholder="Ваш коментар"
                />
              </div>
            </WhiteBlock>
          </div>
          <div className=" w-[450px] bg-white rounded-3xl p-3">
            <WhiteBlock className="p-6 sticky top-4" contentClassName="p-0">
              <div className="">
                <div className="flex flex-col gap-1">
                  <p className="text-xl">Сума до сплати:</p>
                  <span className="text-3xl font-extrabold">1000 ₴</span>
                </div>
              </div>
              <div className="py-7 border-y border-y-gray-100">
                <CheckoutItemDetails
                  title="Вартість товарів"
                  value={900}
                  startAdornment={
                    <Package size={16} className="text-gray-500" />
                  }
                />
                <CheckoutItemDetails
                  title="Податки"
                  value={20}
                  startAdornment={
                    <Percent size={16} className="text-gray-500" />
                  }
                />
                <CheckoutItemDetails
                  title="Вартість доставки"
                  value={80}
                  startAdornment={<Truck size={16} className="text-gray-500" />}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-[60px] text-lg font-bold"
              >
                Перейти до оплати <ArrowRight size={20} className="ml-2" />
              </Button>
            </WhiteBlock>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page;
