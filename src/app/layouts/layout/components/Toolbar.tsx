import { Button, Grid } from "@mantine/core";
import { userApi } from "app/store/user/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AppIcons from "@main/core/AppIcons";

type Props = {
  opened: boolean;
  setOpened: any;
};

const Toolbar = ({ setOpened }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-red w-full flex justify-between items-center">
      <button
        className="block lg:hidden text-black border-0"
        onClick={() => setOpened(true)}
      >
        <AppIcons className="w-6 h-6 " icon="Bars3BottomLeftIcon:solid" />
      </button>
      <Button
        onClick={() => {
          Cookies.remove("token");
          dispatch(userApi.util.resetApiState());
        }}
        variant="default"
      >
        Logout
      </Button>
    </div>
  );
};

export default Toolbar;
