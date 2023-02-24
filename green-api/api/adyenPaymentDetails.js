const gql = require('graphql-tag');

const adyenPaymentDetails = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation($acquirerId: Int!, $reference: String!, $details: GenericScalar!){
        adyenPaymentDetails(acquirerId: $acquirerId, 
          transactionReference: $reference,
          paymentDetails: $details){
          adyenPaymentDetails
        }
      }
    `
  });
  return response;
};

module.exports = adyenPaymentDetails;
