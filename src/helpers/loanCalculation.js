export const calculateLoanEligibility = (creditArray) => {

	// console.log(creditArray);
	if(creditArray.length < 1) {
		return 0
	}
	let totalAmount = 0;
	creditArray.map(cred => {
		totalAmount = totalAmount + cred.amount; 
	})

	console.log(totalAmount);
	let averageIncome = Math.ceil(totalAmount/creditArray.length);

	console.log(averageIncome);

	let principal = Math.ceil (0.45 * averageIncome * 12);
	console.log(principal);

	return principal;
}

export const formatAccountType = (input) => {
	let splitInput = input.split("_");
	return splitInput.join(' ');
}

export const convertToNaira = (input) => {
	if(!input) return;
	return Number(Number(input)/100).toFixed(2);
}