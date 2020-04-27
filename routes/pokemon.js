const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
})

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    (id > 0 && id < 723) ?
    res.status(200).json(await db.query("SELECT * FROM pokemon WHERE pok_id = " + id))  :
    res.status(404).json({code: 1, message: "Pokemon no encontrado"});
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_name = '${name.toUpperCase()}'`);
    (pkmn.length > 0) ? 
    res.status(200).send(pkmn) :
    res.status(404).json({code: 1, message: "Pokemon no encontrado"});
})

module.exports = pokemon;