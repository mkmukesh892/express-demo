const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
const courses = [
    {id: 1, name: 'C'},
    {id: 2, name: 'C++'},
    {id: 3, name: 'Java'}
];
app.get('/',(req, res)=>{
    res.send('Hello World!!!!');
});
app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify(courses));
});
app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(c => c.id === +req.params.id);
   if(!course) res.status(404).send(`The course with given id: ${req.params.id} is not available`);
   res.send(course);
});
app.post('/api/courses', (req,res)=>{
    
   const {error} = validateCourse(req.body);
    if(error){
    res.status(400).send(error.details[0].message);
    return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === +req.params.id);
    if(!course) res.status(404).send(`The course with given id: ${req.params.id} is not available`);
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    courses.push(course);
})
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}.....`)});
