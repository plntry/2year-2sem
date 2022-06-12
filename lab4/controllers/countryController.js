const {Country} = require('../models/country');

//sends response with all countries
exports.getAll = async function (req, res) {
    res.send(await Country.getAll())
}

//creates new country using data provided in POST
exports.create = async function (req, res) {
    let newCountry = new Country(req.body.name)
    try {
        await newCountry.save()
    } catch (e) {
        res.send("Error")
        return
    }
    res.send("Success")
}
