import { Container, Filters, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі піци
        </Title>
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* FILTERS */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* PRODUCTS */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">Product list</div>
          </div>
        </div>
      </Container>
    </>
  );
}
