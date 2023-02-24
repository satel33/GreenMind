module.exports = `
parent {
    id
    name
    slug
    parent {
      id
      name
      slug
      parent {
        id
        name
        slug
        parent {
          id
          name
          slug
          parent {
            id
            name
            slug
            parent {
              id
              name
              slug
            }
          }
        }
      }
    }
  }`;
