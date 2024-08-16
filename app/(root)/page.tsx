import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі піци
        </Title>
      </Container>
      <TopBar categories={categories.filter((c) => c.products.length > 0)} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* FILTERS */}
          <div className="w-[250px]">
            <Filters />
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
