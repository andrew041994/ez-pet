class Pet {
    constructor(arg) {
        this.name = arg.name
        this.id = arg.id
    }
    
  static mapPets(arrayOfPets) {
      
       
       arrayOfPets.map((petObj) => {
            this.listPet.call(petObj)
          
       })
       
      createPetForm()
   };

   static createMainPetDiv() {
    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "pets")
    mainDiv.setAttribute("class", "pets")
    const ul = document.createElement("ul")
    ul.setAttribute("id", "pet-ul")
    mainDiv.appendChild(ul)
    document.body.appendChild(mainDiv)
   }

   static listPet() {

    let pet = new Pet(this)
    //    console.log(pet)
        let div = document.createElement("div")
        div.setAttribute("id",`${pet.id}`)
        div.setAttribute("class", "petname")
        let li = document.createElement("li")
        
        li.innerText = pet.name 
        
        li.addEventListener('click', event => {
            event.preventDefault()
           
            getTreats(pet)
        })
        let btn = document.createElement("button")
        btn.setAttribute("class", "delete")
        btn.innerText = "Delete"
        btn.addEventListener('click', event => {
            event.preventDefault()
         //    debugger
            this.deletePet.call(pet)
        })
        div.appendChild(li)
        div.appendChild(btn)
      let ul = document.getElementById("pet-ul").appendChild(div)

      
     

   }

  static async getPets() {
        const resp = await fetch("http://localhost:3000/pets")
        const resp_1 = await resp.json()
       this.mapPets(resp_1)
    };

   static async deletePet() {
        const resp = await fetch(`http://localhost:3000/pets/${this.id}`,{
            method: "DELETE"
        })
      this.removePetFromDom()    
    }

    async removePetFromDom() {
    document.getElementById(this.id).remove()
    }

   static postPet() {
        // debugger
        fetch(`http://localhost:3000/pets` , {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
            },
            body: JSON.stringify({
              "name": this          
            })   
          }).then(resp => resp.json()).then(json => console.log(json));
    }; 
    

}