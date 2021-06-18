import { fetchGraphql } from "react-tinacms-strapi";

export const fetcher = async ({
  url = process.env.STRAPI_URL,
  query,
  variables
}) => {
  const result = await fetchGraphql(
    url,
    query,
    variables
  )
  const { data, errors } = result

  if (errors) {
    console.error(errors);
    throw new Error(JSON.stringify(errors))
  }
  return data
}

export const getAppInfo = async ({
  locale,
}) => {
  return await fetcher(
    {
      query: `query getAppInfo($locale:String){
        app(locale: $locale){
          data
        }
        galleries(locale: $locale){
          title
          locale
          couples
          slug
          photo{
            url
            alternativeText
          }
        }
      }`,
      variables: {
        locale
      }
    }
  )
}

export const getBlogPageInfo = async ({
  locale,
}) => {
  return await fetcher(
    {
      query: `
        query getBlogPageInfo($locale:String){
          blog(locale: $locale){
            data
          }
        }
      `
      , variables: {
        locale
      }
    }

  )
}

export const getKindWordsPageInfo = async ({
  locale,
}) => {
  const { kindWord } = await fetcher(
    {
      query: `
        query getPageInfo($locale:String){
          kindWord(locale: $locale){
            data
          }
        }
      `
      , variables: {
        locale
      }
    }

  )
  return kindWord
}

export const getContactPageInfo = async ({
  locale,
}) => {
  const { contact } = await fetcher(
    {
      query: `
        query getPageInfo($locale:String){
          contact(locale: $locale){
            data
          }
        }
      `
      , variables: {
        locale
      }
    }

  )
  return contact
}
export const getPageInfoBySlug = async ({
  locale,
  slug
}) => {
  const { pages } = await fetcher(
    {
      query: `
        query getPageInfo($locale:String $slug:String){
          pages(locale: $locale where:{slug: $slug}){
            id
            title
            slug
            data
            locale
          }
        }
      `
      , variables: {
        locale,
        slug
      }
    }
  )
  return pages && pages[0]
}
export const getGalleryPageInfo = async ({
  locale,
}) => {
  return getPageInfoBySlug({ locale, slug: "gallery" })
}