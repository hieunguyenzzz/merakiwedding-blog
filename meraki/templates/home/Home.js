import Button from '@components/button'
import Container from '@components/container'
import Layout from '@components/layout'
import SourceProvider, { useSource } from '@providers/source'
import {
  createBlock,
  createImageFieldConfig,
  createScreenGroup,
} from '@providers/tinacms/helpers'
import { Contact } from '@sections/Contact'
import { Instagram } from '@sections/Instagram'
import IntroSlider from '@sections/IntroSlider'
import Slider from '@sections/Slider'
import homeData from 'data/homeData'
import Seo from 'meraki/components/Seo'
import { Block } from '../../components/Block'
import { Image } from '../../components/Image'
import { LG } from '../../components/LG'
import { Link } from '../../components/Link'
import { XS } from '../../components/XS'
const data = { en: homeData }
const local = 'en'
const Intro = () => {
  return (
    <>
      <XS>
        {(get) => (
          <div className="relative w-full h-screen text-element-2">
            <IntroSlider>
              {Array.from(get('IntroSlider.items', []), ({ src, alt }, i) => (
                <div key={i} className="relative w-screen h-screen">
                  <div className="absolute inset-0">
                    <Image
                      placeholder={false}
                      variant="cover"
                      src={src}
                      alt={alt}
                    />
                  </div>
                  {i === 0 && (
                    <div className="absolute left-0 z-10 w-full text-center text-white top-header">
                      <Container>
                        <div className="pt-12">
                          <div className="text-3xl uppercase font-kinfolk">
                            {get('IntroSlider.title')}
                          </div>
                          <div className="text-xl italic font-garamond">
                            {get('IntroSlider.subTitle')}
                          </div>
                        </div>
                      </Container>
                    </div>
                  )}
                </div>
              ))}
            </IntroSlider>
          </div>
        )}
      </XS>
      <LG>
        {(get) => (
          <div className="relative w-full h-screen text-element-2">
            <IntroSlider>
              {Array.from(get('IntroSlider.items', []), ({ src, alt }, i) => (
                <div key={i} className="relative w-screen h-screen">
                  <div className="absolute inset-0">
                    <Image
                      placeholder={false}
                      variant="cover"
                      src={src}
                      alt={alt}
                    />
                  </div>
                  {i === 0 && (
                    <div className="absolute left-0 z-10 w-full text-center text-white bottom-14">
                      <Container>
                        <div>
                          <div className="text-4xl uppercase font-kinfolk">
                            {get('IntroSlider.title')}
                          </div>
                          <div className="text-2xl italic font-garamond">
                            {get('IntroSlider.subTitle')}
                          </div>
                        </div>
                      </Container>
                    </div>
                  )}
                </div>
              ))}
            </IntroSlider>
          </div>
        )}
      </LG>
    </>
  )
}
const Block1 = () => {
  const { get } = useSource()
  return (
    <>
      <XS>
        {(get) => (
          <div>
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
              <div className="relative w-24 md:w-28">
                <Image
                  priority
                  layout="responsive"
                  width={112}
                  height={218}
                  src="/home/icons/web-homepage-icons-01.png"
                  objectFit="contain"></Image>
              </div>
              <h2 className="font-kinfolk max-w-[150px] uppercase text-2xl text-center leading-normal whitespace-pre-line flex flex-col items-center">
                {get('Block1.title', '')}
              </h2>
              <div
                className="mt-4 text-xl italic text-center font-garamond"
                dangerouslySetInnerHTML={{
                  __html: get('Block1.description'),
                }}></div>
              <div className="h-6" />
              <div className="items-center w-full px-3 space-y-6 lg:flex lg:space-y-0 lg:space-x-12">
                <div className="flex-1 leading-relaxed text-center">
                  {get('Block1.text1')}
                </div>
                <div className="hidden w-px h-full lg:block bg-element-5 "></div>
                <div className="flex flex-col items-center flex-1 space-y-6 text-center">
                  <div className="max-w-sm text-xl italic leading-relaxed font-garamond">
                    {get('Block1.text2')}
                  </div>
                  <div className="text-xs font-semibold font-sweetsans">
                    {get('Block1.text3')}
                  </div>
                </div>
              </div>
              <div className="h-20" />
              <div className="w-full lg:flex bg-element-2">
                <div className="px-12 pt-8 lg:w-2/5">
                  <div
                    style={{
                      maxWidth: '280px',
                    }}
                    className="relative w-full mx-auto">
                    <Image
                      {...get('Block2.image', {
                        src: '/logo-2.png',
                      })}
                      layout="responsive"
                      width={273}
                      height={418}></Image>
                  </div>
                </div>
                <div className="flex-1 px-3 pt-6 pb-8 leading-loose">
                  <Container>
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl font-kinfolk">
                        {get('Block2.title')}
                      </div>
                      <div className="italic text font-garamond">
                        {get('Block2.subTitle')}
                      </div>
                      <div className="font-semibold text font-commissioner">
                        {get('Block2.description')}
                      </div>
                      <div className="w-full mt-3 space-y-6 leading-normal text-justify">
                        {get('Block2.texts', '')
                          .split('\n')
                          .map((item, i) => {
                            return <div key={i}>{item}</div>
                          })}
                      </div>
                      <div className="h-4" />
                      <div className="flex justify-center">
                        <Link href={get('Block2.url', '/')}>
                          <Button>
                            {get('Block2.buttonText', 'read more')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        )}
      </XS>
      <LG>
        {(get) => (
          <div>
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
              <div className="relative w-24 md:w-28">
                <Image
                  layout="responsive"
                  width={112}
                  height={218}
                  src="/home/icons/web-homepage-icons-01.png"
                  objectFit="contain"></Image>
              </div>
              <h2 className="text-3xl text-center uppercase font-kinfolk ">
                {get('Block1.title')}
              </h2>
              <div
                className="text-2xl italic text-center font-garamond"
                dangerouslySetInnerHTML={{
                  __html: get('Block1.description'),
                }}></div>
              <div className="h-14" />
              <div className="flex w-full space-x-14 justify-evenly">
                <div className="flex-1 max-w-sm py-8 leading-loose text-justify">
                  {get('Block1.text1')}
                </div>
                <div className="w-px bg-element-5"></div>
                <div className="flex flex-col items-center flex-1 max-w-sm py-8 space-y-6 text-center">
                  <div className="max-w-sm text-xl italic leading-loose font-garamond">
                    {get('Block1.text2')}
                  </div>
                  <div className="text-sm font-semibold font-sweetsans">
                    {get('Block1.text3')}
                  </div>
                </div>
              </div>
              <div className="h-20" />
              <div className="w-full lg:flex">
                <div className="flex items-center justify-center -mt-20 lg:w-2/5">
                  <div className="relative w-4/6">
                    <Image
                      {...get('Block2.image', {
                        src: '/logo-2.png',
                      })}
                      layout="responsive"
                      width={273}
                      height={418}></Image>
                  </div>
                </div>
                <div className="flex-1 px-6 pt-6 pb-8 leading-loose">
                  <Container>
                    <div className="flex flex-col">
                      <div className="text-4xl font-kinfolk">
                        {get('Block2.title')}
                      </div>
                      <div className="mt-2 text-lg italic text font-garamond">
                        {get('Block2.subTitle')}
                      </div>
                      <div className="font-semibold text font-commissioner">
                        {get('Block2.description')}
                      </div>
                      <div className="mt-6 space-y-6 text-justify">
                        {get('Block2.texts', '')
                          .split('\n')
                          .map((item, i) => {
                            return <div key={i}>{item}</div>
                          })}
                      </div>
                      <div className="h-14" />
                      <div className="flex">
                        <Link href={get('Block2.url', '/')}>
                          <Button>{data[local].others['read more']}</Button>
                        </Link>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        )}
      </LG>
    </>
  )
}
// gallery
const Block3 = () => {
  const { get } = useSource()

  const galleries = get('app.data.gallery', [])
  return (
    <>
      <XS>
        {(get) => (
          <div>
            <Block
              {...{
                title: get('Block3.title'),
                description: get('Block3.description'),
              }}>
              <div className="w-full mt-4">
                <Slider>
                  {galleries
                    .map((item, i) =>
                      i >= 15 ? null : (
                        <div key={i}>
                          <Link
                            href={item.url || '/'}
                            className="relative block p-3 pb-12">
                            <div className="relative flex justify-center">
                              <Image
                                {...item.image}
                                layout="intrinsic"
                                width={277}
                                height={415}
                                variant="card"></Image>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 px-8">
                              <div
                                style={{
                                  minHeight: '82px',
                                }}
                                className="flex flex-col items-center justify-center w-full px-6 py-2 text-center bg-element-1">
                                <div className="text-2xl italic leading-none font-garamond">
                                  {item.title}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.6em',
                                  }}
                                  className="mt-2 uppercase font-sweetsans ">
                                  {item.subTitle}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    )
                    .filter(Boolean)}
                </Slider>
              </div>
              <div className="h-12"></div>
              <div className="flex justify-center">
                <Link href={get('Block3.url', '/')}>
                  <Button>{get('Block3.buttonText', 'read more')}</Button>
                </Link>
              </div>
            </Block>
          </div>
        )}
      </XS>
      <LG>
        {(get) => (
          <div>
            <Block
              {...{
                title: get('Block3.title'),
                description: get('Block3.description'),
              }}>
              <div className="w-full mt-8">
                <Slider>
                  {galleries
                    .map((item, i) =>
                      i >= 15 ? null : (
                        <div key={i}>
                          <Link
                            href={item.url || '/'}
                            className="relative block px-4 pb-12">
                            <div className="relative">
                              <Image
                                {...item.image}
                                variant="card"
                                layout="responsive"
                                width={277}
                                height={415}
                                sizes="
                                  (max-width: 500px) 300px, 
                                  (max-width: 700px) 300px,
                                  (max-width: 1440px) 300px,
                                  300px
                                "></Image>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 px-12">
                              <div
                                style={{
                                  minHeight: '82px',
                                }}
                                className="flex flex-col items-center justify-center w-full px-6 py-2 text-center bg-element-1">
                                <div className="text-xl italic leading-none font-garamond font-bolder">
                                  {item.title}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.7em',
                                  }}
                                  className="mt-2 uppercase font-sweetsans ">
                                  {item.subTitle}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    )
                    .filter(Boolean)}
                </Slider>
              </div>
              <div className="h-12"></div>
              <div className="flex justify-center">
                <Link href={get('Block3.url', '/')}>
                  <Button>{get('Block3.buttonText', 'read more')}</Button>
                </Link>
              </div>
            </Block>
          </div>
        )}
      </LG>
    </>
  )
}

// services
const Block4 = () => {
  return (
    <>
      <XS>
        {(get) => (
          <div>
            <Block
              title={get('Block4.title')}
              description={get('Block4.description')}>
              <div className="h-6"></div>
              <div className="flex justify-center">
                <Link href={get('Block4.url')}>
                  <Button>{get('Block4.buttonText')}</Button>
                </Link>
              </div>
              <div className="h-8"></div>
              <div className="grid items-center justify-center w-full grid-cols-1 gap-6 lg:grid-cols-3 justify-items-center ">
                {get('Block4.items', []).map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center max-w-md text-center">
                      <div className="text-3xl font-kinfolk ">{`${
                        i < 9 ? '0' : ''
                      }${i + 1}.`}</div>
                      <div className="text-sm uppercase font-sweetsans">
                        {item.title}
                      </div>
                      <div className="mt-1 leading-relaxed ">
                        {item.description}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="h-8"></div>
              <div className="flex justify-center">
                <div className="relative w-14 h-14">
                  <Image
                    {...{
                      src: get('Block4.image', {
                        src: '/home/icons/web-homepage-icons-02.png',
                      }).src,
                    }}
                    layout="responsive"
                    width={56}
                    height={56}></Image>
                </div>
              </div>
              <div className="h-2"></div>
            </Block>
          </div>
        )}
      </XS>
      <LG>
        {(get) => (
          <div>
            <Block
              title={get('Block4.title')}
              description={get('Block4.description')}>
              <div className="h-6"></div>
              <div className="flex justify-center">
                <Link href={get('Block4.url')}>
                  <Button>{get('Block4.buttonText')}</Button>
                </Link>
              </div>
              <div className="h-14"></div>
              <div className="grid items-start w-full grid-cols-1 gap-12 lg:grid-cols-3">
                {get('Block4.items', []).map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center max-w-md text-center">
                      <div className="px-6 text-6xl font-kinfolk">{`${
                        i < 9 ? '0' : ''
                      }${i + 1}.`}</div>
                      <div className="px-12 mt-2 uppercase font-sweetsans">
                        {item.title}
                      </div>
                      <div className="mt-6 leading-loose ">
                        {item.description}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="h-14"></div>
              <div className="flex justify-center">
                <div className="relative w-14 h-14">
                  <Image
                    {...{
                      src: get('Block4.image', {
                        src: '/home/icons/web-homepage-icons-02.png',
                      }).src,
                    }}
                    layout="responsive"
                    width={56}
                    height={56}></Image>
                </div>
              </div>
              <div className="h-6"></div>
              <div className="w-full text-xl italic text-center font-garamond">
                {get('Block4.text')}
              </div>
              <div className="h-14"></div>
            </Block>
          </div>
        )}
      </LG>
    </>
  )
}
// blog
const Block5 = () => {
  return (
    <>
      <XS>
        {(get) => (
          <div className="flex flex-col">
            <div className="relative flex-1">
              <Image
                {...get('Block5.image')}
                layout="responsive"
                width={688}
                height={431}></Image>
            </div>
            <div className="relative flex-1 bg-element-3">
              <Image
                {...data[local].Block5.imageLeft}
                objectFit="contain"
                className="opacity-40"
                layout="responsive"
                width={688}
                height={431}></Image>
              <div className="absolute inset-0 flex items-center justify-center isolate">
                <div className="max-w-lg mx-auto text-element-2">
                  <Block
                    title={get('Block5.title')}
                    description={get('Block5.description')}>
                    <div className="flex justify-center mt-6">
                      <Link href={get('Block5.url')}>
                        <Button reverse>{get('Block5.buttonText')}</Button>
                      </Link>
                    </div>
                  </Block>
                </div>
              </div>
            </div>
          </div>
        )}
      </XS>
      <LG>
        {(get) => (
          <div>
            <div className="flex">
              <div className="relative flex-1 bg-element-3">
                <Image
                  {...data[local].Block5.imageLeft}
                  objectFit="contain"
                  className="opacity-40"
                  layout="intrinsic"
                  width={688}
                  height={431}></Image>
                <div className="absolute inset-0 flex items-center justify-center isolate">
                  <div className="max-w-lg mx-auto text-element-2">
                    <Block
                      title={get('Block5.title')}
                      description={
                        <div className="text-base">
                          {get('Block5.description')}
                        </div>
                      }>
                      <div className="flex justify-center mt-6">
                        <Link href={get('Block5.url')}>
                          <Button reverse>{get('Block5.buttonText')}</Button>
                        </Link>
                      </div>
                    </Block>
                  </div>
                </div>
              </div>
              <div className="relative flex-1">
                <Image
                  {...get('Block5.image', data[local].Block5.imageRight)}
                  layout="responsive"
                  width={688}
                  height={431}></Image>
              </div>
            </div>
          </div>
        )}
      </LG>
    </>
  )
}
// kind words
const Block6 = () => {
  return (
    <>
      <XS>
        {(get) => (
          <div>
            <Block
              {...{
                small: false,
                title: get('Block6.title'),
                description: get('Block6.description'),
              }}>
              <div className="h-3"></div>
              <div className="w-px h-10 bg-element-5"></div>
              <div className="h-3"></div>
              <div className="flex justify-center">
                <Link href={get('Block6.url', '/')}>
                  <Button>
                    {get(
                      'Block6.buttonText',
                      'BROWSE FOR TIPS AND INSPIRATION'
                    )}
                  </Button>
                </Link>
              </div>
              <div className="h-2"></div>
            </Block>
          </div>
        )}
      </XS>
      <LG>
        {(get) => (
          <div>
            <Block
              {...{
                small: false,
                title: get('Block6.title'),
                description: get('Block6.description'),
              }}>
              <div className="h-6"></div>
              <div className="flex justify-center">
                <Link href={get('Block6.url', '/')}>
                  <Button>
                    {get(
                      'Block6.buttonText',
                      'BROWSE FOR TIPS AND INSPIRATION'
                    )}
                  </Button>
                </Link>
              </div>
              <div className="h-20"></div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {get('Block6.items', data[local].Block6.items).map(
                  (item, i) => {
                    return (
                      <div key={i} className="flex flex-col lg:flex-row ">
                        <div className="flex flex-col justify-center flex-1 h-full">
                          <div
                            style={{
                              minHeight: '300px',
                            }}
                            className="relative w-full h-4/5">
                            <Image
                              {...item.image}
                              variant="card"
                              width={310}
                              height={310}
                              layout="intrinsic"></Image>
                          </div>
                        </div>
                        <div className="flex-1 px-6 pt-3 pb-6 bg-element-2">
                          <div className="text-2xl italic font-garamond">
                            {item.title}
                          </div>
                          <div
                            style={{
                              fontSize: '0.8em',
                            }}
                            className="font-sweetsans">
                            {item.subTitle}
                          </div>
                          <div className="mt-4 text-sm leading-loose text-justify">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </Block>
          </div>
        )}
      </LG>
    </>
  )
}

export default function Home({ source }) {
  return (
    <SourceProvider
      source={{
        en: {
          ...source,
          ...(source?.data || {}),
        },
      }}>
      <Seo {...(source?.seo || {})} />
      <Layout>
        <div className="w-full -mt-header">
          <div className="bg-element-3">
            <Intro />
          </div>
          <div className="py-12 bg-element-1">
            <Container>
              <Block1 />
            </Container>
          </div>
          <div className="bg-white">
            <Block3 />
          </div>
          <div className="bg-element-1">
            <Block4 />
          </div>
          <div className="bg-white">
            <Block5 />
          </div>
          <div className="hidden bg-element-1 lg:block">
            <Block6 />
          </div>
          <div className="bg-element-3">
            <Contact />
          </div>
          <div className=" py-14">
            <Instagram />
          </div>
          <div>
            <Container>
              <div className="flex justify-center w-full"></div>
            </Container>
          </div>
        </div>
      </Layout>
    </SourceProvider>
  )
}
export const home_template = {
  defaultItem: {
    Block1: {
      title: {
        xs: 'INDEPENDENT  ATTENTIVENESS  DEDICATION',
        lg: 'INDEPENDENT / ATTENTIVENESS / DEDICATION',
      },
      description: {
        xs: 'Every wedding crafted by Meraki is a <b class="font-semibold">unique experience</b> that was delivered beautifully.',
      },
      text1: {
        xs: 'No detail is too small, nor any idea is too big. With years of expertise, Meraki team is here to help you create an occasion that you will never forget.',
        lg: 'No detail is too small, nor any idea is too big. However,  translating your vision into a reality really takes  knowledge and a true dedicated team. With years of  expertise, Meraki team is always here to help you create  an occasion that you will never forget.',
      },
      text2: {
        xs: '"There is so much joy that goes into the planning and dreaming of your wedding - It is the happiest of projects."',
      },
      text3: {
        xs: '- MARTHA STEWART -',
      },
    },
    Block2: {
      title: {
        xs: 'MERAKI',
      },
      subTitle: {
        xs: '[may-rah-kee] Greek',
      },
      description: {
        xs: 'Doing something with soul, creativity, and love',
      },
      texts: {
        xs: 'Each team member is an essential part that completes each other, bringing balance and making Meraki a diverse and aggregate team. We stay behind the scenes to spark your special day and translate your vivid dream into life',
        lg: 'Wedding is a notable milestone in life. It is the beginning of a lifetime commitment. As wedding planners, we want the bride and groom to enjoy their celebration to the fullest so that they can begin the shared journey with many great memories. \nMeraki has been walking on a fascinating journey. As we are devoted to do what we love and are passionate about, our hearts are nurtured each day and every day. Each team member is an essential part, we complete each other, bringing balance and making Meraki a diverse and aggregate team. We stay behind the scenes to spark your special day and translate your vision into life.',
      },
      image: {
        xs: {
          alt: '',
          src: 'https://strapi.merakiweddingplanner.com/uploads/web_homepage_about_4acca1e65c.JPG?18',
        },
      },
      url: {
        xs: '/about',
      },
    },
    Block3: {
      title: {
        xs: 'EXPLORE OUR WEDDINGS',
      },
      description: {
        xs: 'We hope you find inspiration through the beautiful photos from our amazing dearly photographers',
      },
      buttonText: {
        xs: 'see more',
      },
      url: {
        xs: '/gallery',
      },
      items: {
        xs: [
          {
            title: 'Boundles Amour',
            subTitle: 'TESS & ANDY',
            image: {
              src: 'https://strapi.merakiweddingplanner.com/uploads/1_3659327e3f.jpg?21',
            },
          },
        ],
      },
    },
    Block4: {
      title: {
        xs: 'OUR SERVICES',
      },
      description: {
        xs: 'Our services are customized for your needs',
      },
      url: {
        xs: '/services',
      },
      buttonText: {
        xs: 'see details',
      },
      items: {
        xs: [
          {
            title: 'FULL - SERVICE WEDDING PLANNING',
            description:
              'This package is designed for couples who need us to take the lead on every aspect of the wedding. ',
          },
          {
            title: 'PARTIAL SERVICE WEDDING PLANNING',
            description:
              'Designed for everyone, this package is our most popular option for couples who need guidance in wedding planning',
          },
          {
            title: 'MONTH OF COORDINATION',
            description:
              'This package is for couple who want to plan the wedding by themselves but still need an expert for guidance.',
          },
        ],
      },
    },
    Block5: {
      title: {
        xs: 'BLOG',
      },
      description: {
        xs: 'We are here not for just inspiration but also for practical advice',
      },
      url: {
        xs: '/blog',
      },
      buttonText: {
        xs: 'BROWSE FOR TIPS AND INSPIRATION',
      },
      image: {
        xs: {
          src: 'https://strapi.merakiweddingplanner.com/uploads/web_homepage_blog_d5b7b94f26.jpg?23',
        },
      },
    },
    Block6: {
      title: {
        xs: 'KIND WORDS',
      },
      description: {
        xs: 'Sweet testimonials from clients are our motivation in the whole journey',
      },
      url: {
        xs: '/kind-words',
      },
      buttonText: {
        xs: 'read',
      },
      items: {
        xs: [
          {
            image: {
              src: '/home/kind-words/web-homepage-kindwords-1.jpg',
              alt: '',
            },
            title: 'Tess & Andy',
            subTitle: 'NEW ZEALAND / UNITED KINGDOM',
            description:
              '“Xuan and Tu were very attentive and insured our vision came true. They worked with us with great communication, informing us on all details – even if there were things we couldn’t achieve they talked us through reasons and available options. We were so happy to have Xuan and Tu as wedding planners and they became a special part of our wedding and remain our close friends today...”',
          },
          {
            image: {
              src: '/home/kind-words/web-homepage-kindwords-2.jpg',
              alt: '',
            },
            title: 'Mai & Chris',
            subTitle: 'UNITED STATE',
            description:
              '“We used Tu and Xuan for our wedding in Saigon in November 2018. From the start Xuan and Tu were extremely responsive to us. They went the extra mile to secure a venue that we had never even seen in person before and they patiently worked with us through emails for 7 months. To us they are family now ...”',
          },
          {
            image: {
              src: '/home/kind-words/web-homepage-kindwords-3.jpg',
              alt: '',
            },
            title: 'Lucia & Qui',
            subTitle: 'VIET NAM / AUSTRALIA',
            description:
              '“When it came to select a wedding planner, we thanked our lucky stars we found Meraki Wedding Planner Hoang Thanh Xuan - You are the best wedding planner in Vietnam. Without your help our special day would not have been the picture-perfect event we always dreamed of. Thank you so much. We appreciate you more than words can say...”',
          },
          {
            image: {
              src: '/home/kind-words/web-homepage-kindwords-4.jpg',
              alt: '',
            },
            title: 'Lele & Thomas',
            subTitle: 'VIET NAM / FRANCE',
            description:
              '“Xu and Meraki team are amazing. They were the secret weapon for our unforgettable wedding night on a boat along Saigon river. With Xu, no details are too small, no speed is too fast, and all ideas are seemingly achievable. So if you want your special day to be really special, out of the box, yet you want minimal stress and worries, Meraki is the team of choice as a trusted planner and friend...',
          },
        ],
      },
    },
    Block7: {
      description: {
        xs: 'Tell us how we can help',
      },
      title: {
        xs: 'BOOK YOUR CONSULTATION',
      },
      buttonText: {
        xs: 'CONTACT US',
      },
      url: {
        xs: '/contact',
      },
      image: {
        xs: {
          src: 'https://strapi.merakiweddingplanner.com/uploads/IMG_7789_e33380d3ff.JPG?34',
        },
        lg: {
          src: 'https://strapi.merakiweddingplanner.com/uploads/web_homepage_contact_2ed99724f6.jpg?26',
        },
      },
    },
    IntroSlider: {
      xs: {
        title: 'DESTINATION WEDDING PLANNER',
        subTitle: 'Based in Vietnam',
        items: [
          {
            name: 'Title',
            id: 'g6ai0d8ob',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_1_702cfe2ac2.jpg?3',
          },
          {
            name: 'Title',
            id: 'rmimyh28m',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_2_662397a00e.jpg?4',
          },
          {
            name: 'Title',
            id: 'zmnw6rq0b',
          },
          {
            name: 'Title',
            id: '28zabvgb3',
          },
        ],
      },
      title: {
        xs: 'DESTINATION WEDDING PLANNER',
        lg: '',
      },
      subTitle: {
        xs: 'Based in Vietnam',
      },
      items: {
        xs: [
          {
            name: 'Title',
            id: 'p6zu03yg1',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_1_702cfe2ac2.jpg?3',
          },
          {
            name: 'Title',
            id: 'o96085wnc',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_2_662397a00e.jpg?4',
          },
          {
            name: 'Title',
            id: 'e2qxu74v3',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_3_173bfb6998.jpg?5',
          },
          {
            name: 'Title',
            id: 'kxdp669pp',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_4_17505b57d7.jpg?6',
          },
          {
            name: 'Title',
            id: 'vdhd8f529',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_6_d361577705.jpg?8',
          },
          {
            name: 'Title',
            id: 'x8ojr6deu',
            src: 'https://strapi.merakiweddingplanner.com/uploads/banner_7_53c56bd3e5.jpg?9',
          },
        ],
      },
    },
  },
  fields: [
    {
      label: 'intro',
      name: 'IntroSlider',
      component: 'group',
      description: 'intro',
      fields: [
        createScreenGroup({
          label: 'Title',
          name: 'title',
          component: 'text',
        }),
        createScreenGroup({
          label: 'subTitle',
          name: 'subTitle',
          component: 'text',
        }),
        createScreenGroup({
          label: 'Images',
          name: 'items',
          component: 'group-list',
          description: 'Slider Images',
          itemProps: (item) => ({
            key: item.id,
            label: item.src
              ? item.src.replace(process.env.STRAPI_URL + '/uploads/', '')
              : 'undefined',
          }),
          defaultItem: () => ({
            name: 'Title',
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              label: 'alt',
              name: 'alt',
              component: 'text',
            },
            {
              label: 'Image',
              name: 'src',
              component: 'image',
              // Generate the frontmatter value based on the filename
              parse: (media) =>
                process.env.STRAPI_URL + '/uploads/' + media.filename,

              // Decide the file upload directory for the post
              uploadDir: () => '/',

              // Generate the src attribute for the preview image.
              previewSrc: (fullSrc) => {
                return fullSrc.replace('/uploads/', '/uploads/small_')
              },
            },
          ],
        }),
      ],
    },
    createBlock({
      label: 'quotes',
      name: 'Block1',
      fields: [
        'title',
        'description',
        'text1',
        'text2',
        'text3',
        {
          label: 'image',
          name: 'image.src',
          component: 'image',
        },
      ],
    }),
    createBlock({
      label: 'about us',
      name: 'Block2',
      fields: [
        'title',
        'subTitle',
        'description',
        'url',
        'buttonText',
        {
          label: 'texts',
          name: 'texts',
          component: 'textarea',
        },
        {
          label: 'image',
          name: 'image',
          component: 'image',
        },
      ],
    }),
    createBlock({
      label: 'EXPLORE OUR WEDDINGS',
      name: 'Block3',
      fields: [
        'title',
        'description',
        'url',
        'buttonText',
        // {
        //   label: 'custom gallery',
        //   name: 'customGallery',
        //   component: 'toggle'
        // },
        {
          label: 'images',
          name: 'items',
          itemProps: (item) => ({
            key: item.id,
            label: item.title,
          }),
          component: 'group-list',
          defaultItem: () => ({
            title: 'Boundles Amour',
            subTitle: 'TESS & ANDY',
            url: '/',
          }),
          fields: [
            {
              label: 'title',
              name: 'title',
              component: 'text',
            },
            {
              label: 'subTitle',
              name: 'subTitle',
              component: 'text',
            },
            {
              label: 'url',
              name: 'url',
              component: 'text',
            },
            createImageFieldConfig(),
          ],
        },
      ],
    }),
    createBlock({
      label: 'OUR SERVICES',
      name: 'Block4',
      fields: [
        'title',
        'text',
        'description',
        'url',
        'buttonText',
        {
          label: 'items',
          name: 'items',
          component: 'group-list',
          itemProps: (item) => ({
            key: item.id,
            label: item.title,
          }),
          fields: [
            {
              label: 'title',
              name: 'title',
              component: 'text',
            },
            {
              label: 'description',
              name: 'description',
              component: 'text',
            },
          ],
        },
      ],
    }),
    createBlock({
      label: 'BLOG',
      name: 'Block5',
      fields: [
        'title',
        'description',
        'url',
        'buttonText',
        {
          label: 'image',
          name: 'image',
          component: 'image',
        },
      ],
    }),
    createBlock({
      label: 'KIND WORDS',
      name: 'Block6',
      fields: [
        'title',
        'description',
        'url',
        'buttonText',
        {
          label: 'items',
          name: 'items',
          itemProps: (item) => ({
            key: item.id,
            label: item.title,
          }),
          component: 'group-list',
          defaultItem: () => ({
            title: 'Tess & Andy',
            subTitle: 'NEW ZEALAND / UNITED KINGDOM',
            description:
              '“Xuan and Tu were very attentive and insured our vision came true. They worked with us with great communication, informing us on all details – even if there were things we couldn’t achieve they talked us through reasons and available options. We were so happy to have Xuan and Tu as wedding planners and they became a special part of our wedding and remain our close friends today...”',
          }),
          fields: [
            {
              label: 'title',
              name: 'title',
              component: 'text',
            },
            {
              label: 'title',
              name: 'subTitle',
              component: 'text',
            },
            {
              label: 'description',
              name: 'description',
              component: 'text',
            },
            createImageFieldConfig(),
          ],
        },
      ],
    }),
  ],
}
