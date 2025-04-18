const DataTypes = {
    STRING: function(length){
        return "string";
    },
    DECIMAL: function(length, decimal){
        return "number";
    }
}

module.exports = {DataTypes};