import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query Products($search: String) {
    products(search: $search) {
      id
      name
      price
      category {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;