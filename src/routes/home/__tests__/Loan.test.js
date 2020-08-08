import {calculateLoanEligibility} from '../../../helpers'

describe('Home', () => {
    it('should display the account balance', () => {
     
        let credits = [{
            period: '07-2020',
            amount: 10
        },
    {
        period: '07-2020',
        amount: 20
    },
    {
        period: '07-2020',
        amount: 30
    },
    {
        period: '07-2020',
        amount: 40
    }]
    expect(calculateLoanEligibility(credits)).toBe(135)
    });

    
});
