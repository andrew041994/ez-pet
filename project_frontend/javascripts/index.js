document.addEventListener("DOMContentLoaded", () => {
    getPets()
    
});



async function getPets() {
    const resp = await fetch("http://localhost:3000/pets")
    const resp_1 = await resp.json()
    return listPets(resp_1)
};

function listPets(obj) {
    // const body = document.querySelector("body")
    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "pets")
    const ul = document.createElement("ul")
    obj.map((p) => {
        let div = document.createElement("div")
        div.setAttribute("id",`${p.id}`)
        let li = document.createElement("li")
        li.innerText = p.name 
        
        li.addEventListener('click', event => {
            event.preventDefault
           
            getTreats(p)
        })
        let btn = document.createElement("button")
        btn.setAttribute("class", "delete")
        btn.innerText = "Delete"
        btn.addEventListener('click', event => {
            event.preventDefault
            deletePet(p)
        })
        div.appendChild(li)
        div.appendChild(btn)
        // li.appendChild(btn)
        ul.appendChild(div)
       
    })
    mainDiv.appendChild(ul)
   
   document.body.appendChild(mainDiv)
   createPetForm()
};

async function deletePet(pet) {
    const resp = await fetch(`http://localhost:3000/pets/${pet.id}`,{
        method: "DELETE"
    })

    /* a success msg is being returned*/

    removePetFromDom(pet)
    const resp_1 = await resp.json()
  console.log(resp_1)

}

async function removePetFromDom(pet) {
    
document.getElementById(`${pet.id}`).remove()
}

function createPetForm(){
    let petDiv = document.getElementById("pets")
    let div = document.createElement("div")
    div.setAttribute("class", "container")  
    let form = document.createElement("form")
    form.setAttribute("class","add-pet-form")
    let input = document.createElement("input")
    Object.assign(input, {
        type: 'text',
        id: 'input',
        placeholder:'Enter a New Pet Name...',
        class: 'input-text'
        
      })
    
    let submit = document.createElement("input") 
    Object.assign(submit,{
        type: 'submit',
        id: 'submit',
        name: 'submit',
        value: 'Create New Pet'
        // class: submit,

    })

    submit.addEventListener('click', event => {
        event.preventDefault

        let petName = document.getElementById("input").value
        postPet(petName)
    });

    form.appendChild(input);
    form.appendChild(submit);
    div.appendChild(form);
    petDiv.appendChild(div);
};

function postPet(petName) {
    fetch(`http://localhost:3000/pets` , {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": petName          
        })   
      }).then(resp => resp.json()).then(json => console.log(json));
};

async function getTreats(p) {
    const resp = await fetch(`http://localhost:3000/pets/${p.id}`)
    const resp_1 = await resp.json()
    return listTreats(resp_1,p)
};

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
    // let unwanted = document.getElementsByClassName("add-pet-form")
    // mainDiv.appendChild(name)
     mainDiv.appendChild(ul)
     document.body.replaceChild(mainDiv,div)
    //  document.body.replaceChild(name,unwanted)
createTreatForm(pet)
   
};

async function deleteTreat(treat) {
    const resp = await fetch(`http://localhost:3000/pets/${treat.pet_id}/treats/${treat.id}`,{
        method: "DELETE"
    })

    /* a success msg is being returned*/

    removeTreatFromDom(treat)
    const resp_1 = await resp.json()
  console.log(resp_1)
};

async function removeTreatFromDom(treat) {
   document.getElementById(`treat-card-${treat.id}`).remove()

};


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
        postTreat(treatName,pet)
        
    })
   
    // console.log(name)
    
    form.appendChild(input)
    form.appendChild(submit)
    div.appendChild(form)
    document.body.appendChild(div)
};

 function postTreat(treatName, pet) {
    fetch(`http://localhost:3000/pets/${pet.id}/treats` , {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": treatName,
      "pet_id": pet.id,   
      
    })   
  }).then(resp => resp.json()).then(json => console.log(json));
  
}
