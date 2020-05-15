document.addEventListener("DOMContentLoaded", () => {
    getPets()
    // getTreats()
})


async function getPets() {
    const resp = await fetch("http://localhost:3000/pets")
    const resp_1 = await resp.json()
    return listPets(resp_1)
}

function listPets(obj) {
    // const body = document.querySelector("body")
    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "pets")
    const ul = document.createElement("ul")
    obj.map((p) => {
        let li = document.createElement("li")
        li.innerText = p.name 
        li.addEventListener('click', event => {
            event.preventDefault
           
            getTreats(p)
        })
        ul.appendChild(li)
    })
    mainDiv.appendChild(ul)
   document.body.appendChild(mainDiv)
}

async function getTreats(p) {
    const resp = await fetch(`http://localhost:3000/pets/${p.id}`)
    const resp_1 = await resp.json()
    return listTreats(resp_1,p)
}

async function listTreats(obj, pet) {
    const name = document.createElement("h3")
    name.setAttribute("id", "name")
    name.innerText = pet.name
    const div = document.getElementById("pets")
    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "treats")
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
        div.setAttribute("id", `treat-card-${t.id}`)

        let li = document.createElement("li")
        li.innerText = t.name
        div.appendChild(li)
        div.appendChild(btn)
        ul.appendChild(div)
        console.log(t.name)
    })
    mainDiv.appendChild(name)
     mainDiv.appendChild(ul)
     document.body.replaceChild(mainDiv,div)
createTreatForm(pet)
   
}

async function deleteTreat(treat) {
    const resp = await fetch(`http://localhost:3000/pets/${treat.pet_id}/treats/${treat.id}`,{
        method: "DELETE"
    })

    /* a success msg is being returned*/

    removeFromDom(treat)
    const resp_1 = await resp.json()
  console.log(resp_1)
}

async function removeFromDom(treat) {
   document.getElementById(`treat-card-${treat.id}`).remove()

}


function createTreatForm(pet) {
    let div = document.createElement("div")
    div.setAttribute("class", "container")  
    let form = document.createElement("form")
    form.setAttribute("class","add-treat-form")
    let input = document.createElement("input")
    Object.assign(input, {
        type: 'text',
        id: 'input',
        placeholder:'Enter a New Treat Name...',
        class: 'input-text'
        
      })
    
    let submit = document.createElement("input") 
    Object.assign(submit,{
        type: 'submit',
        id: 'submit',
        name: 'submit',
        value: 'Create New Treat',
        // class: submit,

    })

    submit.addEventListener('click', event => {
        event.preventDefault

        let treatName = document.getElementById("input").value
        postTreat()
    })
   
    // console.log(name)
    
    form.appendChild(input)
    form.appendChild(submit)
    div.appendChild(form)
    document.body.appendChild(div)
}

function fn() {
   
    console.log(name)
}
