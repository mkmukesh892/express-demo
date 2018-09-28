const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises').then(()=>{console.log('connected to mongodb server....')}).catch((err)=>{ console.log('not connected....')});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});
const Course = mongoose.model('Course', courseSchema);
//const db = db(Course);
db.collection('courses').updateOne({_id: '5a68fe2142ae6a6482c4c9cb'},
{$set: {name: 'Java Course', author: 'Mukesh Kumar'}},(err,res)=>{
    if(err) throw err;
    console.log(res);
});