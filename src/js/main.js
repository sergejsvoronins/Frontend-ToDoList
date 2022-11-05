class ToDoObject {
    constructor(toDo){
        this.toDo = toDo;
    }
}
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
userInputEl.setAttribute("placeholder", "Jag ska göra..");
createToDoBtn.setAttribute("type", "button");
createNewToDoBtn.setAttribute("type", "button");
showCompletedToDosBtn.setAttribute("type", "button");

//Set innerHTML

toDoHeader.innerHTML = "ToDo Lista";
userInputLabelEl.innerHTML = "Skriv dagens uppgift:";
createToDoBtn.innerHTML = "Lägg till";
createNewToDoBtn.innerHTML = "Ny lista";
showCompletedToDosBtn.innerHTML = "Visa klara";
toDoUlListHeader.innerHTML = "Aktiva:";
completedToDoUlListHeader.innerHTML = "Klara:";



let toDoList =[];

createToDoBtn.addEventListener("click", ()=>{
    if (userInputEl.value===""){
        alert("Du har glömt att skriva toDo");
    }
    else{
        toDoListUlTag.innerHTML ="";
        let newToDo = new ToDoObject(userInputEl.value);
        toDoList.push(newToDo);
        clearInput();
    for(let i=0; i< toDoList.length; i++){
        let counter = 0;
        let newTask = document.createElement("li");
        toDoListUlTag.appendChild(newTask);
        newTask.innerHTML = toDoList[i].toDo;
        newTask.addEventListener("click",()=>{

            if(counter%2===0){
                // newTask.innerHTML = toDoList[i].done;
                completeToDoListUlTag.appendChild(newTask);
                counter++;
            }
            else {
                // newTask.innerHTML = toDoList[i].toDo;
                toDoListUlTag.appendChild(newTask);
                counter++;
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

    
});
createNewToDoBtn.addEventListener("click", ()=>{
    toDoListUlTag.innerHTML ="";
    completeToDoListUlTag.innerHTML ="";
    toDoList = [];
    completedToDoUlContainer.className = "hidden";
});
showCompletedToDosBtn.addEventListener("click", hideCompletedList);
function clearInput(){
    userInputEl.value = "";
}
function hideCompletedList(){
    completedToDoUlContainer.classList.toggle("hidden");
}


 







