async function getAll() {
    const allPoems = await fetch("/poems", {method: "GET"})
    const data = await allPoems.json()
    const div = document.getElementById("all-poems-list")
    for (let i = 0; i < data.length; i++) {

        let titleEl = document.createElement("h1")
        titleEl.innerText = data[i].title
        div.appendChild(titleEl)

        let authorEl = document.createElement("h3")
        authorEl.innerText = data[i].author
        div.appendChild(authorEl)

        let textEl = document.createElement("p")
        textEl.innerText = data[i].text
        div.appendChild(textEl)

        let hr = document.createElement("hr")
        div.appendChild(hr)
    }  
   
    
}



async function getRandomPoem() {

    const arrayofPoems = await fetch("/randPoems/", {method: "GET"})
    const data = await arrayofPoems.json()

    const titleBox = document.getElementById("title")
    const authorBox  = document.getElementById("author")
    const textBox = document.getElementById("text")

    titleBox.innerText = data.title
    authorBox.innerText = data.author
    textBox.innerText = data.text
}

getRandomPoem()


function addPoem() {
   event.preventDefault();

    let title = document.getElementById("titleInput").value
    let author = document.getElementById("authorInput").value
    let text = document.getElementById("textInput").value
    
    let newPoem = {
        title: title,
        author: author,
        text: text
    }
    makeRequest("/poems", "POST", newPoem)
    thankYouMsg()
}

function thankYouMsg() {
    if(!alert("Thank you for your contribution! Your poem has been saved!"))
    {window.location.reload()}
}



async function makeRequest(url, reqMethod, body) {
    
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: reqMethod,
        body:JSON.stringify(body)
    })
    console.log(response)
    const data = await response.json()
}



//  NASA API

const req = new XMLHttpRequest();
const url = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = "6Eqaug5bzczPOxRwDAe3tKk9lsO0QkoxyRTjKnqb";


req.open("GET", url + api_key);
req.send();

req.addEventListener("load", function(){
	if(req.status == 200 && req.readyState == 4){
      const response = JSON.parse(req.responseText);
      document.getElementById("date").textContent = response.date;

        if (response.hdurl != null || undefined) {
            document.getElementById("pic").src = response.hdurl; } 
            else {
                document.getElementById("pic").style.display = "none";
            }
        
        if (response.url != null || undefined) {
            document.getElementById("video").src = response.url; } 
            else {
                document.getElementById("video").style.display = "none";
            } 

    console.log(response)
  }
})




