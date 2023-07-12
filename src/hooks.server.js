import PocketBase from 'pocketbase'
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';

export const handle = async ({ event, resolve }) => {
    const adminPb = new PocketBase("http://127.0.0.1:8090");
    //sign in
    await adminPb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    event.locals.adminPb = adminPb;



    event.locals.adminPb.beforeSend = (url,options)=>{
        console.log('beforeSend url',url);
        console.log('beforeSend options',options);
    };



    event.locals.adminPb.afterSend = (response,data)=>{
        console.log('afterSend response',response);
        console.log('afterSend data',data);
        if(response.status !== 200){
            data.message = 'Your request failed';
            return data
        }
    }




    const response = await resolve(event);

    return response;
};