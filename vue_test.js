/*
Main runner module for adapter saleor to vue-storefront.

Created on 30.04.2021

@author: Dolovanyuk Ruslan

*/

const { request, gql } = require('graphql-request');

async function get_products() {
    const query = gql`{
        products(search: "bag", filter: {
            status: {
                in: [0, 1], scope: "default"
            },
            stock: {
                is_in_stock: {eq: true, scope: "default"}
            },
            visibility: {
                in: [3, 4], scope: "default"
            }
        },
        sort: {
            updated_at: DESC
        }) {
            items
            total_count
            aggregations
            sort_fields {
                options {
                    value
                }
            }
            page_info {
                page_size
                current_page
            }
        }
    }`;
    return query;
}

async function main() {
    try {
        let hasNextPage = false;
        do {
            query = await get_products();
            data = await request('http://localhost:8080/graphql/', query);
            console.log(data);
        } while(hasNextPage);
    } catch (error) {
        console.error(error);
    }
}

main()
