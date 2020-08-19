function getAll() {
    console.log("Get all")
    makeRequest("/poems", "GET")
} 

async function getRandomPoem() {
    const id = Math.floor(Math.random() * 8);
    const arrayofPoems = await fetch("/poems/" + id, {method: "GET"})
    const data = await arrayofPoems.json()

    const titleBox = document.getElementById("title")
    const authorBox  = document.getElementById("author")
    const textBox = document.getElementById("text")

    titleBox.innerText = data.title
    authorBox.innerText = data.author
    textBox.innerText = data.text
}

// HERE IS TO CONTINUE: SOLVE THE PROBLEM WITH AUTO-INCREMENTING ID -------------------------------------------------------------------------------------------------



function addPoem() {
    event.preventDefault();
    let idAdd = 8
    let title = JSON.stringify(document.getElementById("titleInput").value)
    let author = JSON.stringify(document.getElementById("authorInput").value)
    let text = JSON.stringify(document.getElementById("textInput").value)

    let newPoem = {
        id: idAdd,
        title: title,
        author: author,
        text: text
    }
    makeRequest("/poems", "POST", newPoem)
}


async function makeRequest(url, reqMethod, body) {
    
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: reqMethod,
        body:JSON.stringify(body)
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
}