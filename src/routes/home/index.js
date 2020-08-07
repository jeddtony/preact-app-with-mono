import { h } from 'preact';
import {useState, useEffect, useReducer} from 'preact/hooks';
import ReactNumber from 'react-number-format';
import * as api from '../../api/api';
import {getCode, setId, getLoanAmount} from '../../helpers';
import moment from 'moment';
import logo from '../login/mono-logo.png';

const style = {
	redBackground: {
		backgroundColor: '#D94F00',
		color: '#fff'
	},
	whiteText: {
		
	},

	textAlignRight: {
		textAlign: 'right'
	}
}


const Home = () => {

	const [userDetail, setUserDetail] = useState({});
	const [transferHistory, setTransferHistory] = useState([])

	const [credits, setCredits] = useState([]);
	const [debits, setDebits] = useState([]);

	const [selectedTab, setSelectedTab] = useState({value: 'all'})
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	
	const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue.amount);

	const calculateLoanEligibility = (creditArray) => {

		// console.log(creditArray);
		let totalAmount = 0;
		creditArray.map(cred => {
			totalAmount = totalAmount + cred.amount; 
		})
		// let reducedArray = creditArray.reduce(reducer);

		console.log(totalAmount);
		let averageIncome = Math.ceil(totalAmount/creditArray.length);

		console.log(averageIncome);

		let principal = Math.ceil (0.45 * averageIncome * 12);
		console.log(principal);

		return principal;
	}

	
	useEffect(() => {
		let code = getCode();
		let data ={code}

		const fetchUser = async() => {
			// console.log('fetching user');
			let results = await api.postAuth(data);

			let {statusCode} = results;

			if(statusCode === 200) {
				let userId = results.data.id;

				setId(userId);
				
				let accountResults = await api.getAccountDetails(userId);
				let {data} = accountResults;
				// setUserDetail({...data});

				let accountHistory = await api.getTransferHistory(userId);
				
				// console.log(accountHistory.data.data);
				let accountHistoryData = accountHistory.data.data;

				let getTen = accountHistoryData.slice(0, 10);
				setTransferHistory(getTen);

				// let transactionHistory = await api.getTransactionHistory(userId);
				
				let creditHistory = await api.getCredits(userId);

				let eligibleAmount = calculateLoanEligibility(creditHistory.data.history);

				setUserDetail({...data, eligibleAmount})
				getTen = creditHistory.data.history.slice(0, 10);
				setCredits(getTen);

				let debitHistory = await api.getDebits(userId);
				getTen = debitHistory.data.history.slice(0, 10);
				setDebits(getTen);

				setIsLoading(false);
			}
			else{
				setIsLoading(false);
				setIsError(true);
			}
			// console.log(results)


		}
		fetchUser()
		return () => [credits, debits, transferHistory]
	}, [])


	const toggleSelected = (value) => {
		
		switch (value) {
			case 'all':
				setSelectedTab({...selectedTab, value: 'all'})
				break;
		
				case 'credit':
				setSelectedTab({...selectedTab, value: 'credit'})
				break;

				case 'debit':
					setSelectedTab({...selectedTab, value: 'debit'})
					break;
			default:
				break;
		}
	}
	return(
	<div className="container" >
		
	<div className="row" style={{backgroundColor: 'rgb(18, 43, 69)', height: '100%', color: '#FFF'}}>

	<div className="col-12 col-sm-12 col-md-12 col-xl-12 my-3">
		<img src={logo} style={{width: '100px', height: '20px'}}/>
		</div>

		<div className="col-12 col-sm-12 col-md-6 col-xl-6 my-3">
			<p><strong>{userDetail.type}</strong><br />
			{userDetail.accountNumber} <br/>
			{userDetail.name}</p>
			<p>Amount Requested: 
			<ReactNumber
        value={Number(getLoanAmount()).toFixed(2)}
        displayType={'text'}
        thousandSeparator={true}
		prefix={'₦'}
		// style={{fontSize: '15px'}}
    />
			</p>
		</div>


		<div className="col-12 col-sm-12 col-md-6 col-xl-6" style={style.textAlignRight}>
			<p>Account Balance<br />
			<ReactNumber
        value={Number(userDetail.balance).toFixed(2)}
        displayType={'text'}
        thousandSeparator={true}
		prefix={'₦'}
		style={{fontSize: '25px'}}
    />
	<br />
	Eligible Amount:<ReactNumber
        value={Number(userDetail.eligibleAmount).toFixed(2)}
        displayType={'text'}
        thousandSeparator={true}
		prefix={'₦'}
		style={{fontSize: '15px'}}
    />
	</p>
	
	
		</div>
	</div>

	
	
	<div className="d-flex justify-content-center py-5">
		<div className="btn-group btn-group-lg" role="group" ariaLabel="Toolbar with button groups">
			<button type="button"  class={`btn btn-outline-primary ${(selectedTab.value === 'all')? 'active': ''}`} onClick={()=> toggleSelected('all')}>All</button>
			<button type="button" class="btn btn-outline-primary" onClick={()=> toggleSelected('credit')}>Credit</button>
			<button type="button" class="btn btn-outline-primary" onClick={()=> toggleSelected('debit')}>Debit</button>	
		</div>
	</div>
{
	isLoading && (<div className="d-flex justify-content-center py-5">
	<div className="spinner-border" style="width: 3rem; height: 3rem;" role="status">
  <span className="sr-only">Loading...</span>
</div>
</div>)
}

{
	isError && (
	<>
	<div className="d-flex justify-content-center py-3">
	<div class="alert alert-danger" role="alert">
  An error occurred. 
  Click on the button below.
</div>
</div>
<div className="d-flex justify-content-center">
<a href="/" className="btn btn-primary">
	Refresh
</a>
</div>
</>

	)
}
	

	<div class="row">
		<div className="col-12 col-md-12 col-xl-12">

		{
			(selectedTab.value === 'all') &&<AllTransactions transferHistory={transferHistory} />
		}
		{
			(selectedTab.value === 'credit') && <AllCredits credits={credits} />
		}
		{
			(selectedTab.value === 'debit') && <AllDebits debits={debits} />
		}
		

		</div>
	</div>
	</div>
	)
};

const AllTransactions = ({transferHistory})=> {
	return(
		<>
		{
			transferHistory.map(trans => (
		<div className="card my-3" style={{width: 'inherit', borderLeft: `${(trans.type === 'debit')? '2px solid red' : '2px solid green'}`}}>
		  <div className="card-body">
			  <div className="row" style={{borderBottom: '1px solid #DDDDDD'}}>
				  <div className="col-12">
			  <p><span style={{float: 'left'}}>
			{moment(trans.date).format("MM D YYYY, h:mm:ss")}
				  </span>
			  <span style={{float: 'right'}}>{(trans.type === 'debit')? '-': ''}
				  <ReactNumber
				value={Number(trans.amount).toFixed(2)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'₦'}
				style={{fontSize: '15px'}}
			/>
			</span></p>
			  </div>
			  
			  </div>
			  
			<p>{trans.narration}</p>
		  </div>
		</div>
			))
		}
		</>
	)
}

const AllCredits = ({credits}) => {
	return (
		<>
		{
			credits.map(cred=> (
<div className="card my-3" style={{width: 'inherit', borderLeft: '2px solid green'}}>
  <div className="card-body">
  <div className="row" >
				  <div className="col-12">
			  <p><span style={{float: 'left'}}>
			{cred.period}
				  </span>
			  <span style={{float: 'right'}}>
				  <ReactNumber
				value={Number(cred.amount).toFixed(2)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'₦'}
				style={{fontSize: '15px'}}
			/>
			</span></p>
			  </div>
			  
			  </div>
			  
  </div>
</div>
			))
		}
</>
	)
}

const AllDebits = ({debits}) => {
	return (
		<>
		{
			debits.map(deb=> (
<div className="card my-3" style={{width: 'inherit', borderLeft: '2px solid red'}}>
  <div className="card-body">
  <div className="row" >
				  <div className="col-12">
			  <p><span style={{float: 'left'}}>
			{deb.period}
				  </span>
			  <span style={{float: 'right'}}> -
				  <ReactNumber
				value={Number(deb.amount).toFixed(2)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'₦'}
				style={{fontSize: '15px'}}
			/>
			</span></p>
			  </div>
			  
			  </div>
			  
  </div>
</div>
			))
		}
</>
	)
}
export default Home;


