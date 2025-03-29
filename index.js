const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', "ejs")
const fs = require('fs');


app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index', { files: files })
    })
})

app.post("/submit", (req, res) => {
        const data = req.body;
        fs.writeFile(`./files/${data.title.split(" ").join()}.txt`, data.description, (err) => {
                // console.error(err)
        })
    res.redirect('/')
})

app.get("/files/:text", (req, res) => {
    fs.readFile(`./files/${req.params.text}`, "utf8", (err, file) => {
        
        res.render('show', { fileName: req.params.text, fileData: file })
    })
})

app.get('/profile/:username', (req, res) => {
    const Name = req.params.username
    res.status(200).json({ name: Name })
})
app.get('/profile/:username/:age', (req, res) => {
    const val = req.params
    res.status(200).json({ User: val })
})

app.get("/edit/:text", (req, res) => {
  res.render("update",{preFileName : req.params.text})
})

app.post("/edit", (req, res) => {
    const data = req.body
    fs.rename(`./files/${data.previous}`, `./files/${data.new}.txt`, (err, file) => {
        res.redirect("/")        
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})