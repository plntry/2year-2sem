const req = require('../database/database')

const tableName = 'country'

class Country {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    async save() {
        await req.query('INSERT INTO ' + tableName +
            ' (name) VALUES (?)',
            [this.name])
    }

    static async getAll() {
        return await req.query('SELECT * FROM ' + tableName)
    }
}

module.exports = {Country}