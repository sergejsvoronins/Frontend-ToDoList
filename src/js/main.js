class ToDoObject {
    constructor(toDo){
        this.toDo = toDo;
        this.done = "klar";
    }
}
//All creations
let mainContainer = document.createElement("div");
let toDoHeader = document.createElement("h2");
let userInputLabelEl = document.createElement("label");
let userInputEl = document.createElement("input");
let btnContainer = document.createElement("div");
let createToDoBtn = document.createElement("button");
let createNewToDoBtn = document.createElement("button");
let toDoListUlTag = document.createElement("ul");
//All appends
document.body.append(mainContainer);
mainContainer.appendChild(toDoHeader);
mainContainer.appendChild(userInputLabelEl);
mainContainer.appendChild(userInputEl);
mainContainer.appendChild(btnContainer);
btnContainer.appendChild(createToDoBtn)
btnContainer.appendChild(createNewToDoBtn)
mainContainer.appendChild(toDoListUlTag);
//Create classes/ID
mainContainer.className = "container";
userInputLabelEl.className = "container__inputLabel";
userInputEl.className = "container__inputField"
btnContainer.className = "container__btnContainer";
createToDoBtn.className = "container__btnContainer__btn";
createNewToDoBtn.className = "container__btnContainer__btn";
userInputEl.id = "userInput";
//Create attributes
userInputLabelEl.setAttribute("for", "userInput");
userInputEl.setAttribute("type", "text");
userInputEl.setAttribute("placeholder", "Jag ska göra..");
createToDoBtn.setAttribute("type", "button");
createNewToDoBtn.setAttribute("type", "button");
//Set innerHTML
toDoHeader.innerHTML = "ToDo Lista"
userInputLabelEl.innerHTML = "Skriv dagens uppgift"
createToDoBtn.innerHTML = "Lägg till";
createNewToDoBtn.innerHTML = "Ny lista";




let toDoList =[];



createToDoBtn.addEventListener("click", ()=>{
    toDoListUlTag.innerHTML ="";
    let newToDo = new ToDoObject(userInputEl.value);
    toDoList.push(newToDo);
    for(let i=0; i< toDoList.length; i++){
        let counter = 0;
        let newTask = document.createElement("li");
        toDoListUlTag.appendChild(newTask);
        newTask.innerHTML = toDoList[i].toDo;
        newTask.addEventListener("click",()=>{
            if(counter%2===0){
                newTask.innerHTML = toDoList[i].done;
                counter++;
            }
            else {
                newTask.innerHTML = toDoList[i].toDo;
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
});
createNewToDoBtn.addEventListener("click", ()=>{
    toDoListUlTag.innerHTML ="";
    completedTasksUlTag.innerHTML ="";
    toDoList = [];
});





 







