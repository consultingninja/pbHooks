
export const actions={
    register: async ({request,locals})=>{
        
        const form = await request.formData();
    
        const firstname = form.get('firstname')?? '';
        const lastname = form.get('lastname')?? '';
        const email = form.get('email')??'';
        const password = form.get('password')??'';

        let createResult = false;
    
        const data = {
            firstname,
            lastname,
            email,
            password: '',
            passwordConfirm: '',
        };

        let registerResponse = {
            error:false,
            email:email,
            firstname,
            lastname,
            message: ''
        }
    
        try{
            data.password = password;
            data.passwordConfirm = password;
            //create the user
            const result = await locals.adminPb.collection('users').create(data);
            console.log('api request ran');
            if(result) createResult = true;

        }catch(err){
            console.log('api request errored');
            registerResponse.error = true;
            registerResponse.message = err.message;

        }

            finally{
                if(!createResult){
                    return registerResponse;
                }
                if(createResult) return registerResponse

                
            }
    




    }
}