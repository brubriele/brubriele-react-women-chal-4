const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const productsList = require('./data/products.json')
let mockIds = [120, 230, 230, 230]
let cart = []

const filterId = (productsList) => {
	let list = productsList.products

	for (let el of mockIds) {
		let filtered = list.filter(product => product.id === el)
		listItems(filtered)
	}
}

const listItems = (filtered) => {
	const list = filtered.map(elem => (
		{
			name: elem.name,
			category: elem.category
		}
	));

	cart.push(list)
}

const setPromotion = (cart) => {
	let products = cart.reduce((acc, val) => acc.concat(val), []);
	let categories = products.map(el => el.category);
	let setPromotion = categories.filter(function (v, i) { return i == categories.lastIndexOf(v); }).length - 1
	let promotion = promotions[setPromotion]

	console.log(promotions[setPromotion])
	console.log(products, ',', promotions[setPromotion])
}

filterId(productsList)
setPromotion(cart)


// module.exports = { getShoppingCart };