import mongoose from 'mongoose';

if(!process.env.MONGO_URI)
{
  throw new Error("Please provide a valid mongodb connection string!")  
}

/* 
  globalThis refers to the  global scope ,e.g global in node window in v8
  typeof globalThis is object

  & is the intersection operator 
  For example :
  type x = { name :string }
  type y = { age : number }
  type Person = x & y; 

  type Person will be { name:string, age:number}
*/
const DB_URL:string = process.env.MONGO_URI;
   /* w intersection operator {} & { mongoose:any } = { mongoose : any } 
      so basically with this we are attaching a new property to the global object called mongoose 

   */
 

let mongooseGlobal = global as typeof globalThis & {mongoose:any}

// then we can access the mongoose property 
let cached = mongooseGlobal.mongoose;
if(!cached)
{
    // mongoose returns a promise,connection is null 
    cached = mongooseGlobal.mongoose = {connection:null,mongoosePromise:null}
}

async function connectDB () {
    //  checks if the  connection is not null  
    if(cached.connection){
        // if it isn't  return it 
        return cached.connection;
    }
    // if the promise is null  then add our mongoose connection as promise with the options
    if(!cached.mongoosePromise){
    const options =  {
      bufferCommands:false,
      useNewUrlParser:true,
      useUnifiedTopology:true
    }
    cached.mongoosePromise =  mongoose.connect(DB_URL,options).then(mongoose=> { 
        console.log('Connection established!!!')
        return mongoose
    }).catch(e=> console.log(e as Error));
    }  
// await the promise 
cached.connection = await cached.mongoosePromise;
// return the promise
return cached.connection 
}
export default connectDB
