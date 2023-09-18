import React from "react";

type Props = {
  children: any;
};

const CardsWrapper = ({ children }: Props) => {
  return (
    <div className="my-6 grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {children}
    </div>
  );
};

export default CardsWrapper;
