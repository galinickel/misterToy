const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function addToy(req, res) {
    try {
        let { name, price, type, createdAt, inStock,reviews } = req.body
        let toy = { name, price, type, createdAt, inStock,reviews }
        toy = await toyService.add(toy)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function getToys(req, res) {
    try {
        let byContent = req.params.filter ? req.params.filter.match(/byContent=([^&]*)/) : ''
        let byType = req.params.filter ? req.params.filter.match(/byType=([^&]*)/) : ''
        let byCategory = req.params.filter ? req.params.filter.match(/byCategory=([^&]*)/) : ''        
        let filterBy = {
            content: byContent[1],
            type: byType[1],
            category: byCategory[1]
        }
        if (filterBy.category === 'Family+Friendly') filterBy.category = 'Family Friendly'
        if (filterBy.category === 'All+Toys') filterBy.category = ''
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
        console.log(err);
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy
}