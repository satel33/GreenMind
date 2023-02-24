const gql = require('graphql-tag');

const getWebsiteLayoutData = async (context) => {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo;

  const cacheKey = 'API-WEBSITE-LAYOUT-DATA';
  let cached = null;
  if (redisClient && (cached = await redisClient.get(cacheKey))) {
    return cached;
  }

  const response = await apolloClient.query({
    query: gql`
    query {
      websiteLayout{
        websiteMenu{
          name
          url
        }
        websiteMegaMenu {
          name
          url
          isFooter
          sequence
          parent {
            name
            url
            isFooter
            sequence
          }
          childs {
            name
            url
            isFooter
            sequence
          }
          images {
            image
            tag
            title
            subtitle
            sequence
            textColor
            buttonText
            buttonUrl
          }
        }
        websiteFooter{
          name
          url
          isFooter
          sequence
          parent {
            name
            url
            isFooter
            sequence
          }
          childs {
            name
            url
            isFooter
            sequence
          }
          images {
            image
            tag
            title
            subtitle
            sequence
            textColor
            buttonText
            buttonUrl
          }
        }
      }      
    }
      `
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient && response.data?.websiteLayout) {
    redisClient.set(
      cacheKey,
      response,
      ['API-WEBSITE-LAYOUT-DATA']
    );
  }

  return response;
};

module.exports = getWebsiteLayoutData;
