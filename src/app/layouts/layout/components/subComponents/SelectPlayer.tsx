import { Avatar } from "@mantine/core";
import classNames from "classnames";
import useWindowSize from "~/@main/hooks/useWindowSize";

type Props = {
  selected: boolean;
  image: string;
  name: string;
  selectFun?: any;
};

const SelectPlayer = ({ selected, image, name, selectFun }: Props) => {
  const windowSize = useWindowSize();
  return (
    <div
      className={classNames(
        "flex gap-1 p-1 cursor-pointer bg-slate-100 rounded-full justify-center items-center",
        {
          "": selected,
        }
      )}
    >
      <Avatar
        onClick={() => selectFun()}
        src={image}
        size={"sm"}
        radius={"xl"}
      />
      <h2
        className={classNames("mr-1 text-xs", {
          hidden: !selected,
          block: selected,
        })}
      >
        {windowSize.width && windowSize.width < 600
          ? name.length > 5
            ? name.substring(0, 5) + ".."
            : name
          : name}
        {/* {name} */}
      </h2>
    </div>
  );
};

export default SelectPlayer;
