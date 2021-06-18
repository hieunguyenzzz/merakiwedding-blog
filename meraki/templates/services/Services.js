import Container from "@components/container";
import Layout from "@components/layout";
import SourceProvider, { useSource } from "@providers/source";
import { Contact } from "@sections/Contact";
import defaultData from '@templates/services/data';
import { Image } from "meraki/components/Image";
const Cover = () => {
  const { get } = useSource()
  return <div className="min min-h-screen relative -mt-header lg:bg-element-7">
    <div className='absolute right-0 top-0 w-full bottom-24 lg:w-1/3 lg:h-full'>
      <Image src={get('service.image.src', '/services/service-mobile-banner.jpg')} />
    </div>
    <div className="absolute w-full h-full left-0 bottom-0  pt-header text-center lg:w-2/3 flex">
      <Container >
        <div className="flex flex-col items-center lg:text-left lg:flex-row h-full ">
          <div className="p-6 text-white lg:text-element-5 lg:flex-1">
            <h1 className="text-3xl font-kinfolk lg:text-7xl leading-none">{get('service.title', defaultData.title)}</h1>
            <div className="text-lg lg:text-xl font-garamond italic lg:mt-6">{get('service.subTitle', defaultData.subTitle)}</div>
          </div>
          <div className="flex-1 lg:hidden"></div>
          <div className="lg:w-2/5 self-center lg:pt-24">
            <div className="bg-element-6 p-6 lg:bg-transparent text-justify lg:p-0">
              {get('service.description')}
            </div>
          </div>
        </div>
      </Container>
    </div>
  </div>
}
const Blocks = () => {
  const { get } = useSource()
  return <Container>
    <div className="flex flex-col space-y-12 lg:space-y-24">
      {
        get('service.blocks', []).map((item = {}, i) => {
          console.log(item)
          return <div key={i} className="text-center relative">
            <div className="lg:w-6/12 max-w-md mx-auto space-y-12 lg:px-12 lg:py-24">
              <h2 className="text-6xl font-garamond italic font-bold">{item.title}</h2>
              <div className="flex space-x-2 lg:space-x-0 lg:m-0  lg:px-12 lg:absolute lg:inset-0  justify-between">
                {item?.images[0] && <div className="relative flex-1 self-start lg:flex-none lg:w-3/12">
                  <div style={{
                    paddingTop: `${2048 / 1366 * 100}%`
                  }}></div>
                  <Image {...item?.images[0]} />
                </div>}
                {item?.images[1] && <div className="relative flex-1 self-end lg:flex-none lg:w-3/12">
                  <div style={{
                    paddingTop: `${2048 / 1366 * 100}%`
                  }}></div>
                  <Image {...item?.images[1]} />
                </div>}
              </div>
              <div className="" dangerouslySetInnerHTML={{ __html: item.description }}></div>
              <div className="flex justify-center items-center lg:hidden">
                <div className="w-16 h-16 relative">
                  <Image src="/home/icons/web-homepage-icons-02.png" objectFit="contain" />
                </div>
              </div>
            </div>
          </div>
        })
      }
    </div>
  </Container>
}
const Services = ({ pageData, preview }) => {
  return <SourceProvider source={
    { en: pageData }
  }>
    <Layout preview={preview}>
      <Cover />
      <div className="h-24 lg:hidden" />
      <Blocks />
      <div className="h-24" />
      <Contact />
    </Layout>
  </SourceProvider>
}
export default Services;