const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// get all

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    return res.send(customers);
});

//get 1 by id

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) res.status(404).send('There is no such customer');

    return res.send(customer);
});


// put 1

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, isGold: req.body.isGold, number: req.body.number }, 
        { new:true } );
    if(!customer) res.status(404).send('There is no such customer');

    return res.send(customer);
});

// post 1

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        number: req.body.number
    });

    res.send(await customer.save());

});


// delete 1 by id

router.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) res.status(404).send('There is no such customer');

    res.send(customer);
});

module.exports = router;