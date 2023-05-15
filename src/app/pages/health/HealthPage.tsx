import AddPlayer from "../home/molecules/AddPlayer";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import HomePlayerInfoCard from "../../../@main/components/HomePlayerInfoCard";
import HealthProgressBar from "~/@main/components/Health/HealthProgressBar";
import HealthReportSummary from "~/@main/components/Health/HealthReportSummary";
import HealthActivityProgressBars from "~/@main/components/Health/HealthActivityProgressBars";
import HealthSteps from "~/@main/components/Health/HealthSteps";
import HealthCalories from "~/@main/components/Health/HealthCalories";
import HealthSleep from "~/@main/components/Health/HealthSleep";
import { useFitDataMutation } from "~/app/store/health/healthApi";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Grid,LoadingOverlay } from "@mantine/core";


export type Players = {
  name: string;
  icon_url: string;
};

const HealthPage = () => {
  const [fitData, { data, isSuccess, isLoading, isError, error }] = useFitDataMutation()

  const navigate = useNavigate();
  const [bool, setbool] = useState(true)
  const [auth, setauth] = useState(false)
  useEffect(() => {
    fitData({})
  }, [])
    useEffect(() => {
  if(isSuccess)setbool(false)
  if(isError){setauth(true)
    setTimeout(() => {
      navigate('/health/authorize')
    }, 3000);
  }
    }, [isSuccess, isLoading, isError, error, data])
const customLoader = (
  <div className="h-screen w-full grid justify-center items-center fixed inset-0">
    <HeartIcon className="w-[25%] animate-ping text-red  m-auto" />
    <h1 className="text-black text-center text-3xl font-semibold animate-bounce  "> Please Wait.... </h1>
  </div>
);
const customLoader2 = (
  <div className="h-screen w-full grid justify-center items-center fixed inset-0">

    <h1 className="text-black text-center text-3xl font-semibold   "> Some things was wrong 😥
    <br/> <br/> <br/> <br/> <br/>Please Authorize by Google
     </h1>
  </div>
);
  return (
    <div className="home-page px-5 mb-20 relative min-h-screen w-full">
      <LoadingOverlay visible={bool} loader={ auth?  customLoader2:customLoader} overlayBlur={2} />

      <div className="my-4 flex xs:flex-row gap-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <AddPlayer />
        </div>
        <div className="flex gap-1 justify-center items-center md:pt-0">
          <TeamFilter />
          <TimeFilter />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Grid columns={15} gutter={"md"}>
          <Grid.Col md={5} lg={4} xl={2.5} span={15}>
            <div className="flex flex-col gap-4">
              <HomePlayerInfoCard />
              <div className="note bg-white rounded-3xl w-full p-4 h-full">
                <h2 className="text-lg font-normal text-perfGray1 pb-4">
                  Overall notes
                </h2>
                <p className=" text-base font-normal text-perfGray3">
                  Fitness Flexibility 10 Exercises to Improve Your Flexibility
                  1. Standing Quad Stretch. Stand with your feet together. ...
                  2. Standing Side Stretch. Standing with your feet together,
                  lift your arms overhead. ... 3. Seated Hamstring Stretch.
                  ... 4. Standing Calf Stretch. ... 5. Shoulder Stretch. ...
                  6. The Forward Hang. ... 7. Back stretch. ... 8. Butterfly
                  Groin Stretch.
                </p>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col md={10} lg={11} xl={12.5} span={15}>
            <Grid columns={15} gutter={"md"}>
              {/* progress bar in top */}
              <Grid.Col span={15} className="relative min-h-[60px] h-[140px]  sm:h-20 sm:max-h-[100px]">
                <HealthProgressBar />
              </Grid.Col>
              <Grid.Col sm={7.5} xl={5} orderXl={1} order={1} span={15}>
                <HealthSteps />
              </Grid.Col>
              <Grid.Col sm={7.5} xl={4} orderXl={1} order={1} span={15}>
                <HealthCalories />
              </Grid.Col>
              <Grid.Col sm={7.5} xl={6} orderXl={1} order={1} span={15}>
                <HealthSleep />
              </Grid.Col>
              <Grid.Col xl={9} orderXl={1} order={2} span={15}>
                <HealthActivityProgressBars />
              </Grid.Col>
              <Grid.Col sm={7.5} xl={6} orderXl={1} order={1} span={15}>
                <HealthReportSummary />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};


export default HealthPage;
