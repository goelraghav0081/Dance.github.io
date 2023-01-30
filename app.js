const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const fs = require("fs");

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
})
app.post('/contact',(req,res)=>{
    name = req.body.name;
    phone= req.body.phone;
    email= req.body.email;
    address= req.body.address;
    desc = req.body.desc;
    let output = `name=${name} ; phone=${phone} ; email=${email} ; address=${address} ; desc=${desc}`;
    fs.writeFileSync('output.txt',output)
    const params = { };
    res.status(200).render('contact.pug', params);
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});