/*
Main runner module for adapter saleor to vue-storefront.

Created on 25.04.2021

@author: Dolovanyuk Ruslan

*/

const { request } = require('graphql-request');

const { saleor, vsf } = require('./api');
const config = require('./config');

async function saleor_products() {
    try {
        let hasNextPage = false;
        let startIndex = 1;
        let endCursor = '';
        console.log('Saleor products:');
        do {
            query = await saleor.products(endCursor);
            data = await request(config.saleor.url, query);
            startIndex = await print_products(data.products.edges, startIndex);
            hasNextPage = data.products.pageInfo.hasNextPage;
            endCursor = data.products.pageInfo.endCursor;
        } while(hasNextPage);
    } catch (error) {
        console.error(error);
    }
}

async function vsf_products() {
    try {
        query = await vsf.service_info();
        data = await request(config.vsf.url, query);
        console.log('VSF products:');
        console.log(`total count = ${data.products.total_count}`);
        let currentPage = 0;
        let countPages = Math.ceil(data.products.total_count/data.products.page_info.page_size);
        let startIndex = 1;
        do {
            query = await vsf.products(currentPage+1);
            data = await request(config.vsf.url, query);
            startIndex = await print_products(data.products.items, startIndex);
            currentPage = data.products.page_info.current_page;
        } while (currentPage <= countPages);
    } catch (error) {
        console.error(error);
    }
}

async function print_products(items, startIndex) {
    let i = 0;
    for (; i<items.length; ++i) {
        console.log(`${startIndex + i}. ${items[i].hasOwnProperty('node') ? items[i].node.name : items[i].name}`);
        console.log(`${items[i].hasOwnProperty('node') ? items[i].node.description : items[i].description}`);
    };
    return startIndex + i
}

async function main() {
    await saleor_products();
    await vsf_products();
}

main();
