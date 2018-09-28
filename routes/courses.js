const express = require('express');
const router = express.Router();
const Joi = require('joi');
const courses = [
    {id: 1, name: 'C Programming Language'},
    {id: 2, name: 'C++ Learning course'},
    {id: 3, name: 'JavaEE Advanced'}
];
router.get('/',(req,res)=>{
    res.send(JSON.stringify(courses));
});
router.get('/:id',(req,res)=>{
   const course = courses.find(c => c.id === +req.params.id);
   if(!course) return res.status(404).send(`The course with given id: ${req.params.id} is not available`);
   res.send(course);
});
router.post('/', (req,res)=>{
    
   const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
router.put('/:id',(req,res)=>{
    const course = courses.find(c => c.id === +req.params.id);
    if(!course) return res.status(404).send(`The course with given id: ${req.params.id} is not available`);
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;
    res.send(course);
   // courses[+req.params.id - 1]=course;
});
router.delete('/:id',(req,res)=>{
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

module.exports = router;