const mongoose=require('mongoose')
async function connection(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Park')
        console.log('Database is connected')
    }
    catch(error){
        console.log(error)
    }
}
connection()
// module.exports = mongoose;
// const mongoose = require('mongoose');

// const connect = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/Park', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB database');
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = connect;
