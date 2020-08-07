import axios from 'axios';
import * as localStore from '../helpers/localStorage';

const VERSION_ONE = 'v1';

const apiUrl = 'https://api.withmono.com/';

function init() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
     "mono-sec-key": "test_sk_X2AQstuyadEzapHnP7B5"
    }

   
    const instance = axios.create({
        baseURL: apiUrl,
        timeout: 500000,
        headers
      });


      instance.interceptors.response.use(function (response) {
        response = { ...response, status: 200, statusCode: 200 };
        return response;
    }, function (error) {
        // if (error.response) {
            
        //     let status = error.response.status;
        //     if (status === 401) {
        //         // redirectToLogin();
        //     }
        // }
        let customError = Promise.reject(error)
        return {error, statusCode: 500};
        // return { error: 'Unable to connect to the internet', statusCode: 500 }

    })

      return instance;
}

    // To process results 
   function processResult(response, version) {
    //   console.log('I am logging the status code');
      let {statusCode} = response;
      
    //   console.log(response);
      if(statusCode === 200) {
          let data = null;
          let message = null;

          if(version === VERSION_ONE){
          data = response.data.success
      } else {
          data = response.data;
          message = response.data;

      }
          return {statusCode, data, message};
      }
       else if(statusCode === 201) {
          return {statusCode, data: response.data.data, message: response.data.message}
      } else {
        //   let error = 'Cannot connect to the internet';
        let error = response.error;
          return {statusCode, error}
      }

  }

  
// function postLogin(data) {


//    return axios.post('http://157.245.37.253/erpv3/public/api/login', data)
//     .then(res=> {
//         let {data} = res.data;
//         localStore.setToken(data.token);
//         localStore.setUserId(data.info.id);
//         localStore.setExpiresAt(data.expiresin);
//         localStore.setUserName(data.info.name);
//         return {statusCode: 200, data: 'Success'}
//     }).catch(error => {
        
//         if(error.response) {
//            if( error.response.status == 401) {
//                return {statusCode: 401, data: "Email and password does not match any record"}
//            }
//            else {
//             return {statusCode: 500, data: "Error in internet connection"} 
//            }
//         }else {
//             console.log('an error ', error)
//             return {statusCode: 500, data: "Error in internet connection"}
//     }

//   });
//   }

  // ================ ACCOUNT MODULE ===================
 export async function postAuth(data) {

    let results = await init().post(`account/auth`, data);
    return processResult(results);
    // return results;
  }

  export async function getAccountDetails(id) {
    let results = await init().get(`accounts/${id}`);
    return processResult(results);
  }

  export async function getTransferHistory(id) {
    let results = await init().get(`accounts/${id}/statement`);
    return processResult(results);
  }

  export async function getTransactionHistory(id) {
    let results = await init().get(`accounts/${id}/transactions`);
    return processResult(results);
  }

  export async function getCredits(id) {
    let results = await init().get(`accounts/${id}/debits`);
    return processResult(results);
  }

  export async function getDebits(id) {
    let results = await init().get(`accounts/${id}/credits`);
    return processResult(results);
  }