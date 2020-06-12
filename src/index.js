const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
let promotionType = [];
let finalPurchases = [];
let regularPriceTotal = [];
let cart = new Array();

const getShoppingCart = (products, productList) => {
	const selectedItems = products.map(item => productList.filter(product => product.id === item))
	displaysOrder(selectedItems)
	calculetedPurchase(products, productList)

	return {
		products: cart[0],
		promotion: cart[1],
		totalPrice: cart[2],
		discountValue: cart[3],
		discount: cart[4]

	}
}

const displaysOrder = (selectedItems) => {
	let objProducts = selectedItems.map(elem => ({
		name: elem[0].name,
		category: elem[0].category
	}));
	cart.push(objProducts)
	return setPromotion(objProducts)
}

const setPromotion = (objProducts) => {
	let categories = objProducts.map(el => el.category)
	let setPromotion = categories.filter(function (v, i) {
		return i == categories.lastIndexOf(v);
	}).length - 1
	let promotion = promotions[setPromotion]
	promotionType.push(promotion)
	cart.push(promotion)
}

const calculetedPurchase = (products, productsList) => {
	for (let item of products) {
		let orderedProducts = productsList.filter(product => product.id === item)
		let hasDiscount = orderedProducts[0].promotions.filter(product => product.looks.includes(...promotionType))
		let regularPrice = orderedProducts.map(price => price.regularPrice)
		let finalPurchase = !hasDiscount.length ? regularPrice : hasDiscount.map(promotion => promotion.price)

		finalPurchases.push(Number(finalPurchase));
		regularPriceTotal.push(Number(regularPrice))
	}

	let totalPriceWithDiscount = finalPurchases.reduce(function (acc, current) { return acc + current }, 0);
	let discountAmount = regularPriceTotal.reduce((acc, curr) => acc + curr) - totalPriceWithDiscount
	cart.push(totalPriceWithDiscount.toFixed(2), discountAmount.toFixed(2))

	return calculateDiscount(totalPriceWithDiscount)
}

const calculateDiscount = (totalPriceWithDiscount) => {
	let regularPriceAmount = regularPriceTotal.reduce((acc, curr) => acc + curr)
	let deferredAmount = ((regularPriceAmount - totalPriceWithDiscount) * 100 / regularPriceAmount).toFixed(2) + '%'

	cart.push(deferredAmount)
}

module.exports = { getShoppingCart };