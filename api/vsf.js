/*
API vue-storefront-api module for adapter saleor to vue-storefront.

Created on 03.05.2021

@author: Dolovanyuk Ruslan

*/

const { gql } = require('graphql-request');

async function service_info() {
    const query = gql`{
        products {
            total_count
            page_info {
                page_size
            }
        }
    }`;
    return query;
}

async function products(currentPage=1, pageSize=20) {
    const query = gql`{
        products(currentPage: ${currentPage}, pageSize: ${pageSize}) {
            items
            page_info {
                current_page
            }
        }
    }`;
    return query;
}

module.exports.service_info = service_info;
module.exports.products = products;
