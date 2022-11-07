import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import AppIcons from '~/@main/core/AppIcons';
import { Link } from 'react-router-dom';

interface MediaCardProps {
    img:string,
    header:string,
    date: string,
    place: string
}

const MediaCard = ({
                img,
                header,
                date,
                place
            }: MediaCardProps) => {


    return (
        <Card shadow="sm" className='rounded-b-xl' p={0} radius="md" withBorder>
            <Card.Section component="a" href="https://mantine.dev/">
                <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
                />
            </Card.Section>

            <Group position="apart" className='mx-4' mt="md" mb="xs">
                <Text weight={500}>{header}</Text>
            </Group>

            <Text size="sm" className='mx-4' color="dimmed">
                <AppIcons className='w-5 inline mb-3' icon='CalendarIcon:outline' /> {date}
            </Text>

            <Text size="sm" className='mx-4' color="dimmed">
                <AppIcons className='w-5 inline mb-3' icon='MapIcon:outline' /> {place}
            </Text>

            <Link to={'/media/media-event'} >
                <Button variant="light" className='bg-perfBlue text-white rounded-b-xl' fullWidth >
                    View full Profile
                </Button>
            </Link>
            </Card>
    )
}

export default MediaCard