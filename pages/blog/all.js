import { getAllPostsForHome } from '@lib/api';
import { getAppInfo, getBlogPageInfo, getSeoApi } from '@lib/app';
import { fixExcerpt } from '@lib/post';
import { blog_template } from '@templates/blog/Blog';
import Seo from 'meraki/components/Seo';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import Layout from '../../components/layout';
import PostPreview from '../../components/post-preview';
import SourceProvider from '../../providers/source';

const AllBlogPosts = ({ source, preview }) => {
  const { locale } = useRouter();

  // Filter posts based on locale
  const filteredPosts = source.blog.posts.filter(item =>
    item?.node?.categories &&
    JSON.stringify(item?.node?.categories).includes(locale === 'vi' ? 'Vietnamese' : 'English')
  );

  return (
    <SourceProvider source={{ [locale]: source }}>
      <Layout preview={preview}>
        <Seo defaultSeo={{ title: 'All Blog Posts' }} />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-12 lg:gap-y-24 mb-32">
            {filteredPosts.map(({ node }) => {
              const excerpt = fixExcerpt(node);
              return (
                <PostPreview
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage?.node}
                  date={node.date}
                  author={node.author?.node}
                  slug={node.slug}
                  excerpt={excerpt}
                />
              );
            })}
          </div>
        </Container>
      </Layout>
    </SourceProvider>
  );
};

export default AllBlogPosts;

export async function getStaticProps(config) {
  const { galleries, app } = await getAppInfo(config)
  const { blog } = await getBlogPageInfo(config)
  const allPosts = await getAllPostsForHome(config.preview)
  let pageData = blog?.data || blog_template.defaultItem
  if (typeof pageData === 'string') {
    pageData = JSON.parse(pageData)
  }
  const router = {
    locale: config.locale
  }
  const seoInfo = await getSeoApi({
    locale: router.locale,
    router,
    id: '/blog/all',
  })
  const seo = seoInfo?.data || null
  if (typeof seo === 'string') {
    seo = JSON.parse(seo)
  }
  return {
    props: {
      source: {
        blog: {
          posts: allPosts?.edges || []
        },
        galleries, app, data: pageData, seo
      }
    },
    revalidate: 300
  }
} 