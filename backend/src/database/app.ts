import Conection from './Conection';
import mongoose from 'mongoose';
import authDB from './default';

mongoose.set('strictQuery', true);

// mongoose.connect(
//   `mongodb+srv://${authDB.user}:${authDB.pass}@cluster0.ve0zm2e.mongodb.net/?retryWrites=true&w=majority`
// );
// const mongoDB = new Conection(
//   `mongodb+srv://${authDB.user}:${authDB.pass}@cluster0.ve0zm2e.mongodb.net/?retryWrites=true&w=majority`
// );

const mongoDB = new Conection('mongodb://127.0.0.1:27017/beleza_na_agenda');

export default mongoDB;
