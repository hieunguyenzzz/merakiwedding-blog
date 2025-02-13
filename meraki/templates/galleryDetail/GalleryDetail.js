import Layout from '@components/layout'
import SourceProvider, { useSource } from '@providers/source'
import { createBlock, createScreenGroup } from '@providers/tinacms/helpers'
import { createGalleryDetailSeo } from 'data/seo'
import { LG } from 'meraki/components/LG'
import Seo from 'meraki/components/Seo'
import { XS } from 'meraki/components/XS'
import { useRouter } from 'next/router'
import { GalleryProvider } from './GalleryContext'
import { PAGE_BLOCKS, PAGE_BLOCK_TEMPLATES } from './blocks'
import Banner, { banner_template } from './blocks/Banner'

export const Blocks = ({ blocks, placeholder = null }) => {
  const { get } = useSource()
  const data = get('data.blocks') || []
  if (data.length < 1) return placeholder
  // console.log({ data })
  return data && data.map
    ? data.map(function (block, i) {
        // console.log({ block, component: blocks[block._template] })
        const BlockComponent = blocks[block._template]
          ? blocks[block._template]
          : null
        return <BlockComponent key={i} {...block} />
      })
    : null
}
const GalleryDetail = ({ source, preview }) => {
  const router = useRouter()
  return (
    <SourceProvider
      source={{
        en: source,
      }}>
      <GalleryProvider>
        <Layout preview={preview}>
          <Seo {...createGalleryDetailSeo(source, router)} />
          <>
            <XS>
              {(get) => (
                <div>
                  <Banner {...get('data.banner')} />
                </div>
              )}
            </XS>
            <LG>
              {(get) => (
                <div>
                  <Banner {...get('data.banner')} />
                </div>
              )}
            </LG>
          </>
          <div className="space-y-2 lg:space-y-3 py-12 max-w-6xl mx-auto">
            <Blocks
              blocks={PAGE_BLOCKS}
              placeholder={
                <div className="flex-grow flex items-center justify-center transition duration-150 ease-out text-gray-700 dark:text-gray-100 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 body-font overflow-hidden">
                  <p className="opacity-30">
                    {`There's nothing here, try adding some page sections.`}
                  </p>
                </div>
              }
            />
            <div className="h-12" />
          </div>
        </Layout>
      </GalleryProvider>
    </SourceProvider>
  )
}

const defaultItem = {
  banner: {
    xs: banner_template.defaultItem,
    lg: banner_template.defaultItem,
  },
  blocks: Object.keys(PAGE_BLOCK_TEMPLATES).reduce((result = [], item) => {
    // console.log({ item: PAGE_BLOCK_TEMPLATES[item] })
    result.push({ _template: item, ...PAGE_BLOCK_TEMPLATES[item].defaultItem })
    // console.log({ item: result[result.length - 1] })
    return result
  }, []),
}
export const galleryDetail_template = {
  defaultItem,
  fields: [
    createScreenGroup(
      createBlock({
        composeField: (item) => item,
        label: 'banner',
        name: 'banner',
        itemProps: (item) => ({
          ...item,
          label: item.title,
        }),
        fields: banner_template.fields,
      })
    ),
    {
      label: 'Page Sections',
      name: 'blocks',
      description: (
        <a
          className="hover:underline"
          target={'_blank'}
          href="/edit/gallery/showcase">
          all layouts : /edit/gallery/showcase
        </a>
      ),
      component: 'longblocks',
      templates: PAGE_BLOCK_TEMPLATES,
    },
  ],
}
export default GalleryDetail
