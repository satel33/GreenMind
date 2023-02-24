const products = `
query {
  products(pageSize: 1500) {
    totalCount
    products {
      slug
    }
  }
}

`;

const categories = `
query {
  categories(pageSize:1000){
    categories{
      slug
    }
  }
}

`;

export { products, categories };
