const express = require("express");

const app = express();
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
const port = 8000;

app.get('/', (req, res) => {
    return res.send("Hello there!!")
});


app.get('/login', (req, res) => {
    return res.send("you have logged in")
});

const admin = (req, res) => {
    return res.send("You're into admin level")
}

const isAdmin = (req, res, next) => {
    console.log("Admin is Running")
    next();
};
app.get('/admin', isAdmin, admin);

app.listen(port, () => {
    console.log("Server is running and up.....")
})