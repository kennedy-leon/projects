//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos = [];

// console.log(clearButton);

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAllTodo);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                //
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important"); //? !important bu komudun öncelikli çalışmasını sağlar(bootstrapte li özelliği yüzünden display : none yapamıyorduk)
            }
        });
    }else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır!");
    }
}

function removeTodoToUI(e) {
    // Ekrandan Silme
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storage'den Silme
        removeTodoToStorage(todo.textContent);
        showAlert("success", todo.textContent + " Başarıyla Silindi")

    }
}

function removeAllTodo() {
    //Ekrandan(önyüz) Silme
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            todo.remove();
        });
        //Local Storageden Silme
        // localStorage.removeItem("todos");    //? Todos değerini komple sildik
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));   //? todos arrayinin içini boşalttık
        showAlert("success", "Tüm todolar başarıyla silindi!");
    } else {
        showAlert("warning", "Silmek için en az bir todo olmalıdır");
    }




}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === removeTodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lütfen boş bırakmayınız!");
    } else {
        //Arayüze Ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", inputText + " başarıyla eklendi");
    }
    e.preventDefault() //başka eylem yapılmasını engeller
}

function addTodoToUI(newTodo) {
    // <li class="list-group-item d-flex justify-content-between">Todo 1
    //                         <a href="#" class="delete-item">
    //                             <i class="fa fa-remove"></i>
    //                         </a>
    //                     </li>

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.append(li);
    addInput.value = "";
}


function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

}

function showAlert(type, message) {
    // <div class="alert alert-warning" role="alert">
    //                     This is a warning alert—check it out!
    //                   </div>
    const div = document.createElement("div");
    // div.className = "alert alert-"+type;     //1.yöntem
    div.className = `alert alert-${type}`;   //2.yöntem
    div.textContent = message;

    firstCardBody.appendChild(div);

    // div.style.marginTop = "40px";

    setTimeout(function () {
        div.remove();
    }, 2500);
}


