import {
  Container,
  Filters,
  ProductsGroupList,
  Stories,
  Title,
  TopBar,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizza, GetSearchParams } from "@/shared/lib/find-pizza";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizza(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі позиції
        </Title>
      </Container>

      <TopBar categories={categories.filter((c) => c.products.length > 0)} />
      {/*  <Stories /> */}
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px] max-sm:flex-col">
          {/* FILTERS */}
          <div className="w-[250px] max-lg:w-[200px]   max-sm:!w-full ">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          {/* PRODUCTS */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
