
import Layout from "@components/layout";
import SourceProvider, { useSource } from "@providers/source";
import { createBlock } from "@providers/tinacms/helpers";
import { PAGE_BLOCKS, PAGE_BLOCK_TEMPLATES } from "./blocks";
import Banner, { banner_template } from "./blocks/Banner";

export const Blocks = ({ blocks, placeholder = null }) => {
  const { get } = useSource()
  const data = get('data.blocks')
  if (data.length < 1) return placeholder;
  console.log({ data })
  return data
    ? data.map(function (block, i) {
      console.log({ block, component: blocks[block._template] })
      const BlockComponent = blocks[block._template]
        ? blocks[block._template]
        : null;
      return <BlockComponent key={i} {...block} />;
    })
    : null;
};
const GalleryDetail = ({ source, preview }) => {
  return <SourceProvider source={{
    en: source
  }}>
    <Layout preview={preview}>
      <Banner />
      <div className="space-y-12 py-12">
        <Blocks blocks={PAGE_BLOCKS} placeholder={
          <div className="flex-grow flex items-center justify-center transition duration-150 ease-out text-gray-700 dark:text-gray-100 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 body-font overflow-hidden">
            <p className="opacity-30">
              {`There's nothing here, try adding some page sections.`}
            </p>
          </div>
        } />
      </div>
    </Layout>
  </SourceProvider>

}

const defaultItem = {
  banner: banner_template.defaultItem,
  blocks: Object.keys(PAGE_BLOCK_TEMPLATES).reduce((result = [], item) => {
    console.log({ item: PAGE_BLOCK_TEMPLATES[item] })
    result.push({ _template: item, ...PAGE_BLOCK_TEMPLATES[item].detaultItem })
    console.log({ item: result[result.length - 1] })
    return result
  }, [])
}
export const galleryDetail_template = {
  defaultItem,
  fields: [
    createBlock({
      composeField: item => item,
      label: 'banner',
      name: 'banner',
      itemProps: (item) => ({
        ...item,
        label: item.title
      }),
      fields: banner_template.fiels
    })
    , {
      label: "Page Sections",
      name: "blocks",
      component: "blocks",
      templates: PAGE_BLOCK_TEMPLATES,
    },
  ],
};
export default GalleryDetail