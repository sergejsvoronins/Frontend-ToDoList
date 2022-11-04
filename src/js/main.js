class ToDoObject {
    constructor(toDo){
        this.toDo = toDo;
    }
}

//All creations
let mainContainer = document.createElement("div");
let toDoHeader = document.createElement("h2");
let userInputLabelEl = document.createElement("label");
let userInputEl = document.createElement("input");
let createToDoBtn = document.createElement("button");
let createNewToDoBtn = document.createElement("button");
let toDoListUlTag = document.createElement("ol");



//All appends
document.body.append(mainContainer);
mainContainer.appendChild(toDoHeader);
mainContainer.appendChild(userInputLabelEl);
mainContainer.appendChild(userInputEl);
mainContainer.appendChild(createToDoBtn);
mainContainer.appendChild(createNewToDoBtn);
mainContainer.appendChild(toDoListUlTag);


//Create classes/ID
mainContainer.className = "container"
userInputLabelEl.className = "container__inputLabel";
userInputEl.className = "container__inputField"
createToDoBtn.className = "container__btn";
createToDoBtn.className = "container__btn";
userInputEl.id = "userInput";


//Create attributes
userInputLabelEl.setAttribute("for", "userInput");
userInputEl.setAttribute("type", "text");
userInputEl.setAttribute("placeholder", "Jag ska göra..");

createToDoBtn.setAttribute("type", "button");
//Set innerHTML
toDoHeader.innerHTML = "ToDo List"
userInputLabelEl.innerHTML = "Vad ska du göra?"
createToDoBtn.innerHTML = "Skapa uppgift";
createNewToDoBtn.innerHTML = "Skapa en ny lista";



let toDoList =[];


createToDoBtn.addEventListener("click", addToDo);
createNewToDoBtn.addEventListener("click", addNewToDo);



function addToDo(){
    toDoListUlTag.innerHTML ="";
    let newToDo = new ToDoObject(userInputEl.value);
    toDoList.push(newToDo);
    for(let i=0; i< toDoList.length; i++){
        let newTask = document.createElement("li");
        toDoListUlTag.appendChild(newTask);
        newTask.innerHTML = toDoList[i].toDo;
        console.log(toDoList);
    }
    
}


function addNewToDo(){
    toDoListUlTag.innerHTML ="";
}





