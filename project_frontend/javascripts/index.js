document.addEventListener("DOMContentLoaded", () => {
    Pet.getPets()
    Pet.createMainPetDiv()
    createPetForm()
    
});




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
        event.preventDefault()

        let petName = document.getElementById("input").value
       Pet.postPet.call(petName)
    });

    form.appendChild(input);
    form.appendChild(submit);
    div.appendChild(form);
    petDiv.appendChild(div);
};
// ##################################################################

async function getTreats(pet) {
    const resp = await fetch(`http://localhost:3000/pets/${pet.id}`)
    const resp_1 = await resp.json()
    mapTreats(resp_1,pet)
};

async function mapTreats(arrayOfTreats, pet) {
  
    // name.innerText = pet.name
    
    arrayOfTreats.map((treat) => {
        listTreat(treat,pet)
       

      
    })
   
    
   
};


function createMainTreatDiv() {
    const name = document.createElement("h3")
    name.setAttribute("id", "name")
    const div = document.getElementById("pets")
    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "treats")
    mainDiv.setAttribute("class", "treats")
    const ul = document.createElement("ul")
    ul.setAttribute("id", "treat-ul")
    mainDiv.appendChild(name)
    mainDiv.appendChild(ul)
    document.body.replaceChild(mainDiv,div)


}

function listTreat(treat,pet) {
    document.getElementById("name").innerText = pet.name
    let btn = document.createElement("button")
    btn.setAttribute("class", "delete")
    btn.innerText = "Delete"
    btn.addEventListener('click', event => {
        event.preventDefault
        deleteTreat(treat)
    })
    let div = document.createElement("div")
    div.setAttribute("id", `treat-card-${treat.id}`)
    div.setAttribute("class", "treat-card")
   
    let li = document.createElement("li")
    li.innerText = treat.name
    div.appendChild(li)
    div.appendChild(btn)
    document.getElementById("treat-ul").appendChild(div)
    console.log(treat.name)
}

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
        class: 'input',
        placeholder:'Enter a New Treat Name...',
        class: 'input-text'
        
      })
    
    let submit = document.createElement("input") 
    Object.assign(submit,{
        type: 'submit',
        id: 'submit',
        name: 'submit',
        class: 'submit',
        value: 'Create New Treat',

    })

    submit.addEventListener('click', event => {
        event.preventDefault()

        let treatName = document.getElementById("input").value
        postTreat(treatName,pet)
        
    })
   
    
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
  }).then(resp => resp.json()).then(json => listTreat(json,pet));


  
}
