import { h } from 'preact';
import {setCode, setLoanAmount} from '../../helpers';
import logo from './mono-logo.png';
import ReactNumber from 'react-number-format'
const Login = () => {

    const triggerConnect =(e) => {
        e.preventDefault();
        // console.log(e);
        // return;
        let options = {
            onSuccess: function (response) {
                console.log(response, response.code);
                setCode(response.code);

                redirectToDashboard();
        //    alert(JSON.stringify(response));
                         /**
                             response : { "code": "code_xyz" }
                             you can send this code back to your server to get this
                             authenticated account and start making requests.
                         */
            },

            onClose: function () {
                // alert('user closed the widget.')
              }
            };
        var connect = new Connect("test_pk_gJFkE0mscGylNk8CGoZZ", options);
        connect.setup();

        connect.open()
    }

    const redirectToDashboard =() => {
        let origin = window.location.origin;
      let loginPageUrl = origin + '/home';
    //   if (window.location.origin === origin + loginPageUrl) return;
      window.location.href = loginPageUrl;
    }

    return (
        <div className="container-fluid" style={{backgroundColor: 'rgb(18, 43, 69)', height: '100%'}}>
            
            <div className="row"  >
                <div className="col-12 col-md-4 col-xl-4"></div>
            <div className="col-12 col-md-4" style={{marginTop: '100px'}} >
          <center>
                {/* <h2 style={{color: '#FFF'}}>mono</h2> */}
                <img src={logo} style={{width: '200px', height: '50px'}}/>
                <h5 className="py-1">Enabling access to your financial accounts</h5>

                <form className="py-5" onSubmit={(e)=> triggerConnect(e)}>
                    <h5 style={{color: '#FFF'}}>Get a loan in seconds</h5>
                <input type="text" required className="form-control" placeholder="Enter your Name/Email"
                 aria-label="Name or email" style={{backgroundColor: 'transparent', color: '#FFF'}} 
                 pattern=".*[a-zA-Z].*" onInvalid={()=>"setCustomValidity('Please enter on alphabets only. ')"}/>
 
 
 {/* <input type="number" required class="form-control my-3" placeholder="Amount"
                 aria-label="Amount" style={{backgroundColor: 'transparent', color: '#FFF'}} 
                 onChange={(e)=> setLoanAmount(e.target.value)}/>
  */}

<ReactNumber displayType={'input'} 
thousandSeparator={true}
prefix={'₦'} 
placeholder="Enter amount you want to borrow"
className="form-control my-3"
style={{backgroundColor: 'transparent', color: '#FFF'}} 
onValueChange={(value)=> setLoanAmount(value.value)}
required
/>

 <div class="d-flex justify-content-center my-5">
                <button class="btn btn-light" type="submit" style="width: 100%;"
                >
                    <strong> Get Started
                    </strong>
                    </button>
            </div>
                </form>
                </center>
      
            </div>
           
            <div className="col-12 col-md-4 col-xl-4"></div>
        </div>

       
        
        </div>
    )
}

export default Login;