import ProductStorage from './products.storage';

let products = angular
                .module('mProducts', [])
                .service('ProductStorage', ProductStorage);

export default products = products.name;
