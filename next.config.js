module.exports = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: [
      'merakiweddingplanner.com',
      'strapi.merakiweddingplanner.com',
      'res.cloudinary.com',
      'imageproxy.hieunguyen.dev',
      'scontent.cdninstagram.com',
      'cdninstagram.com',
      'scontent-mrs2-2.cdninstagram.com',
      'image-proxy.ngohoanglongptit8635.workers.dev',
    ],
    deviceSizes: [640, 828, 1200, 1921],
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
    STRAPI_URL: process.env.STRAPI_URL,
    HOST: process.env.HOST,
  },
}
