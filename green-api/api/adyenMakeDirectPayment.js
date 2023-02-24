const gql = require('graphql-tag');

const adyenMakeDirectPayment = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
    mutation ($acquirerId: Int!, $reference: String!, $token: String!, $browserInfo: GenericScalar!, $paymentMethod: GenericScalar!) {
      adyenPayments(acquirerId: $acquirerId, transactionReference: $reference, accessToken: $token, browserInfo: $browserInfo, paymentMethod: $paymentMethod) {
        adyenPayments
      }
    }
    `
  });
  return response;
};

module.exports = adyenMakeDirectPayment;
