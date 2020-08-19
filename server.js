const express = require('express');
const { poems } = require('./Poems/poemsArray');
const app = express();
const port = 8080;
const allPoems = require('./Poems/poemsArray');
const { response } = require('express');

app.use(express.json())
app.use("/", express.static('public'))


app.listen(port, console.log(`App listening on port ${port}`)) 


//  ----------------   POEMS RESOURCE, All endpoints ------------------ //

// Get all
app.get('/poems', (req, res, next) => {
    res.json(allPoems)
})

// Get specific
app.get('/randPoems', (req, res, next) => {
    const arrayLength = allPoems.length
    const poemIndex = Math.floor(Math.random() * arrayLength) +1
    console.log(arrayLength)
    console.log(poemIndex)
    if(poemIndex) {
        res.json(allPoems[poemIndex-1])
    } else {
        res.status(404).json({ status: "Poem not found! "})
    }
})

// Post a poem
app.post('/poems', (req, res, next) => {
    let dikt = req.body
    dikt.id = idGen()
    allPoems.push(req.body)
    res.json({ status: "A new poem has been posted!"})
    console.log(response)
})

// Delete a poem
app.delete('/poems/:id', (req, res) => {
    const paramId = req.params.id
    let poemIdFound = allPoems.findIndex((poem) => poem.id == paramId)   

    if (poemIdFound == -1) {
        res.status(404).json({status: "Poem not found"})
    } 
    allPoems.splice(poemIdFound, -1)
    res.json({status: "Poem deleted"})

})

// Id generator
function idGen () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };






