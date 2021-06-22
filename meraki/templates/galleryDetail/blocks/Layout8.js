import Container from "@components/container";
import { createImageFieldConfig } from "@providers/tinacms/helpers";
import { Image } from "meraki/components/Image";
import React from 'react';
import { RatioContaner } from "./RatioContaner";
export const Layout8 = ({
  image1, image2,
}) => {
  return <Container>
    <div className="grid grid-cols-2 gap-3 lg:gap-6">
      <RatioContaner>
        <Image src={image1?.src} alt="meraki wedding planners"></Image>
      </RatioContaner>
      <div className="flex justify-end items-center">
        <div className="w-2/3">
          <RatioContaner>
            <Image src={image2?.src} alt="meraki wedding planners"></Image>
          </RatioContaner>
        </div>

      </div>

    </div>
  </Container>;
};
export const layout8_template = {
  defaultItem: {
    image1: {
      src: '/home/explore-our-wedding/3.jpg'
    },
    image2: {
      src: '/home/explore-our-wedding/3.jpg'
    }
  },
  fiels: [
    createImageFieldConfig({ name: 'image1' }),
    createImageFieldConfig({ name: 'image2' }),
  ]
}