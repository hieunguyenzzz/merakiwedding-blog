import Button from '@components/button'
import Container from '@components/container'
import Layout from '@components/layout'
import SourceProvider, { useSource } from '@providers/source'
import {
  createBlock,
  createFields,
  createImageFieldConfig,
} from '@providers/tinacms/helpers'
import { default as classNames, default as classnames } from 'classnames'
import { contactSeo } from 'data/seo'
import get from 'lodash.get'
import { Image } from 'meraki/components/Image'
import { LG } from 'meraki/components/LG'
import Seo from 'meraki/components/Seo'
import { XS } from 'meraki/components/XS'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
const TEST_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_CLIENT_KEY
const DELAY = 1500

const Cover = () => {
  return (
    <div className="relative flex justify-center min-h-screen transition-all -mt-header py-header">
      <div style={{ zIndex: -1 }} className="fixed inset-0">
        <XS>
          {(get) => (
            <div>
              <Image {...get('data.cover.image')} priority />
            </div>
          )}
        </XS>
        <LG>
          {(get) => (
            <div>
              <Image {...get('data.cover.image')} priority />
            </div>
          )}
        </LG>
      </div>
      <div className="z-10 self-end w-full text-6xl leading-snug text-center truncate lg:text-7xl font-kinfolk text-element-1">
        <Container>
          <XS>
            {(get) => (
              <h2 className="self-center py-12">{get('data.cover.title')}</h2>
            )}
          </XS>
          <LG>
            {(get) => (
              <div>
                <div className="flex justify-end">
                  <h2>{get('data.cover.title')}</h2>{' '}
                </div>
              </div>
            )}
          </LG>
        </Container>
      </div>
    </div>
  )
}
const FaqList = () => {
  const { get } = useSource()
  const [active, setActive] = useState({ 0: true })
  const handleItemClick = (key) => {
    setActive({
      [key]: true,
    })
  }
  const questions = get('data.faqs.questions', [])
  return (
    <>
      <XS>
        {() => (
          <div>
            {questions.map((item, i) => {
              return (
                <div
                  tabIndex="-1"
                  key={i}
                  className="bg-[#fffdfb] odd:bg-[#ede9e4] group focus:pointer-events-none">
                  <div
                    onMouseEnter={() => {
                      handleItemClick(i)
                    }}
                    className="flex w-full p-3 pointer-events-auto group-focus:pointer-events-none">
                    <div className="self-start p-3 py-1">{i + 1}.</div>
                    <div className="flex-1 px-3 py-1 whitespace-pre-line">
                      {item.title}
                    </div>
                    <div className="self-end p-3 py-1">
                      <div>
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="h-0 mt-0 overflow-hidden transition-all duration-300 ease-in-out pointer-events-auto group-focus:h-auto group-focus:mt-5">
                    <div
                      className="invisible h-0 p-3 -mt-10 overflow-hidden text-justify transition-all duration-700 ease-in-out transform opacity-0 pb-7 group-focus:opacity-100 group-focus:h-auto group-focus:block group-focus:visible"
                      dangerouslySetInnerHTML={{ __html: item.content }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </XS>
      <LG>
        {() => (
          <div>
            <div className="flex justify-center space-x-20 text-left">
              <ol className="max-w-md">
                {questions.map((item, i) => {
                  return (
                    <li key={i}>
                      <div
                        onMouseEnter={() => {
                          handleItemClick(i)
                        }}
                        className={classnames(
                          'flex w-full p-3 px-5 focus:border-gray-300 border border-transparent rounded-lg',
                          {
                            'font-semibold': active[i],
                          }
                        )}>
                        <div className="flex-1 whitespace-pre-line">
                          {i + 1}. {item.title}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
              <div className="max-w-md py-12">
                {questions
                  .filter((_, i) => active[i])
                  .map((item, i) => {
                    return (
                      <div key={i} className="relative">
                        <div className="space-y-2 animated fadeIn faster">
                          <div className="text-xl italic font-semibold font-garamond">
                            {item.title}
                          </div>
                          <div
                            className="text-justify"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </LG>
    </>
  )
}
const Blocks = () => {
  const { get } = useSource()
  const [state, setState] = useState({
    callback: 'not fired',
    value: null,
    load: false,
    expired: 'false',
  })
  const recaptchaRef = React.createRef()
  useEffect(() => {
    setState({
      load: true,
    })
  }, [])
  const handleChange = (value) => {
    console.log('Captcha value:', value)
    setState({ ...state, value })
    // if value is null recaptcha expired
    if (value === null) setState({ ...state, expired: 'true' })
  }
  const asyncScriptOnLoad = () => {
    setState({ ...state, callback: 'called!' })
    console.log('scriptLoad - reCaptcha Ref-', recaptchaRef)
  }
  const { value, callback, load, expired } = state
  console.log({ state })
  return (
    <div>
      <Container>
        <div
          className="w-full max-w-xl px-6 py-12 mx-auto text-center lg:text-left lg:px-20 lg:max-w-6xl lg:flex lg:space-x-20"
          style={{
            backgroundColor: '#fdf6f0',
          }}>
          <div className="max-w-xs mx-auto">
            <h3 className="text-3xl italic font-semibold font-garamond">
              {get('data.cover.description.xs')}
            </h3>
            <div
              className="leading-relaxed text-justify"
              dangerouslySetInnerHTML={{
                __html: get('data.cover.content.xs'),
              }}></div>
            <div className="mt-2 font-semibold">
              {get('app.data.email', 'info@merakiweddingplanner.com')}
            </div>
            <div className="h-6" />
            <div className="flex items-center justify-center lg:hidden">
              <div className="relative w-16 h-16">
                <Image
                  src="/home/icons/web-homepage-icons-02.png"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="h-12" />
          </div>
          <form
            action="/api/contact"
            method="GET"
            className="grid gap-6 xl:grid-cols-2">
            {Object.values(get('data.form', {})).map((item) => (
              <Input
                key={item.name}
                {...item}
                required={requiredFields.includes(item.name)}></Input>
            ))}

            {load && (
              <div className="xl:col-span-2">
                <ReCAPTCHA
                  style={{ display: 'inline-block' }}
                  theme="light"
                  ref={recaptchaRef}
                  sitekey={TEST_SITE_KEY}
                  onChange={handleChange}
                  asyncScriptOnLoad={asyncScriptOnLoad}
                />
              </div>
            )}
            <div className="xl:col-span-2">
              <Button
                disabled={!value}
                className={!value ? 'opacity-50 pointer-events-none' : ''}
                style={{ minWidth: '120px' }}
                size={'large'}
                type="submit">
                {get('data.buttonText')}
              </Button>
            </div>
          </form>
        </div>
      </Container>
      <div className="py-12 mt-20" style={{ backgroundColor: '#fdf6f0' }}>
        <Container>
          <div className="max-w-2xl mx-auto space-y-8 text-center lg:max-w-none">
            <h3 className="text-5xl italic font-garamond">
              {get('data.faqs.title')}
            </h3>
            <FaqList />
          </div>
        </Container>
      </div>
    </div>
  )
}
const Contact = ({ source, preview }) => {
  const contactRef = useRef()
  const router = useRouter()
  const { posted } = router.query
  // console.log({ posted })
  const [hidePosted, setHidePosted] = useState(false)
  useEffect(() => {
    if (posted) {
      window.umami?.track('contact_us', {
        form_type: 'contact',
        location: 'contact_page'
      });
    }
  }, [posted])
  useEffect(() => {
    let scroller = false
    const handleScroll = function (e) {
      scroller = true
      document.removeEventListener('scroll', handleScroll)
    }
    document && document.addEventListener('scroll', handleScroll)
    const timmer = setTimeout(() => {
      !scroller &&
        contactRef &&
        contactRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
    }, 2000)
    return () => {
      clearTimeout(timmer)
    }
  }, [])
  return (
    <SourceProvider
      source={{
        en: source,
      }}>
      <Layout preview={preview}>
        <Seo defaultSeo={contactSeo} />
        {posted && !hidePosted && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-12 space-y-6 bg-black bg-opacity-70">
            <div className="flex flex-col items-center justify-center w-full p-12 space-y-6 text-center bg-white max-w-prose">
              <div className="text-3xl font-kinfolk">
                {get(source, 'data.successModal.title', 'Thank you')}
              </div>
              <div className="">
                {get(
                  source,
                  'data.successModal.message',
                  'Your infomation had been sent'
                )}
              </div>
              <Button onClick={() => setHidePosted(true)} size="large">
                {get(source, 'data.successModal.closeText', 'Close')}
              </Button>
            </div>
          </div>
        )}
        <Cover />
        <div ref={contactRef}>
          <Blocks />
        </div>
      </Layout>
    </SourceProvider>
  )
}

// Form
const Input = ({ name, label, description, layout, inputType, required }) => {
  let inputElement = null
  switch (inputType) {
    case 'textarea':
      inputElement = (
        <textarea
          required={required}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 appearance-none bg-element-2"
          name={name}
        />
      )
      break

    default:
      inputElement = (
        <input
          required={required}
          className="block w-full px-3 py-2 border border-gray-300 appearance-none bg-element-2"
          name={name}
        />
      )
      break
  }
  return (
    <div
      className={classNames(
        'flex flex-col w-full',
        layout === inputLayouts.block ? 'xl:col-span-2' : ''
      )}>
      <label className="items-end mb-2 text-sm font-semibold uppercase xl:h-12 xl:flex font-sweetsans">
        {label}
      </label>
      {inputElement}
      {description && (
        <div className="overflow-hidden text-sm text-gray-400 whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  )
}

const inputLayouts = {
  block: 'BLOCK',
  inline: 'INLINE',
}

const input_template = {
  defaultItem: {
    name: 'name',
    label: 'label',
    description: 'description',
    inputType: 'text',
    layout: inputLayouts.block,
  },
  fields: createFields([
    'label',
    {
      name: 'description',
      component: 'textarea',
    },
    'inputType',
    'layout',
    'required',
  ]),
}

const createInputField = ({
  name,
  label,
  description,
  inputType,
  layout,
  required,
}) => {
  const defaultItem = {
    ...input_template.defaultItem,
    name,
    label,
    description,
    inputType,
    required,
    layout,
  }
  return {
    name,
    component: 'group',
    description: `${label || name} - ${description}`,
    itemProps: (item, i) => {
      return {
        key: item.name,
        label: item.label || item.name,
      }
    },
    defaultItem,
    fields: input_template.fields.map((item) => ({
      ...item,
    })),
  }
}
const requiredFields = ['firstname', 'lastname', 'email', 'coupleName']
const formFields = [
  createInputField({
    name: 'firstname',
    label: 'Your name',
    description: 'first name',
    required: true,
  }),
  createInputField({
    name: 'lastname',
    description: 'last name',
    required: true,
  }),
  createInputField({
    name: 'position',
    label: `i'm a...`,
    description: `Bride/Groom
    Mother of bride/groom
    Friend of bride/groom
    Other`,
  }),
  createInputField({
    name: 'coupleName',
    label: `Couple's name/Fiancé's name`,
  }),
  createInputField({
    name: 'email',
    label: 'Email address',
    layout: inputLayouts.block,
    required: true,
  }),
  createInputField({
    name: 'phone',
    label: 'Phone number',
    description: `(we won't call, just in case of a mistaken with your email address)`,
  }),
  createInputField({
    name: 'address',
    label: 'Current Location',
  }),
  createInputField({
    name: 'weddingDate',
    label: 'Wedding date',
    description: '(DD/MM/YY)',
  }),
  createInputField({
    label: 'Wedding venue/city',
    name: 'weddingVenue',
  }),
  createInputField({
    label: 'Approximate guest count',
    layout: inputLayouts.block,
    name: 'approximate',
  }),
  createInputField({
    layout: inputLayouts.block,
    name: 'budget',
    label: 'Estimated budget',
    description:
      ' (Though our service fee is not based on the percentage of your budget, it is essential to determine if your level of assistance required will fit in your budget)',
  }),
  createInputField({
    layout: inputLayouts.block,
    name: 'ref',
    label: 'How did you hear about us?',
    description: 'Google /Facebook /Instagram /Referral /Other',
  }),
  createInputField({
    layout: inputLayouts.block,
    label: 'Details/Anything else we should know?',
    inputType: 'textarea',
    name: 'moreDetails',
    description:
      '(How did you meet? How and when you got engaged? How do you describe your dream wedding?)',
  }),
]

//faqs
const faqs = [
  {
    title: 'How many members of Meraki will be on-site on the wedding day?',
    content:
      'On the day-of, Meraki will have 4 coordinators to follow-up with all vendors, manage every possible problem that could occur and deploy the wedding program, ensuring everything goes as planned.',
  },
  {
    title: 'What are the strengths of Meraki?',
    content:
      'We pay attention to every detail of the wedding so that everybody can enjoy it to the fullest. Most importantly, we are an independent consultant. Hence, our recommendations are unbiased and are fully personalized. ',
  },
  {
    title: 'How much time do I need to plan a wedding?',
    content:
      'Local weddings can be prepared from 6 to 9 months while destination weddings require an extra time, from 12 to 18 months. There is more work that needs to be done including traveling, searching for ideas, noticing guests ahead of time, cooperating with the destination vendors and executing optimization. ',
  },
  {
    title: 'How do I start preparing for my wedding?',
    content:
      'Instead of focusing on the detailed work, take your time to visualize the bigger picture - your dream wedding, from the location to the style, colors or activities. Talk to your partner about what you both value the most in your wedding. It will help you get in the right direction from the very first day.',
  },
  {
    title: 'How to set a reasonable budget for my wedding?',
    content:
      "Every wedding is different. Your wedding budget relies on all the factors of your dream wedding, from what you value the most to your least interest. For instance, some couples would go crazy for the decoration but some just want to serve the best catering to their beloved guests. So, the first step that we suggest is to identify your maximum budget, how much you are willing to pay for everything. Then go backward from it. Typically, food and beverage would take approximately 40% of the whole wedding expenses. And don't forget to save 3-5% of the budget for the additional expenses. There's always an additional cost from the planning process and you don't want to cross your budget limit.",
  },
  {
    title: 'When is the best time to have an outdoor wedding in Vietnam?',
    content:
      'The rainy season in Central Vietnam is from September to December and in South Vietnam is from May to November, so outdoor weddings are not recommended at this moment. The best season for outdoor weddings in Vietnam is from December to April,when  the weather is temperate with a lower risk of rain or super high-heat or humidity.  If you have your heart set on an outdoor wedding, these months are your best bet.',
  },
  {
    title:
      'What is the role of the bride and groom in the wedding preparation process when having a wedding planner?',
    content:
      "Depending on your planning package, the amount of time you need to invest in the wedding will vary. However, your most important task is to review and give decisions upon Meraki's suggestions. Other than that, you will need to work together with your fiancé to set a budget, write your wedding vows, make sure your both family complies with a guest list and choose people to attend your wedding party.",
  },
]

const faqItems_template = {
  fields: createFields([
    'title',
    {
      name: 'content',
      label: 'content',
      component: 'html',
    },
  ]),
}
const faqs_template = {
  defaultItem: {
    title: 'faqs',
    questions: faqs.map(({ title, content }) => {
      return {
        title,
        content: `<p>${content}</p>`,
      }
    }),
  },
  fields: createFields([
    'title',
    {
      name: 'questions',
      lable: 'questions',
      component: 'group-list',
      itemProps: (item, i) => ({ key: i, label: item.title }),
      fields: faqItems_template.fields,
    },
  ]),
}
export const contact_template = {
  // label: "Hero",
  defaultItem: {
    successModal: {
      title: 'Thank you',
      message: 'Your infomation had been sent',
      closeText: 'Close',
    },
    cover: {
      title: {
        xs: 'Contact us',
      },
      description: {
        xs: 'Congratulations on the engagement!',
      },
      content: {
        xs: `<p>Now is the fun part of planning your
        wedding and we can't wait to spend those
        precious moments with you and your fiancé.</p>
        <p>Kindly drop us a line so we can best assist
        you and we'll get back to you shortly. If you
        need further assistance, please shoot us an
        email directly at:</p>
        `,
      },
      image: {
        xs: {
          src: '/contact-banner-mobile.jpg',
          alt: 'Meraki wedding planner',
        },
        lg: {
          src: '/_DSC3741.jpg',
          alt: 'Meraki wedding planner',
        },
      },
    },
    form: formFields
      .map((item) => item.defaultItem)
      .reduce((result, item) => {
        result[item.name] = item
        return result
      }, {}),
    buttonText: 'send',
    faqs: faqs_template.defaultItem,
  },
  fields: [
    createBlock({
      label: 'cover',
      name: 'cover',
      fields: [
        'title',
        'description',
        {
          name: 'content',
          label: 'content',
          component: 'html',
        },
        createImageFieldConfig(),
      ],
    }),
    {
      name: 'form',
      label: 'contact form',
      component: 'group',
      fields: formFields,
    },
    {
      name: 'buttonText',
      label: 'send button text',
      component: 'text',
    },
    {
      name: 'faqs',
      label: 'faqs',
      component: 'group',
      fields: faqs_template.fields,
    },
    createBlock({
      label: 'success contact modal',
      name: 'successModal',
      fields: ['title', 'message', 'closeText'],
    }),
  ],
}
export default Contact
