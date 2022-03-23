const app = document.getElementById('app');
const error = document.getElementById('error');
const list = document.getElementById('list');

const amount = document.getElementById('amount');
const bid = document.getElementById('bid');
const percent = document.getElementById('percent');
const save = document.getElementById('save');

let bids = [];
let errorHave = false;

function render() {

	if(amount.value && bid.value && percent.value) {
		errorHave = false;
		bids = [];

		list.innerHTML = steps(+amount.value, +bid.value, +percent.value).join(' ')
	} else {
		errorHave = true
	}

	if(errorHave) {
		error.innerHTML = '<h1 class="error">ERROR сука!!! заполни все поля</h1>'
	} else {
		error.innerHTML = ''
	}
}

function steps(amount, bid, percent) {
	let steps = [];
	let count = 0;

	while(amount >= bid) {
		let calculations = resultAfterBid(amount, bid, percent);

		steps.push(`<li>${++count}) ${amount} . <strong>${bid}</strong> | ${calculations.negative} | ${calculations.positive}</li>`)

		amount = calculations.negative

		bids.push(bid);
		bid = newBid(bid);
	}

	return steps
}

function resultAfterBid(amount, bid, percent) {
	let result = {
		positive: null,
		negative: null
	} 

	result.positive = (amount - bid) + bid * percent
	result.negative = amount - bid

	return result
}

function newBid(bid) {
	let result = 0;

	console.log(save.checked)
	if(save.checked) {
		for(let item of bids) {
			result += item * 1.5
		}	
	} else {
		for(let item of bids) {
			result += item
		}	
	}

	return result * 2
}
