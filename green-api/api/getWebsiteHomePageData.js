const gql = require('graphql-tag');

const getWebsiteHomePageData = async (context) => {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo;

  const cacheKey = 'API-WEBSITE-HOMEPAGE-DATA';
  let cached = null;
  if (redisClient && (cached = await redisClient.get(cacheKey))) {
    return cached;
  }

  const response = await apolloClient.query({
    query: gql`
      query {
        websiteHomepage {
          websiteHomepagePopularTitle{
            title
          }
          websiteHomepageHeroBanner {
            title
            imageDesktop
            imageMobile
            buttonText
            buttonUrl
            titleColor
          }
          websiteHomepageHighlight {
            title
            image
          }
          websiteHomepageBanner {
            size
            title
            subtitle
            miniTitle
            imageDesktop
            imageMobile
            buttonText
            buttonUrl
            titleColor
          }
          websiteHomepageNotice{
            title
            image
          }
        }
      }
      `
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient && response.data?.websiteHomepage) {
    redisClient.set(
      cacheKey,
      response,
      ['API-WEBSITE-HOMEPAGE-DATA']
    );
  }

  return response;
};

module.exports = getWebsiteHomePageData;
