const tourTypes = []
let index = 0

class TourType {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    save() {
        this.id = index
        tourTypes.push(this)
        index++
    }

    static getAll() {
        return tourTypes
    }

    static getByID(id) {
        for (let i = 0; i < tourTypes.length; i++) {
            if (tourTypes[i].id === parseInt(id)) {
                return tourTypes[i]
            }
        }
        return undefined
    }
}

module.exports = {TourType}