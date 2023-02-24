const gql = require('graphql-tag');

const applyGiftCard = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation($promo: String!){
        applyGiftCard(promo: $promo){
          error
        }
      }`
  });
  return response;
};

module.exports = applyGiftCard;
