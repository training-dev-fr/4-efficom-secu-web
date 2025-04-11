const Entities = require('./Entities.js');

const define = (collection,schema) => {
    let obj = new Entities(collection,schema);
    return obj;
}


module.exports = {define};