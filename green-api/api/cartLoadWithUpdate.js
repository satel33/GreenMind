const gql = require('graphql-tag');
const orderFragment = require('../fragments/orderFragment.ts');

const cartLoadWithUpdate = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      query($updatePrices: Boolean){
        cart(updatePrices: $updatePrices){
          ${orderFragment}
        }
      }`
  });
  return response;
};

module.exports = cartLoadWithUpdate;
