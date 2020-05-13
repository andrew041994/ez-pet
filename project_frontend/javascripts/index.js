document.addEventListener("DOMContentLoaded", () => {

    getTreats()
})




async function getTreats() {
    const resp = await fetch("http://localhost:3000/treats")
    const resp_1 = await resp.json()
    return listTreats(resp_1)
}

async function listTreats(obj) {
    const mainDiv = document.getElementById("treats")
    const ul = document.createElement("ul")
    obj.map((t) => {
        let li = document.createElement("li")
        li.innerText = t.name
        ul.appendChild(li)
        console.log(t.name)
    })
mainDiv.appendChild(ul)
   
}