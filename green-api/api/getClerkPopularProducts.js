const fetch = require('node-fetch');
const query = require('../customQueries');
const logger = process.winstonLog;

const getClerkPopularProducts = async (context) => {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo;

  const cacheKey = 'API-CLERK-POPULAR';
  let cached = null;
  if (redisClient && (cached = await redisClient.get(cacheKey))) {
    return cached;
  }

  try {
    const data = await fetch('https://api.clerk.io/v2/recommendations/popular?key=CEhYajX1WwY3uAClBKte5UC6qAC6d7W1&limit=8&labels=["Bestsellers"]');

    const json = await data.json();
    const response = await apolloClient.query({
      query: query.greenGetProductListForHomePage,
      variables: { filter: { ids: json.result}},
      errorPolicy: 'all'
    });

    delete response?.data?.cookie;
    if (cacheKey && redisClient && response.data?.products) {
      redisClient.set(
        cacheKey,
        response,
        ['API-CLERK-POPULAR']
      );
    }

    return response;
  } catch (error) {
    logger.error(error);
  }

};

module.exports = getClerkPopularProducts;
