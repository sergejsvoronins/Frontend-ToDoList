import {ToDoObject} from "./models/todoobject"


 
//All creations
let mainContainer = document.createElement("div");
let toDoHeader = document.createElement("h1");
let userInputLabelEl = document.createElement("label");
let userInputEl = document.createElement("input");
let btnContainer = document.createElement("div");
let createToDoBtn = document.createElement("button");
let createNewToDoBtn = document.createElement("button");
let showCompletedToDosBtn = document.createElement("button");
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
btnContainer.appendChild(showCompletedToDosBtn)
toDoUlContainer.appendChild(toDoUlListHeader);
toDoUlContainer.appendChild(toDoListUlTag);
completedToDoUlContainer.appendChild(completedToDoUlListHeader);
completedToDoUlContainer.appendChild(completeToDoListUlTag);

//Create classes/ID

mainContainer.className = "container";
userInputLabelEl.className = "container__inputLabel";
userInputEl.className = "container__inputField";
btnContainer.className = "container__btnContainer";
createToDoBtn.className = "container__btnContainer__btn";
createNewToDoBtn.className = "container__btnContainer__btn";
showCompletedToDosBtn.className = "container__btnContainer__btn";
userInputEl.id = "userInput";
completedToDoUlContainer.classList.add("hidden");

//Create attributes

userInputLabelEl.setAttribute("for", "userInput");
userInputEl.setAttribute("type", "text");
userInputEl.setAttribute("autocomplete", "off");
userInputEl.setAttribute("placeholder", "Jag ska göra..");
createToDoBtn.type = "button";
createNewToDoBtn.type = "button";
showCompletedToDosBtn.type ="button";

//Set innerHTML
toDoHeader.innerHTML = "ToDo Lista";
userInputLabelEl.innerHTML = "Skriv dagens uppgift:";
createToDoBtn.innerHTML = "Lägg till";
createNewToDoBtn.innerHTML = "Ny lista";
showCompletedToDosBtn.innerHTML = "Visa klara";
toDoUlListHeader.innerHTML = "Aktiva:";
completedToDoUlListHeader.innerHTML = "Klara:";

function loadToLS() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function loadFromLS(){
    let toDoLS = JSON.parse(localStorage.getItem("toDoList"));
    if(toDoLS!==null){
        toDoList = toDoLS.map((toDos) => {
        return new ToDoObject(toDos.toDo, toDos.status, toDos.counter);
      }); 
    }

}

function createHTML () {
    completeToDoListUlTag.innerHTML = "";
    toDoListUlTag.innerHTML = "";
    for(let i=0; i< toDoList.length; i++){
        let newTask = document.createElement("li");
        newTask.innerHTML = toDoList[i].toDo;

        let checkIcon = document.createElement("div");
        checkIcon.innerHTML ="<i class='fa-solid fa-check'></i>";


        newTask.appendChild(checkIcon);


        
        
        if (toDoList[i].status==="complete"){
            
            completeToDoListUlTag.appendChild(newTask);
            checkIcon.classList.remove("hideCheckIcon");
        }
        else {
            toDoListUlTag.appendChild(newTask);
            checkIcon.classList.add("hideCheckIcon");

        }
        newTask.addEventListener("click", ()=>{
            if (toDoList[i].counter%2 === 0){
                toDoList[i].status = "complete";
                checkIcon.classList.remove("hideCheckIcon");
                toDoList[i].counter++;
                completeToDoListUlTag.appendChild(newTask);
                loadToLS();
            }
            else {
                toDoList[i].status = "active";
                toDoList[i].counter++;
                toDoListUlTag.appendChild(newTask);
                checkIcon.classList.add("hideCheckIcon");
                loadToLS();
                
            }
        })
   
        newTask.addEventListener("mouseenter", ()=>{
            newTask.style.fontWeight = "700";

        })
        newTask.addEventListener("mouseleave", ()=>{
            newTask.style.fontWeight = "400";
        })
     }
}

function clearInput(){
    userInputEl.value = "";
}
function hideCompletedList(){
    completedToDoUlContainer.classList.toggle("hidden");
}
function sortByDate(arrayEl1, arrayEl2){
    toDoList.sort(()=>{
        return arrayEl1-arrayEl2;
    })
}



let toDoList = [];
loadFromLS();
// sortByDate(toDoList[0].date, toDoList[3].date);
createHTML();


createToDoBtn.addEventListener("click", ()=>{

    if (userInputEl.value===""){
        alert("Du har glömt att skriva toDo");
    }
    else{
        loadFromLS();
        let newToDo = new ToDoObject(userInputEl.value, "active", 0);
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


showCompletedToDosBtn.addEventListener("click", hideCompletedList);




 







