const countries = []
let index = 0

class Country {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    save() {
        this.id = index
        countries.push(this)
        index++
    }

    static getAll() {
        return countries
    }

    static getByID(id) {
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].id === parseInt(id)) {
                return countries[i]
            }
        }
        return undefined
    }
}

module.exports = {Country}