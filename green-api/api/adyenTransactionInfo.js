const gql = require('graphql-tag');

const adyenTransactionInfo = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    variables: params,
    query: gql`
    query($reference: String){
      paymentTransaction(reference: $reference) {
        id
        reference
        amount
        currency {
          id
          name
        }
      }
    }`
  });
  return response;
};

module.exports = adyenTransactionInfo;
