const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB......'))
.catch(err => console.error('Could not connect to MongoDB....', err));
const courseSchema = new mongoose.Schema({
name: {
    type: String, 
    required: true,
    minlength:5,
    maxlength:255
},
author: String,
category: {
type: String,
enum: ['web','mobile','both'],
required: true
},
tags: {
    type: Array,
    validate: {
        isAsync: true,
        validator: function(v, callback) {
            setTimeout(()=>{
                const result = v && v.length > 0;
                callback(result);
            },4000);   
        },
        message: 'A course should have at least one tag.'
    }
},
date: {type: Date, default: Date.now},
isPublished: Boolean,
price: {
    type: Number,
    required: function() { return this.isPublished;},
    min: 10,
    max: 200
}
});
const Course = mongoose.model('Course', courseSchema);
async function saveDocument() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mukesh',
       // category: 'web',
      // tags: ['angular', 'frontend'],
        isPublished: true,
       // price: 12
    });
    try{
        await course.validate();
    const result = await course.save(); 
    console.log(result);
    }catch(ex){
       for(field in ex.errors) {
       // console.log(ex.errors[field]);
        console.log(ex.errors[field].message);
       }
    }
}
async function getCourses() {
    const courses = await Course
    .find({author: 'Mosh', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags:1})
    ;
    console.log(courses);
}
saveDocument();
// getCourses();