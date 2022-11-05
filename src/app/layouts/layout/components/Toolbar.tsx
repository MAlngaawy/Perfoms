import { Button, Grid } from "@mantine/core";
import { userApi } from "app/store/user/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AppIcons from "@main/core/AppIcons";
import HomeFirstNav from "app/pages/home/organisms/HomeFirstNav";
import FirstNav from "@main/components/FirstNav";

type Props = {
  opened: boolean;
  setOpened: any;
};

const Toolbar = ({ setOpened }: Props) => {
  const dispatch = useDispatch();

  let href = window.location.href;
  let routeName = href.slice(href.lastIndexOf('/') + 1 , href.length)

  if(routeName === 'home'){
    return <HomeFirstNav userName="Ahmed Kamal"/>
  }


  return ( 
  
  <FirstNav pageName={routeName} />
    // <div className="bg-fadedGray p-2 w-full flex justify-between items-center">

    //   <button
    //     className="block lg:hidden text-black border-0"
    //     onClick={() => setOpened(true)}
    //   >
    //     <AppIcons className="w-6 h-6 " icon="Bars3BottomLeftIcon:solid" />
    //   </button>
    //   <Button
    //     onClick={() => {
    //       Cookies.remove("token");
    //       dispatch(userApi.util.resetApiState());
    //     }}
    //     variant="default"
    //   >
    //     Logout
    //   </Button>
    //  </div>
  )
};

export default Toolbar;
