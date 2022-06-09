const {Country} = require('./country');
const {TourType} = require('./tourType');

const tours = []
let index = 0

class Tour {
    constructor(name, price, numberOfDays, tourType, country, id = -1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.numberOfDays = numberOfDays;
        this.tourType = tourType;
        this.country = country;
    }

    save() {
        if (TourType.getByID(this.tourType) === undefined) {
            throw "There's no such type of tours"
        }

        if (Country.getByID(this.country) === undefined) {
            throw "There's no such country"
        }

        this.id = index
        tours.push(this)
        index++
    }

    static getAll() {
        return tours
    }

    static getByID(id) {
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].id === parseInt(id)) {
                return tours[i]
            }
        }
        return undefined
    }

    static deleteByID(id) {
        for (let i = 0; i < tours.length; i++) {
             if (tours[i].id === parseInt(id)) {
                tours.splice(id, 1)
                 return true
             }
        }
        return false
     }
 
     static searchByName(name){
         let tempTours = []
         for (let i = 0; i < tours.length; i++) {
             if (tours[i].name === name) {
                tempTours.push(tours[i])
             }
         }
         return tempTours
     }
 
}

module.exports = {Tour}