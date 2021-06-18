
import Container from "@components/container";
import Layout from "@components/layout";
import SourceProvider, { useSource } from "@providers/source";
import { Instagram } from "@sections/Instagram";
import defaultData from '@templates/about/data';
import { Image } from "meraki/components/Image";

const Cover = () => {
  const { get } = useSource()
  return <div style={{ backgroundColor: '#61684b' }} className="min-h-screen relative -mt-header  pt-header">
    <Container >
      <div className="flex lg:space-x-20  py-6 lg:py-6 lg:pb-12 items-center mx-auto max-w-5xl">
        <div className="hidden lg:flex relative w-1/3">
          <div style={{
            paddingTop: `${2048 / 1400 * 100}%`
          }}></div>
          {get('about.images', [])[0] && <Image {...get('about.images', [])[0]} />}
        </div>
        <div className="flex flex-1 flex-col text-center lg:text-left  h-full">
          <div className=" text-white lg:text-element-5 space-y-6 lg:space-y-10">
            <h1 style={{
              color: '#ede1ca'
            }} className="text-3xl font-kinfolk lg:text-6xl leading-none">{get('about.title', defaultData.title)}</h1>
            <div style={{ color: "#2a2b0c" }} className="text-lg lg:text-xl font-garamond italic lg:mt-6">{get('about.subTitle', defaultData.subTitle)}</div>
          </div>
          <div className="flex-1 lg:hidden flex space-x-2 w-full mt-6">
            {
              get('about.images', []).map((image, i) => {
                if (!image || !image.src) return null
                return <div key={i} className="relative flex-1 ">
                  <div style={{
                    paddingTop: `${2048 / 1366 * 100}%`
                  }}></div>
                  <Image {...image} />
                </div>
              })
            }
          </div>
          <div className="self-center">
            <div style={{
              color: '#ede1ca'
            }} className="lg:bg-transparent text-justify lg:p-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: get('about.description') }}>
            </div>
          </div>
        </div>
      </div>

    </Container>
  </div>
}
const Blocks = () => {
  const { get } = useSource()
  return <div style={{
    backgroundColor: '#ede8df'
  }}>
    <div className="relative bg-element-2 lg:hidden">
      <div style={{
        paddingTop: '100%',

      }}></div>
      {get('about.image') && <Image {...get('about.image')} />}
    </div>
    <Container>
      <div className="flex flex-col space-y-6 lg:space-y-8 py-12 max-w-4xl mx-auto">
        <h2 className=" text-center text-3xl font-kinfolk">
          {get('about.content.title')}
        </h2>
        <div>
          <div className="leading-loose text-center lg:px-6 font-garamond italic lg:text-lg">{get('about.content.subTitle')}</div>
          <div className="flex lg:space-x-20 lg:py-12 justify-center items-center lg:px-6">
            <div className="whitespace-pre-line text-justify leading-loose flex-1 w-full text-sm" dangerouslySetInnerHTML={{ __html: get('about.content.description') }}></div>
            <div style={{ maxWidth: '400px' }} className=" relative w-full hidden lg:block">
              <div className='w-full relative'>
                <div style={{
                  paddingTop: '100%',

                }}></div>
                {get('about.image') && <Image {...get('about.image')} />}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <div className="w-20 h-20 relative ">
            <Image src="/home/icons/web-homepage-icons-02.png" objectFit="contain" />
          </div>
          <div className="-mt-6 text-center lg:text-lg font-garamond italic mx-auto max-w-2xl leading-loose" dangerouslySetInnerHTML={{ __html: get('about.content.quote') }} />
        </div>
      </div>
    </Container>
    <div className="h-20" />
  </div>
}
const About = ({ pageData, preview }) => {
  return <SourceProvider source={{
    en: pageData
  }}>
    <Layout preview={preview}>
      <Cover />
      <Blocks />
      <div className="h-24" />
      <Instagram />
    </Layout>
  </SourceProvider>

}

export default About