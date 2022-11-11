import {ToDoObject} from "./models/todoobject"

//All creations

let mainContainer = document.createElement("div");
const toDoHeader = document.createElement("h1");
const userInputLabelEl = document.createElement("label");
const userInputEl = document.createElement("input");
const btnContainer = document.createElement("div");
const createToDoBtn = document.createElement("button");
const createNewToDoBtn = document.createElement("button");
const hideCompletedToDosBtn = document.createElement("button");
let toDoUlContainer = document.createElement("div");
let completedToDoUlContainer = document.createElement("div");
let toDoListUlTag = document.createElement("ul");
let completeToDoListUlTag = document.createElement("ul");
const toDoListHeaderContainer = document.createElement("div");
const toDoUlListHeader = document.createElement("h2");
const toDoListHeaderSortAz = document.createElement("div");
const toDoListHeaderSortZa = document.createElement("div");
const completedToDoUlListHeader = document.createElement("h2");

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

// toDoUlContainer.appendChild(toDoUlListHeader);

toDoUlContainer.appendChild(toDoListHeaderContainer);
toDoListHeaderContainer.appendChild(toDoUlListHeader);
toDoListHeaderContainer.appendChild(toDoListHeaderSortAz);
toDoListHeaderContainer.appendChild(toDoListHeaderSortZa);
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
toDoUlContainer.classList.add("container__toDosContainer");
completedToDoUlContainer.classList.add("container__toDosContainer");
toDoListHeaderContainer.classList.add("container__toDosContainer__activeToDosHeader");


//Create attributes

userInputLabelEl.setAttribute("for", "userInput");
userInputEl.type ="text";
userInputEl.autocomplete = "off";
userInputEl.placeholder = "Skriv här..";
createToDoBtn.type = "button";
createNewToDoBtn.type = "button";
hideCompletedToDosBtn.type ="button";

//Set innerHTML

toDoHeader.innerHTML = "ToDo Lista";
userInputLabelEl.innerHTML = "Skriv dagens uppgift:";
createToDoBtn.innerHTML = "Lägg till";
createNewToDoBtn.innerHTML = "Ny lista";
hideCompletedToDosBtn.innerHTML = "Göm/Visa klara";
toDoUlListHeader.innerHTML = "Pågående:";
completedToDoUlListHeader.innerHTML = "Klara:";
toDoListHeaderSortAz.innerHTML = "<i class='fa-solid fa-arrow-down-a-z'></i>";
toDoListHeaderSortZa.innerHTML = "<i class='fa-solid fa-arrow-up-a-z'></i>";

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

        let doneIcon = document.createElement("div"); 
        doneIcon.innerHTML ="<i class='fa-solid fa-check'></i>";
        iconsContainer.appendChild(doneIcon);
        doneIcon.classList.add("hideIcon");
        
        let undoIcon = document.createElement("div"); 
        undoIcon.innerHTML ="<i class='fa-solid fa-rotate-left'></i>";
        iconsContainer.appendChild(undoIcon);
        undoIcon.classList.add("hideIcon");

        let newTaskContent = document.createElement("div");
        newTaskContent.innerHTML = toDoList[i].toDo;
        newTask.appendChild(newTaskContent);

        let trashIcon = document.createElement("div"); 
        trashIcon.innerHTML ="<i class='fa-regular fa-trash-can'></i>";
        newTask.appendChild(trashIcon);
        trashIcon.classList.add("hideIcon");
        
        if (toDoList[i].status==="complete"){   
            completeToDoListUlTag.appendChild(newTask);
        }
        else {
            toDoListUlTag.appendChild(newTask);  
        }

        doneIcon.addEventListener("click", ()=>{
                toDoList[i].status = "complete"  
                completeToDoListUlTag.appendChild(newTask);
                doneIcon.classList.add("hideIcon");
                loadToLS();
        })

        undoIcon.addEventListener("click", ()=>{
                toDoList[i].status = "active";
                toDoListUlTag.appendChild(newTask);
                undoIcon.classList.add("hideIcon");
                loadToLS();
        })

        trashIcon.addEventListener("click", ()=>{
                toDoList[i].status = "trash";
                deleteToDo(toDoList,i);
                loadToLS();
                loadFromLS();
                createHTML();
        })
   
        newTask.addEventListener("mouseenter", ()=>{
            if (toDoList[i].status ==="active"){
                doneIcon.classList.remove("hideIcon");
                trashIcon.classList.remove("hideIcon");
            }
            else{
                undoIcon.classList.remove("hideIcon");
                trashIcon.classList.remove("hideIcon");
            }

        })
        newTask.addEventListener("mouseleave", ()=>{
            if (toDoList[i].status ==="active"){
                doneIcon.classList.add("hideIcon");
                trashIcon.classList.add("hideIcon");
            }
            else{
                undoIcon.classList.add("hideIcon");
                trashIcon.classList.add("hideIcon");
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

function deleteToDo (someList, index){
    someList.splice (index, 1);
}

function sortAz(){
    toDoList.sort((a,b)=>{
        let fa = a.status,
            fb = b.status;
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
    })
    toDoList.sort((a, b) => {
        let fa = a.toDo,
            fb = b.toDo;
        
        if (a.status ==="active" && b.status==="active"){
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
            
        }

    });
}
function sortZa(){
    console.log(toDoList);
    toDoList.sort((a,b)=>{
        let fa = a.status,
            fb = b.status;
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
    })
    console.log(toDoList);
    toDoList.sort((a, b) => {
        let fa = a.toDo,
            fb = b.toDo;
        
        if (a.status ==="active" && b.status==="active"){
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
            
        }

    });
    console.log(toDoList);
}

//When the page starts...

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

toDoListHeaderSortAz.addEventListener("click", ()=>{
    // loadFromLS();
    sortAz();
    loadToLS();
    createHTML();
    
})
toDoListHeaderSortZa.addEventListener("click", ()=>{
    // loadFromLS();
    sortZa();
    loadToLS();
    createHTML();
    
})


 







