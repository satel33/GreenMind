const gql = require('graphql-tag');

const makeGiftCardPayment = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation{
        makeGiftCardPayment{
          done
        }
      }`
  });
  return response;
};

module.exports = makeGiftCardPayment;
