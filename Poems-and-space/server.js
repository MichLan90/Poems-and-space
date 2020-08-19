const express = require('express');
const { poems } = require('./Poems/poemsArray');
const app = express();
const port = 8080;
const allPoems = require('./Poems/poemsArray')

app.use(express.json())
app.use("/", express.static('public'))


app.listen(port, console.log(`App listening on port ${port}`)) 


//  ----------------   POEMS RESOURCE, All endpoints ------------------ //

// Get all
app.get('/poems', (req, res, next) => {
    res.json(allPoems)
})

// Get specific
app.get('/poems/:id', (req, res, next) => {
    const id = req.params.id
    const onePoem = allPoems.find((poem) => poem.id == id)

    if(onePoem) {
        res.json(onePoem)
    } else {
        res.status(404).json({ status: "Poem not found! "})
    }
})

// Post a poem
app.post('/poems', (req, res, next) => {
    allPoems.push(req.body)
    res.json({ status: "A new poem has been posted!"})
})

// Delete a poem
app.delete('/poems/:id', (req, res) => {
    const paramId = req.params.id
    let poemIdFound = allPoems.findIndex((poem) => poem.id == paramId)   

    if (poemIdFound == -1) {
        res.status(404).json({status: "Poem not found"})
    } 
    allPoems.splice(poemIdFound, 1)
    res.json({status: "Poem deleted"})

})


//  ----------------   NASA RESOURCE, All endpoints ------------------ //

