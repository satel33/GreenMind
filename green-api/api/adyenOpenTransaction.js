/* eslint-disable quote-props */
const gql = require('graphql-tag');
const requestIp = require('request-ip');
const logger = process.winstonLog;

const adyenOpenTransaction = async (context, params) => {
  const clientIp = requestIp.getClientIp(context.req);
  const apolloClient = context.client.apollo;
  const query = {
    fetchPolicy: 'no-cache',
    variables: params,
    context: {
      headers: {
        'REMOTE_ADDR': clientIp,
        'X-Real-IP': clientIp
      }
    },
    mutation: gql`
    mutation($acquirerId: Int!){
      adyenTransaction(acquirerId: $acquirerId) {
        transaction
      }
    }`
  };

  try {
    const response = await apolloClient.mutate(query);
    return response;
  } catch (err) {
    logger?.info({
      label: '[API REQUEST ERROR]',
      message: 'Retry 1 mutation adyenAcquirerInfo...'
    });
    return await apolloClient.mutate(query);
  }
};

module.exports = adyenOpenTransaction;
