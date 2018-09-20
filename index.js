const express = require('express');
const Joi = require('joi');
const app = express();
const custom = require('./morgan-custom-function');
const logger = require('./logger');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
console.log(`Application Name: ${config.get('name')}`);
console.log(`Application Mail Server: ${config.get('mail.host')}`);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
if(app.get('env')==='development'){
app.use(morgan(custom));
app.use(helmet());
console.log('Morgan Enabled.......');
}
const courses = [
    {id: 1, name: 'C Programming Language'},
    {id: 2, name: 'C++ Learning course'},
    {id: 3, name: 'JavaEE Advanced'}
];
app.get('/',(req, res)=>{
    res.send('Hello World!!!!');
});
app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify(courses));
});
app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(c => c.id === +req.params.id);
   if(!course) return res.status(404).send(`The course with given id: ${req.params.id} is not available`);
   res.send(course);
});
app.post('/api/courses', (req,res)=>{
    
   const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === +req.params.id);
    if(!course) return res.status(404).send(`The course with given id: ${req.params.id} is not available`);
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;
    res.send(course);
   // courses[+req.params.id - 1]=course;
});
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === +req.params.id);
    if(!course) return res.status(404).send(`The course with given id: ${req.params.id} is not available`);
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}.....`)});
