export default function Validation(inputs){
    const regexName= /^[A-Za-z]{1,15}$/
    const regexAbilities=/^[0-9]+$/
    // const regexFile= /\.(jpg|png|gif|JPG|PNG|GIF)$/
    // const regexFile=/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/
    const regexFile= /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/


    function imageVerification(inputs){
        return regexFile.test(inputs.image)
    }

    const error={};
    (!inputs.name) ? error.name ="Name is required" : error.name= "";
    (inputs.name.length>15)? error.name = "Name must cant   be more than 15 characters" : error.name= "";
    (!regexName.test(inputs.name))? error.name= "Name is invalid" : error.email="";

    (!inputs.image) ? error.image= "Image is required" : error.image="";
    (!imageVerification(inputs))? error.image= "Image is invalid" : error.image="";

    (!inputs.hp) ? error.hp= "Number is required" : error.hp="";
    (!regexAbilities.test(inputs.hp))? error.hp= "Number is invalid" : error.hp="";

    (!inputs.attack) ? error.attack= "Number is required" : error.attack="";
    (!regexAbilities.test(inputs.attack))? error.attack= "Number is invalid" : error.attack="";

    (!inputs.defense) ? error.defense= "Number is required" : error.defense="";
    (!regexAbilities.test(inputs.defense))? error.defense= "Number is invalid" : error.defense="";

    (!inputs.speed) ? error.speed= "Number is required" : error.speed="";
    (!regexAbilities.test(inputs.speed))? error.speed= "Number is invalid" : error.speed="";

    (!inputs.height) ? error.height= "Number is required" : error.height="";
    (!regexAbilities.test(inputs.height))? error.height= "Number is invalid" : error.height="";

    (!inputs.weight) ? error.weight= "Number is required" : error.weight="";
    (!regexAbilities.test(inputs.weight))? error.weight= "Number is invalid" : error.weight="";

    return error
}