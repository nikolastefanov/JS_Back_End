
import {clearUserData, getUserData,setUserData} from '../utility.js'

export const settings={
    host:'http://localhost:3030'
}

async function request(url,options){
    try{

        //send request with appropriate method

       const response=await fetch(url,options)

       //handle errors

       if(response.ok==false){

           const error=await response.json();

           throw new Error(error.message);
       }

       //page response (if needed)

          try{

           const data=await response.json();

           // return result

           return data;

          }catch(err){

           return response;

         }

    }catch(err){
         alert(err.message);
         throw  err;
    }
}


//that creates headers, based on application state and body

function createOptions(method='get',body){

    const user=getUserData();

    const options={
        method,
        headers:{}
    }

    if(user){
        options.headers['X-Authorization']=user.accessToken;

    }

    if(body){

        options.headers['Content-Type']='application/json';

        options.body=JSON.stringify(body);

    }

    return options;
}


//decorator function for all CRUD method

export async function get(url){

    return await request(url,createOptions());
    //podava se get no bez parametri
}


export async function post(url,data){

    return await request(url,createOptions('post',data));
    
}

export async function put(url,data){

    return await request(url,createOptions('put',data));
    
}

export async function del(url){

    return await request(url,createOptions('delete'));
    
}



//authentication function login/register/logout

export async function login(username,password){

    const result=await post(settings.host+'/users/login',{username,password});

    setUserData(result);

    return result;
}

export async function register(username,password){

    const result=await post(settings.host+'/users/register',{username,password});

    setUserData(result);

    return result;
}


export function logout(){

    const result=get(settings.host+'/users/logout');

    clearUserData();

    return result;
}