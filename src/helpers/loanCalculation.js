export const calculateLoanEligibility = (creditArray) => {

	// console.log(creditArray);
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