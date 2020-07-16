const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const getCatStats = async (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../stats.json'));
        const statsData = JSON.parse(data);
        const catData = statsData.find(cat => cat.id === Number(req.params.id));
        if (!catData) {
            const err = new Error('Cat Not Found');
            err.status = 404;
            throw err;
        }
        res.json(catData);
    } catch (e) {
        next(e);
    }

}

router
    .route('/cats/:id')
    .get(getCatStats);

module.exports = router;