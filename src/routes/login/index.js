import { h } from 'preact';
import {setCode, setLoanAmount} from '../../helpers';
import logo from './mono-logo.png';
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
                <form className="py-5" onSubmit={(e)=> triggerConnect(e)}>
                <input type="text" required class="form-control" placeholder="Name/Email"
                 aria-label="Name or email" style={{backgroundColor: 'transparent', color: '#FFF'}} />
 
 <input type="number" required class="form-control my-3" placeholder="Amount"
                 aria-label="Amount" style={{backgroundColor: 'transparent', color: '#FFF'}} 
                 onChange={(e)=> setLoanAmount(e.target.value)}/>
 
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