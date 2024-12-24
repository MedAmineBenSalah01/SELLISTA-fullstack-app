import gql from 'graphql-tag';


export const UPDATE_PRODUCT_NAME = gql`
  mutation UpdateProductName($id: ID!, $name: String!) {
    updateProductName(id: $id, name: $name) {
      id
      name
    }
  }
`;