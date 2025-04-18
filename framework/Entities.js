const fs = require('fs');

class Entities {
    constructor(collection, schema) {
        this.data = require('./../data/' + collection + '.json');
        this.collection = collection;
        this.schema = schema;
        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) : 0;
    }

    async findAll(predicate) {
        if (!options.where) {
            return this.data[0];
        }
        return this.data.filter(element => this.checkWhereClause(element, options));
    }

    async findOne(options) {
        if (!options.where) {
            return this.data[0];
        }
        return this.data.find(element => this.checkWhereClause(element, options));
    }

    async create(element) {
        try {
            await this.checkFormat(element);
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
            await this.checkFormat(dataToUpdate);
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

    async destroy(options) {
        let count = this.data.length;
        this.data = this.data.filter(element => !this.checkWhereClause(element, options));
        this.save();
        return count - this.data.length;
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

    async checkFormat(dataToCheck) {
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
            if(options.unique){
                if(!await this.checkUnique(property,dataToCheck[property])){
                    throw new Error("Error: property " + property + " must be unique");
                }
            }
        }
        return true;
    }

    async checkUnique(field,value){
        let obj = {};
        obj[field] = value;
        let element = await this.findOne({
            where: obj
        });
        if(element){
            return false;
        }
        return true;
    }
}

module.exports = Entities;