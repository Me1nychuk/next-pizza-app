import React from "react";

export default function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <h1>Page {id}</h1>
    </>
  );
}
