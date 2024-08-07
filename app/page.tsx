import { Container, Title, TopBar } from "@/components/shared";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold">
          Усі піци
        </Title>
      </Container>
      <TopBar />
    </>
  );
}
