const productsList = require('./data/products.json')
const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
let promotionType = [];
let finalPurchases = [];
let regularPriceTotal = [];

const getShoppingCart = (productList, products) => {
	const selectedItems = products.map(item => productsList.products.filter(product => product.id === item))
	const cart = {}

	displaysOrder(selectedItems, cart)
	calculetedPurchase(productList, products, cart)
}

const displaysOrder = (selectedItems, cart) => {
	let objProducts = selectedItems.map(elem => ({
		name: elem[0].name,
		category: elem[0].category
	}));
	Object.assign(cart, {
		products: objProducts
	})
	setPromotion(objProducts, cart)
}

const setPromotion = (objProducts, cart) => {
	let categories = objProducts.map(el => el.category)
	let setPromotion = categories.filter(function (v, i) {
		return i == categories.lastIndexOf(v);
	}).length - 1
	let promotion = promotions[setPromotion]

	Object.assign(cart, {
		promotion: promotion
	})
	promotionType.push(promotion)
}

const calculetedPurchase = (productsList, products, cart) => {
	for (let item of products) {
		let orderedProducts = productsList.products.filter(product => product.id === item)
		let hasDiscount = orderedProducts[0].promotions.filter(product => product.looks.includes(...promotionType))
		let regularPrice = orderedProducts.map(price => price.regularPrice)
		let finalPurchase = !hasDiscount.length ? regularPrice : hasDiscount.map(promotion => promotion.price)

		finalPurchases.push(Number(finalPurchase));
		regularPriceTotal.push(Number(regularPrice))
	}

	let totalPriceWithDiscount = finalPurchases.reduce(function (acc, current) {
		return acc + current;
	}, 0);
	let discountAmount = regularPriceTotal.reduce((acc, curr) => acc + curr) - totalPriceWithDiscount

	Object.assign(cart, {
		totalPrice: totalPriceWithDiscount.toFixed(2),
		discountValue: discountAmount.toFixed(2)
	})

	calculateDiscount(totalPriceWithDiscount, cart)
}

const calculateDiscount = (totalPriceWithDiscount, cart) => {
	let regularPriceAmount = regularPriceTotal.reduce((acc, curr) => acc + curr)
	let deferredAmount = ((regularPriceAmount - totalPriceWithDiscount) * 100 / regularPriceAmount).toFixed(2) + '%'

	Object.assign(cart, {
		discount: deferredAmount
	})

	return cart
}

// getShoppingCart(productsList, [130, 140, 230, 260])

module.exports = { getShoppingCart };