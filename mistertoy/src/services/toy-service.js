
import {
    httpService
} from './http.service.js'


let gFilterBy = null
const TOY_URL = 'toy/'
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyProduct,
    setFilter
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}



function query() {
    if (gFilterBy) {
        const params = {
            byContent: gFilterBy.content,
            byType: gFilterBy.type,
            byCategory: gFilterBy.category}
            const queryString = new URLSearchParams(params).toString();
            return httpService.get(TOY_URL + queryString).then(res => res)
        }
            else return httpService.get(TOY_URL).then(res => res)
    }
        


function getById(id) {
    return httpService.get(TOY_URL+'/details/' + id).then(res => res)

}

function remove(id) {
    return httpService.delete(TOY_URL + id).then(res => res)
}

function save(toy) {
    if (toy._id) {
        console.log('saving');
        return httpService.put(TOY_URL + toy._id, toy)
    } else {
        console.log('adding');
        return httpService.post(TOY_URL, toy)
    }
}

function getEmptyProduct(name = '', price = 100) {
    return {
        _id: '',
        name,
        price,
        type: '',
        createdAt: '',
        inStock: true
    }
}

