/*
Config module for adapter saleor to vue-storefront.

Created on 27.04.2021

@author: Dolovanyuk Ruslan

*/

const config = {};

config.saleor = {
    host: 'http://192.168.99.100',
    port: 8000,
    endPoint: 'graphql/',

    get url() {
        return this.host + ':' + this.port + '/' + this.endPoint;
    },
};

config.vsf = {
    host: 'http://localhost',
    port: 8080,
    endPoint: 'graphql/',

    get url() {
        return this.host + ':' + this.port + '/' + this.endPoint;
    },
};

module.exports = config;
