import React , { useState } from 'react'
import { Card, Image, SimpleGrid } from '@mantine/core';
import AppIcons from '~/@main/core/AppIcons';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import FirstNav from '~/@main/components/FirstNav';



const MediaEvent = ({images}:{images:string[]}) => {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<any>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);


  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <>
        <FirstNav pageName='event' />
        <Carousel  className='m-auto mt-10' sx={{ width: '50%' , minWidth:300 }} withIndicators loop getEmblaApi={setEmbla}>
          {slides}
        </Carousel>
    </>
  );

}

export default MediaEvent