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
        let btn = document.createElement("button")
        btn.setAttribute("class", "delete")
        btn.innerText = "Delete"
        btn.addEventListener('click', event => {
            event.preventDefault
            deleteTreat(t)
        })
        let div = document.createElement("div")
        div.setAttribute("id", "treat-card")

        let li = document.createElement("li")
        li.innerText = t.name
        div.appendChild(li)
        div.appendChild(btn)
        ul.appendChild(div)
        console.log(t.name)
    })
mainDiv.appendChild(ul)
   
}

async function deleteTreat(treat) {
    
}