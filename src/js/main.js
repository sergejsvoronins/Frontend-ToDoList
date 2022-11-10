import {ToDoObject} from "./models/todoobject"


 
//All creations

let mainContainer = document.createElement("div");
let toDoHeader = document.createElement("h1");
let userInputLabelEl = document.createElement("label");
let userInputEl = document.createElement("input");
let btnContainer = document.createElement("div");
const createToDoBtn = document.createElement("button");
const createNewToDoBtn = document.createElement("button");
let hideCompletedToDosBtn = document.createElement("button");
let toDoUlContainer = document.createElement("div");
let completedToDoUlContainer = document.createElement("div");
let toDoListUlTag = document.createElement("ul");
let completeToDoListUlTag = document.createElement("ul");
let toDoUlListHeader = document.createElement("h2");
let completedToDoUlListHeader = document.createElement("h2");

//All appends

document.body.append(mainContainer);
mainContainer.appendChild(toDoHeader);
mainContainer.appendChild(userInputLabelEl);
mainContainer.appendChild(userInputEl);
mainContainer.appendChild(btnContainer);
btnContainer.appendChild(createToDoBtn);
btnContainer.appendChild(createNewToDoBtn);
mainContainer.appendChild(toDoUlContainer);
mainContainer.appendChild(completedToDoUlContainer);
btnContainer.appendChild(hideCompletedToDosBtn)
toDoUlContainer.appendChild(toDoUlListHeader);
toDoUlContainer.appendChild(toDoListUlTag);
completedToDoUlContainer.appendChild(completedToDoUlListHeader);
completedToDoUlContainer.appendChild(completeToDoListUlTag);

//Create classes/ID

mainContainer.classList.add("container");
userInputLabelEl.classList.add("container__inputLabel");
userInputEl.classList.add("container__inputField");
btnContainer.classList.add("container__btnContainer");
createToDoBtn.classList.add("container__btnContainer__btn");
createNewToDoBtn.classList.add("container__btnContainer__btn");
hideCompletedToDosBtn.classList.add("container__btnContainer__btn");
userInputEl.id = "userInput";


//Create attributes

userInputLabelEl.setAttribute("for", "userInput");
userInputEl.setAttribute("type", "text");
userInputEl.setAttribute("autocomplete", "off");
userInputEl.setAttribute("placeholder", "Skriv här..");
createToDoBtn.type = "button";
createNewToDoBtn.type = "button";
hideCompletedToDosBtn.type ="button";

//Set innerHTML

toDoHeader.innerHTML = "ToDo Lista";
userInputLabelEl.innerHTML = "Skriv dagens uppgift:";
createToDoBtn.innerHTML = "Lägg till";
createNewToDoBtn.innerHTML = "Ny lista";
hideCompletedToDosBtn.innerHTML = "Göm/Visa klara";
toDoUlListHeader.innerHTML = "Aktiva:";
completedToDoUlListHeader.innerHTML = "Klara:";

//Functions

function loadToLS() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function loadFromLS(){
    let toDoLS = JSON.parse(localStorage.getItem("toDoList"));
    if(toDoLS!==null){
        toDoList = toDoLS.map((toDos) => {
        return new ToDoObject(toDos.toDo, toDos.status);
      }); 
    }

}

function createHTML () {
    completeToDoListUlTag.innerHTML = "";
    toDoListUlTag.innerHTML = "";
    for(let i=0; i< toDoList.length; i++){
        //Skapar <li>
        let newTask = document.createElement("li"); 

        //Skapar 4 divar innuti <li>


        let iconsContainer = document.createElement("div");
        newTask.appendChild(iconsContainer);
        iconsContainer.classList.add("iconContainer");

        let toTrashIcon = document.createElement("div"); 
        toTrashIcon.innerHTML ="<i class='fa-solid fa-trash-can'></i>";
        iconsContainer.appendChild(toTrashIcon);
        toTrashIcon.classList.add("hideIcon");
        
        let fromTrashIcon = document.createElement("div"); 
        fromTrashIcon.innerHTML ="<i class='fa-solid fa-trash-can-arrow-up'></i>";
        iconsContainer.appendChild(fromTrashIcon);
        fromTrashIcon.classList.add("hideIcon");

        let newTaskContent = document.createElement("div");
        newTaskContent.innerHTML = toDoList[i].toDo;
        newTask.appendChild(newTaskContent);
        

        if (toDoList[i].status==="complete"){
            
            completeToDoListUlTag.appendChild(newTask);


        }
        else {
            toDoListUlTag.appendChild(newTask);

            
        }
        toTrashIcon.addEventListener("click", ()=>{
            
                toDoList[i].status = "complete"  
                completeToDoListUlTag.appendChild(newTask);
                toTrashIcon.classList.add("hideIcon");
                loadToLS();
        })
        fromTrashIcon.addEventListener("click", ()=>{
            
                toDoList[i].status = "active";
                toDoListUlTag.appendChild(newTask);
                fromTrashIcon.classList.add("hideIcon");
                loadToLS();
        })
   
        toTrashIcon.addEventListener("mouseenter", ()=>{
            toTrashIcon.style.transform = "scale(1.1)";

        })
        toTrashIcon.addEventListener("mouseleave", ()=>{
            toTrashIcon.style.transform = "scale(1)";
        })
        fromTrashIcon.addEventListener("mouseenter", ()=>{
            fromTrashIcon.style.transform = "scale(1.1)";

        })
        fromTrashIcon.addEventListener("mouseleave", ()=>{
            fromTrashIcon.style.transform = "scale(1)";
        })
        newTask.addEventListener("mouseenter", ()=>{
            if (toDoList[i].status ==="active"){
                toTrashIcon.classList.remove("hideIcon");
            }
            else{
                fromTrashIcon.classList.remove("hideIcon");
            }

        })
        newTask.addEventListener("mouseleave", ()=>{
            if (toDoList[i].status ==="active"){
                toTrashIcon.classList.add("hideIcon");
            }
            else{
                fromTrashIcon.classList.add("hideIcon");
            }
        })
     }
}

function clearInput(){
    userInputEl.value = "";
}
function hideCompletedList(){
    completedToDoUlContainer.classList.toggle("hidden");
}

let toDoList = [];
loadFromLS();
createHTML();

//Events

createToDoBtn.addEventListener("click", ()=>{

    if (userInputEl.value===""){
        alert("Du har glömt att skriva toDo");
    }
    else{
        loadFromLS();
        let newToDo = new ToDoObject(userInputEl.value, "active");
        toDoList.push(newToDo);
        loadToLS();
        clearInput();
        createHTML();
    }
});


createNewToDoBtn.addEventListener("click", ()=>{
    toDoList = [];
    loadToLS();
    loadFromLS();
    createHTML();
});


hideCompletedToDosBtn.addEventListener("click", hideCompletedList);




 







