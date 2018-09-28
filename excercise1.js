const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to MongoDB......'))
.catch(err => console.error('Could not connect to MongoDB....', err));
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course',courseSchema);
async function getData(){
 return await Course
 .find({tags: 'backend', isPublished: true})
 .sort({name: 1})
 .select({name: 1, author: 1});
}
async function run(){
    const courses = await getData();
    console.log(courses);
}
run();