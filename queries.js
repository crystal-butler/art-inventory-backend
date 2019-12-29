/*jshint esversion: 6 */

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'inventory',
    host: 'localhost',
    database: 'api',
    password: 'arts_2019',
    port: 5432
});

const getArt = (request, response) => {
    pool.query('SELECT * FROM arts ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const searchArt = (request, response) => {
    const name = request.params.name;
    pool.query('SELECT * FROM arts WHERE name ILIKE $1', ['%' + name + '%'], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getArtByID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM arts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createArt = (request, response) => {
    const { name,
            price,
            image,
            artist,
            gallery,
            yearmade,
            yearbought,
            medium }
        = request.body;
    pool.query('INSERT INTO arts (name, price, image, artist, gallery, yearmade, yearbought, medium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [name, price, image, artist, gallery, yearmade, yearbought, medium],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    response.status(201).send(`Art added with ID: ${results.insertId}`);
                });
};

const updateArt = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, price, image, artist, gallery, yearmade, yearbought, medium } = request.body;
    pool.query(
        'UPDATE arts SET name = $1, price = $2, image = $3, artist = $4, gallery = $5, yearmade = $6, yearbought = $7, medium= $8 WHERE id = $9',
        [name, price, image, artist, gallery, yearmade, yearbought, medium, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Art modified with ID: ${id}`);
        }
    );
};

const deleteArt = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM arts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Art deleted with ID: ${id}`);
    });
};

module.exports = {
    getArt,
    searchArt,
    getArtByID,
    createArt,
    updateArt,
    deleteArt
};