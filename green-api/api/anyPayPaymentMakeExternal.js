const gql = require('graphql-tag');

const anyPayPaymentMakeExternal = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation($acquirerId: Int!){
        anydayTransaction(acquirerId: $acquirerId){
          transaction
        }
      }
    `
  });
  return response;
};

module.exports = anyPayPaymentMakeExternal;
