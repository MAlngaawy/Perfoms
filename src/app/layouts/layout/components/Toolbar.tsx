import { eventInstance } from "@main/utils/AppUtils";
import { Button } from "@mantine/core";
import { userApi } from "app/store/user/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

type Props = {};

const Toolbar = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <div>
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
