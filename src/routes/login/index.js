import { h } from 'preact';
import {useEffect} from 'preact/hooks';
import {setCode} from '../../helpers'

const Login = () => {

    useEffect(() => {
        
        return () => {}
    }, [])

    const triggerConnect =() => {
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
                alert('user closed the widget.')
              }
            };
        var connect = new Connect("test_pk_gJFkE0mscGylNk8CGoZZ", options);
        connect.setup();

        connect.open()
    }

    const redirectToDashboard =() => {
        let origin = window.location.origin;
      let loginPageUrl = origin + '/';
    //   if (window.location.origin === origin + loginPageUrl) return;
      window.location.href = loginPageUrl;
    }

    return (
        <div className="container-fluid" style={{backgroundColor: '#007bff'}}>
            <div class="row py-2">
            <div class="col-12">
                <h2>GTBank Internet Banking</h2>
            </div>
        </div>

        <div class="d-flex justify-content-center">
                <button class="btn btn-secondary" style="width: 100%;"
                onClick={()=> triggerConnect()}>
                    <strong> Get Started
                    </strong>
                    </button>
            </div>
        
        </div>
    )
}

export default Login;