const req = require('../database/database')

const tableName = 'tour'

class Tour {
    constructor(name, price, numberOfDays, tourType, country, id = -1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.numberOfDays = numberOfDays;
        this.tourType = tourType;
        this.country = country;
    }

    async save() {
        await req.query('INSERT INTO ' + tableName +
            ' (name, price, numberOfDays, tourType, country) VALUES (?,?,?,?,?)',
            [this.name, this.price, this.numberOfDays, this.tourType, this.country])
    }

    static async getAll() {
        return await req.query('SELECT * FROM ' + tableName)
    }
    
    static async deleteByID(id) {
        return await req.query(`DELETE FROM `+tableName+` WHERE id = ?`, id)
    }
 
    static async searchByName(name) {
        return await req.query(`SELECT * FROM `+tableName+` WHERE name = ?`,name)
    }
 
}

module.exports = {Tour}