const gql = require('graphql-tag');

const getPaymentAcquirerList = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    variables: params,
    query: gql`
    query {
      paymentAcquirers{
        id
        name
        provider
        displayAs
      }
    }`
  });
  return response;
};

module.exports = getPaymentAcquirerList;
