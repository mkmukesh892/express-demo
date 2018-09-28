const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
  return await Course
.find({ isPublished: true})
.or( [{price: { $gte : 15}},{name: /.*by.*/i}])
.sort({price: 1});
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
