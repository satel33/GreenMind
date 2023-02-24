const gql = require('graphql-tag');

const getWebsiteInfo = async (context, params) => {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo;

  const cacheKey = 'API-WEBSITE-INFO-DATA';
  let cached = null;
  if (redisClient && (cached = await redisClient.get(cacheKey))) {
    return cached;
  }

  const response = await apolloClient.query({
    variables: params,
    query: gql`
    query {
      website{
        name
        homepageTitleTag
        homepageMetaDescription
      }
    }`
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient && response.data?.website) {
    redisClient.set(
      cacheKey,
      response,
      ['API-WEBSITE-INFO-DATA']
    );
  }

  return response;
};

module.exports = getWebsiteInfo;
