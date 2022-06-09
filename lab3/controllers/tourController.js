const {Tour} = require("../models/tour");

//sends response with all tours
exports.getAll = async function (req, res) {
    res.send(await Tour.getAll())
}

//creates new tour using data provided in POST
exports.create = async function (req, res) {
    let newTour = new Tour(req.body.name, req.body.price, req.body.numberOfDays, req.body.tourType, req.body.country)
    try {
        await newTour.save()
    } catch (e) {
        console.log(e)
        res.send("Error")
        return
    }
    res.send("Success")
}

//deletes tour using id provided in POST
exports.delete = async function (req, res) {
    if ((await Tour.deleteByID(req.body.id)).affectedRows){
        res.send("Deleted")
        return
    }
    res.send("No items to delete")
}

//search tour by name provided in route
exports.searchByName = async function (req, res) {
    res.send(await Tour.searchByName(req.params.name))
}
