import React , { useState } from 'react'
import { Card, Image, SimpleGrid } from '@mantine/core';
import AppIcons from '~/@main/core/AppIcons';




const MediaEvent = ({images}:{images:string[]}) => {
  const [viewImg , setViewImg] = useState(images[0])


  return (
    <Card withBorder shadow="sm" radius="md" style={{width:'50%'}} className='m-auto mt-10'>
      <Card.Section className='relative' mt="sm">
        <Image className='opacity-50 bg-black' src={viewImg} />
        <div className='play-icon absolute'>
          <AppIcons icon='PlayIcon:solid' className='w-5 text-white' />
        </div>
      </Card.Section>

      <Card.Section mt="sm"  className='overflow-x-scroll'>
          <div className='flex flex-row cursor-pointer w-[50rem] md:w-[80rem]'>
            {images.map(( image ) => (
              <Image onClick={()=>setViewImg(image)} className={`${viewImg === image?'':'opacity-50'} px-1`} src={image} key={image} radius="sm" />
              ))}
          </div>
      </Card.Section>
    </Card>
  )
}

export default MediaEvent