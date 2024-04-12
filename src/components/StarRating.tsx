import { ReactNode } from "react";

function StarRating({ numberOfStars }: { numberOfStars: number }) {
  const stars: ReactNode[] = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<span key={i}>⭐</span>);
  }

  return <div>{stars}</div>;
}

export default StarRating;
