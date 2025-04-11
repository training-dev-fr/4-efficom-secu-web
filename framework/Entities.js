const fs = require('fs');

class Entities {
    constructor(collection, schema) {
        this.data = require('./../data/' + collection + '.json');
        this.collection = collection;
        this.schema = schema;
        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) : 0;
    }

    async findAll(predicate) {
        return this.data;
    }

    async findOne(options) {
        if (!options.where) {
            return this.data[0];
        }
        return this.data.find(element => checkWhereClause(element, options));
    }

    async create(element) {
        try {
            this.checkFormat(element);
        } catch (e) {
            throw e;
        }
        const newElement = {
            ...element,
            id: ++this.currentId
        };
        this.data.push(newElement);
        this.save();
        return newElement;
    }

    async updateOne(dataToUpdate, options) {
        try {
            this.checkFormat(dataToUpdate);
        } catch (e) {
            throw e;
        }
        let element = await findOne(options);
        if (!element) {
            throw new Error("utilisateur non trouvé");
        }
        for (let [property, value] of Object.entries(dataToUpdate)) {
            element[property] = value;
        }
        this.save();
        return element;
    }

    async destroy(predicate) {

    }

    checkWhereClause(element, options) {
        let result = true;
        for (let [field, value] of Object.entries(options.where)) {
            if (typeof element[field] === 'number') {
                value = parseInt(value);
            }
            result &= element[field] === value;
        }
        return result;
    }

    save() {
        fs.writeFileSync('./data/' + this.collection + '.json', JSON.stringify(this.data));
    }

    checkFormat(dataToCheck) {
        for (let [property, value] of Object.entries(dataToCheck)) {
            if (!this.schema[property]) {
                throw new Error("Error: property " + property + " does not exist on " + this.collection);
            }
        }
        for (let [property, options] of Object.entries(this.schema)) {
            if (options.type) {
                if (typeof dataToCheck[property] !== options.type) {
                    throw new Error("Error: property " + property + " must be of type " + options.type);
                }
            }
        }
        return true;
    }
}

module.exports = Entities;