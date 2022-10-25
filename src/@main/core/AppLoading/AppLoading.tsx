import { useTimeout } from "@main/hooks";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  delay?: any;
};

function AppLoading({ delay = false, ...props }: Props) {
  const [showLoading, setShowLoading] = useState(!delay);

  useTimeout(() => {
    setShowLoading(true);
  }, delay);

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center justify-center p-24",
        !showLoading && "hidden"
      )}
    >
      <p
        className="text-13 sm:text-20 font-medium -mb-16"
        color="text.secondary"
      >
        Loading
      </p>
    </div>
  );
}

export default AppLoading;
