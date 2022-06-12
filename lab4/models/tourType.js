const req = require('../database/database')

const tableName = 'tourType'

class TourType {
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

module.exports = {TourType}