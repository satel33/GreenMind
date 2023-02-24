const gql = require('graphql-tag');
const logger = process.winstonLog;

const adyenPaymentMethods = async (context, params) => {
  const apolloClient = context.client.apollo;
  const query = {
    variables: params,
    mutation: gql`
    mutation($acquirerId: Int!){
      adyenPaymentMethods(acquirerId: $acquirerId){
        adyenPaymentMethods
      }
    }`
  };

  try {
    const response = await apolloClient.mutate(query);
    return response;
  } catch (err) {
    logger?.info({
      label: '[API REQUEST ERROR]',
      message: 'Retry 1 mutation adyenPaymentMethods...'
    });
    return await apolloClient.mutate(query);
  }

};

module.exports = adyenPaymentMethods;
