
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Grid, Radio } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export type Players = {
  name: string;
  icon_url: string;
};
const SportsDetailsPage = () => {
  const [value, setValue] = useState<number>();
  const [valueRadio, setValueRadio] = useState('LeftHand');


  const matches = useMediaQuery('(min-width: 992px)');
  const resultsData = [{
    id: 1, title: "Football", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`, img: "/assets/images/Football.png"
  },
  {
    id: 2, title: "Taekwondo", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`, img: "/assets/images/Football.png"
  },
  {
    id: 3, title: "Basketball", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`, img: "/assets/images/Football.png"
  },
  {
    id: 4, title: "Volleyball", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`, img: "/assets/images/Football.png"
  },
  ]


  const KPIsData = [{
    id: 1, title: "Counter KPI", description: `Defining Sentence 
  Defining Sentence
  Defining Sentence 
  Defining Sentence 
  Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 2, title: "Counter KPI", description: `Defining Sentence 
    Defining Sentence
    Defining Sentence 
    Defining Sentence 
    Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 3, title: "Counter KPI", description: `Defining Sentence 
      Defining Sentence
      Defining Sentence 
      Defining Sentence 
      Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 4, title: "Counter KPI", description: `Defining Sentence 
        Defining Sentence
        Defining Sentence 
        Defining Sentence 
        Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 5, title: "Counter KPI", description: `Defining Sentence 
          Defining Sentence
          Defining Sentence 
          Defining Sentence 
          Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 6, title: "Counter KPI", description: `Defining Sentence 
            Defining Sentence
            Defining Sentence 
            Defining Sentence 
            Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 7, title: "Counter KPI", description: `Defining Sentence 
              Defining Sentence
              Defining Sentence 
              Defining Sentence 
              Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 8, title: "Counter KPI", description: `Defining Sentence 
                Defining Sentence
                Defining Sentence 
                Defining Sentence 
                Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 9, title: "Counter KPI", description: `Defining Sentence 
                  Defining Sentence
                  Defining Sentence 
                  Defining Sentence 
                  Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },
  {
    id: 10, title: "Counter KPI", description: `Defining Sentence 
                    Defining Sentence
                    Defining Sentence 
                    Defining Sentence 
                    Defining Sentence .`, img: "/assets/images/Ellipse512.png"
  },

  ]
  const MetricsData = [{ id: 1, title: "Left Hand", value: "LeftHand", img: "/assets/images/LeftHand.png", description: "Defining Sentence Defining S ...." },
  { id: 2, title: "Right Hand", value: "RightHand", img: "/assets/images/RightHand.png", description: "Defining Sentence Defining S ...." }]

  const { slug } = useParams();
  return (
    <div className="Help-Center-Details-Page grid gap-10 p-5 mb-20">
      {resultsData.filter(item => item.title == slug).map(item => (<div className="bg-white  rounded-[10px] flex md:flex-row flex-col  gap-2 ">
        <img
          width={250}
          height={'100%'}
          src={item.img}
          className="rounded-l-lg"
          alt="icon"
        />
        <div className="p-5 grid gap-5 flex-1">
          <h3 className="font-medium  text-2xl">
            {item.title}
          </h3>
          <p className={''}>
            {item.description}
          </p>
        </div>
      </div>))}

      <h2 className="text-xl text-perfGray1 font-medium">KPIs</h2>
      <Swiper spaceBetween={30} className="mySwiper w-full"
        modules={[A11y]}>
        {KPIsData.map(item => (<SwiperSlide onClick={() => { setValue((item.id) as any) }} key={item.id}
          className={`rounded-xl grid gap-5 ${value === item.id ? "text-white bg-perfBlue" : 'text-perfGray1 bg-white'} min-h-80 w-52 p-5`}>
          <img width={70}
            height={70}
            src={item.img}
            className="rounded-l-lg"
            alt="icon"
          />
          <h3 className="font-medium text-center text-2xl">
            {item.title}
          </h3>
          <p className={''}>
            {item.description}
          </p>
        </SwiperSlide>))}</Swiper>

      <h2 className="text-xl text-perfGray1 font-medium">Metrics</h2>
      <div className="grid  md:grid-cols-12 gap-6">
        <div className=" md:col-span-4">
          <Radio.Group
            value={valueRadio}
            onChange={(e) => setValueRadio(e as any)}
            name="favoriteFramework"
            spacing="xl"
            offset="xl"
            orientation={!matches?"horizontal":"vertical"}
            

          >
            {MetricsData.map(item => (<Radio key={item.id} value={item.value} classNames={{ body: `border rounded-lg  p-2 ${valueRadio === item.value ? "scale-90 border-[#2F80ED] bg-[#EBF3FE]" : " border-[#BDBDBD] bg-white "}` }} label={<div className={` grid grid-cols-12  w-full `}
            >
              <img width={70}
                height={70}
                src={item.img}
                className="rounded-l-lg col-span-4 "
                alt="icon"
              />
              <div className="px-4 col-span-8 grid gap-5 flex-1">
                <h3 className="font-medium  text-xl">
                  {item.title}
                </h3>
                <p className={'truncate ...'}>
                  {item.description}
                </p>
              </div>


            </div>} labelPosition="left" />
            ))}
          </Radio.Group>
        </div>

        <div className="p-5 md:col-span-8  grid gap-5 flex-1 bg-white rounded-xl">
          {MetricsData.filter(item => item.value == valueRadio).map(item => (<div className=" gap-5 flex">
            <img width={70}
              height={70}
              src={item.img}
              className="rounded-l-lg "
              alt="icon"
            />

            <h3 className="font-medium  text-xl">
              {item.title}
            </h3> </div>))}
          <p>Defining Sentence Defining Sentence Defining Sentence Defining Sentence Defining Sentence .</p>

          <div className="p-3 grid gap-3 border rounded-lg">   <h3 className="font-medium  text-xl">
            Information
          </h3>
            <p>more details about this KPI more details about this KPI more details about this KPI more details about this KPI more details about this
              KPI more details about this KPI more details about this KPI .</p>
          </div>
          <div className="p-3 grid gap-3 border rounded-lg">
            <div className=" flex "><h3 className="font-medium  text-xl">
              Score
            </h3><div className="flex flex-1 justify-center">
                {[1, 2, 3, 4, 5].map(item => (<div className={`w-9 h-9 rounded-full justify-center items-center flex ${[1, 2].includes(item) ? " bg-perfSecondary" : [3].includes(item) ? "bg-yellow" : "bg-perfGreen"}`}>{item}</div>))}
              </div></div>
            <p>measured by details ....</p>
            <div className="flex flex-1 justify-start">  {[1, 2].map(item => (<div className={`w-9 h-9 rounded-full justify-center items-center flex ${[1, 2].includes(item) ? " bg-perfSecondary" : [3].includes(item) ? "bg-yellow" : "bg-perfGreen"}`}>{item}</div>))}
            </div>
            <p>Weakness : need to do some actions to improve ...</p>
            <div className="flex flex-1 justify-start">  {[3].map(item => (<div className={`w-9 h-9 rounded-full justify-center items-center flex ${[1, 2].includes(item) ? " bg-perfSecondary" : [3].includes(item) ? "bg-yellow" : "bg-perfGreen"}`}>{item}</div>))}
            </div> <p>Moderate : need to do some recommendations to improve ...</p>
            <div className="flex flex-1 justify-start">  {[4, 5].map(item => (<div className={`w-9 h-9 rounded-full justify-center items-center flex ${[1, 2].includes(item) ? " bg-perfSecondary" : [3].includes(item) ? "bg-yellow" : "bg-perfGreen"}`}>{item}</div>))}
            </div>  <p>Strengths</p>
          </div>
        </div>
      </div>

    </div>
  );
};


export default SportsDetailsPage;
