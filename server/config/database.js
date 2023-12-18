const mongoose=require('mongoose');
require('dotenv').config();
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("DB connected Successfully!!!!"))
    .catch((error)=>{
        console.log("Issue hai kuch");
        console.error(error);
        process.exit(1);
    })
}

module.exports=dbConnect;