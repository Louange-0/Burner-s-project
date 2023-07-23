const mongoose=require('mongoose');
require('dotenv').config()


module.exports=()=>{
    const connectionParams={
        useNewUrlParser: true,
          useUnifiedTopology: true,
    };
    mongoose.set('strictQuery', true);
   // Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

}