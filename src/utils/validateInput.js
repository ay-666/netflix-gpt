export const validateInput =(field,value, isSignUp)=>{
    switch(field){
        case "fullName":{
            if(!value) return "Full Name is required."
            return "";
        }
        case "email":{
            if(!value){
                return "Email is required"
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailRegex.test(value)){
                return "Please enter valid email."
            }
            return "";
        }
        case "password":{
            if(!value || value.length < 6 ){
                return "Password must be of atleast 6 characters."
            }
            return "";
        }
        default: {
            return "";
        }

    }
}
