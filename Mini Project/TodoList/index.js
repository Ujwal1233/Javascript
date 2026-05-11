let todolist=document.getElementById('todolist')
function AddTask(){
    let  input=document.getElementById('todoInput').value
    if(input !==''){
        let listItem=document.createElement('li')
        listItem.textContent=input
   todolist.appendChild(listItem)
   input.value=''
    }
    else{
        alert("Please enter a task")
    }
}

function RemoveTask(){
    let lastItem=todolist.lastChild
    if(lastItem){
        todolist.removeChild(lastItem)
    }
    else{
        alert("No tasks to remove")
    }
}