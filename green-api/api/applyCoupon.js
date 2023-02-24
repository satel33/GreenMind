const gql = require('graphql-tag');

const applyCoupon = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation($promo: String!){
        applyCoupon(promo: $promo){
          error
        }
      }`
  });
  return response;
};

module.exports = applyCoupon;
