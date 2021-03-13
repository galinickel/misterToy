const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByToy,
    remove,
    update,
    add
}
async function query(filterBy = {}) {
    const sort = _buildSort(filterBy)
    console.log(sort);
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).collation({locale: "en"}).sort(sort).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        console.log(err);
        throw err
    }
}

function _buildSort(filterBy) {
    let sort = {}
    if (filterBy.type === 'Name') 
        sort = {
            name: 1
        
    }
    if (filterBy.type === 'Price:+Low+to+High') 
        sort = {
            price: 1
        
    }
    if (filterBy.type === 'Stock+Availability') sort = {inStock: 1}
    return sort
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.content) {
        const txtCriteria = {
            $regex: filterBy.content,
            $options: 'i'
        }
        criteria.name = txtCriteria
    }
    if (filterBy.category) {
        const categoryCriteria = {
            $regex: filterBy.category,
            $options: 'i'
        }
        criteria.type = categoryCriteria
    }
    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({
            '_id': ObjectId(toyId)
        })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }

}


async function getByToy(toyname) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({
            toyname
        })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyname}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({
            '_id': ObjectId(toyId)
        })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock,
            createdAt: toy.createdAt,
            reviews: toy.reviews
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({
            '_id': toyToSave._id
        }, {
            $set: toyToSave
        })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        let toyToAdd = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock,
            createdAt: new Date().toLocaleDateString()
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}



async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({
            '_id': ObjectId(toyId)
        })
        delete toy.password
        toy.givenReviews = await reviewService.query({
            byToyId: ObjectId(toy._id)
        })
        toy.givenReviews = toy.givenReviews.map(review => {
            delete review.byToy
            return review
        })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}