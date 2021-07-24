import { gql } from "graphql-tag";
export const GET_CATEGORIES = gql `
query {
  categories {
    id
    name
  }
}
`;
export const GET_ALL_PRODUCT = gql `
query {
  products{
    id
    name
    image
  }
}
`;

export const GET_SPECIAL_PRODUCTS = gql `
query($id:ID!) {
  category(id: $id) {
        id
        name
      products {
        id
            name
        }
  }
}
`;
export const GET_SPECIAL_PRODUCT = gql `
query($id:ID!) {
  product(id: $id) {
        id
        name
        image
        size
        color
        details
        description
  }
}
`;