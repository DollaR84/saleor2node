/*
API saleor module for adapter saleor to vue-storefront.

Created on 25.04.2021

@author: Dolovanyuk Ruslan

*/

const { gql } = require('graphql-request');

async function products(endCursor, first=20) {
    const query = gql`
    {
        products(${('' != endCursor) ? 'after: "' + endCursor + '", ' : ''}first: ${first}) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    id
                    name
                    description
                    slug
                }
                cursor
            }
            totalCount
        }
    }
    `;
    return query
}

module.exports.products = products;
