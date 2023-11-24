
const express = require('express');
require('./Dbconnect');
const hbs=require('hbs')
const Park = require('./models/park');
const bodyParser=require('body-parser');   //may remove
const app = express();
const path = require('path');
const encoder=bodyParser.urlencoded()
app.set('views', './views'); // Set the views directory to './views'
app.set("view engine","hbs")
const partialPath=path.join(__dirname,"./views/partials")
hbs.registerPartials(partialPath)
const staticPath=path.join(__dirname,"./views/public")
app.use(express.static(staticPath))

// const mongoose = require('mongoose');
// const path=require('path');                 //may remove


// Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Get parked vehicles
app.get('/', async (req, res) => {
    try {
      const parkedVehicles = await Park.find();
      res.render('index', { data: parkedVehicles });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving parked vehicles');
    }
  });
  
  app.get('/add', (req, res) => {
    res.render('add');
  });
  
  app.post('/add', async (req, res) => {
    try {
        console.log(req.body);
       const newPark = new Park({
        Car_Registration_number: "1234",
        Owner: "Govind",
        Arrival: "23-12-3212 15:21",
        Departure: "24-12-3212 15:21",
        // vehicleType: req.body.vehicleType
      });
  
      await newPark.save();
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding parking slot');
    }
  });
  
  app.get('/deleteSlot/:id', async (req, res) => {
    try {
      await Park.deleteOne({ _id: req.params.id });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting parking slot');
    }
  });
  
  app.get('/updateSlot/:id', async (req, res) => {
    try {
      const parkToUpdate = await Park.findById(req.params.id);
      if (!parkToUpdate) {
        return res.status(404).send('Parking slot not found');
      }
  
      res.render('update', { data: parkToUpdate });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving parking slot');
    }
  });
  
  app.post('/updateSlot/:id', async (req, res) => {
    try {
      const updatedPark = await Park.findByIdAndUpdate(req.params.id, {
        carRegistrationNumber: req.body.carRegistrationNumber,
        owner: req.body.owner,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        // vehicleType: req.body.vehicleType
      });
  
      if (!updatedPark) {
        return res.status(404).send('Parking slot not found');
      }
  
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating parking slot');
    }
  });
  
  app.listen(3050, () => console.log('Server started on port 3050'));