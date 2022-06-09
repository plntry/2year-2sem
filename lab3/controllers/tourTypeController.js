const {TourType} = require('../models/tourType');

//sends response with all types of tours
exports.getAll = async function (req, res) {
    res.send(await TourType.getAll())
}

//creates new type of tours using data provided in POST
exports.create = async function (req, res) {
    let newTourType = new TourType(req.body.name)
    try {
        await newTourType.save()
    } catch (e) {
        res.send("Error")
        return
    }
    res.send("Success")
}
