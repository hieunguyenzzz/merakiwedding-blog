import Container from '@components/container'
import { createImageFieldConfig } from '@providers/tinacms/helpers'
import React from 'react'
import Image from '../components/Image'
import { RatioContaner } from './RatioContaner'
export const Layout23 = ({ image1 = {}, image2 = {}, image3 = {} }) => {
  return (
    <Container>
      <div className="grid md:grid-cols-3 gap-1 md:gap-3">
        <div className="md:col-span-2">
          <RatioContaner variant="horizontal">
            <Image
              src={image1?.src}
              alt="meraki wedding planners"
              objectPosition="center center"></Image>
          </RatioContaner>
        </div>
        <div className="flex flex-col space-y-2 lg:space-y-3">
          <div className="flex-1 relative">
            <RatioContaner variant="horizontal">
              <Image
                src={image2?.src}
                alt="meraki wedding planners"
                objectPosition="center center"></Image>
            </RatioContaner>
          </div>
          <div className="flex-1 relative">
            <RatioContaner variant="horizontal">
              <Image
                src={image3?.src}
                alt="meraki wedding planners"
                objectPosition="center center"></Image>
            </RatioContaner>
          </div>
        </div>
      </div>
    </Container>
  )
}
export const layout23_template = {
  defaultItem: {
    image1: {
      src: '/home/explore-our-wedding/3.jpg',
    },
    image2: {
      src: '/home/explore-our-wedding/3.jpg',
    },
    image3: {
      src: '/home/explore-our-wedding/3.jpg',
    },
  },
  fields: [
    createImageFieldConfig({ name: 'image1' }),
    createImageFieldConfig({ name: 'image2' }),
    createImageFieldConfig({ name: 'image3' }),
  ],
}
