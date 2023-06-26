const list_element = document.getElementById("list");
const create_button = document.getElementById("create");


// Initialize an empty list for my tasks 
let todos = [];

create_button.addEventListener("click", CreateNewTodo);

function CreateNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }
    // Add elemeent top of the list
    todos.unshift(item);

    const { item_element, input_element } = CreateTodoElement(item);

    list_element.prepend(item_element);

    // We create element and we want to see it
    input_element.removeAttribute("disabled");
    // I want to target the element i created
    input_element.focus();

    Save();
}



/* <div class="item">
    <input type="checkbox">
    <input type="text" class="text" value="Write here your task" disabled>
    <div class="actions">
        <button class="material-icons">edit_note</button>
        <button class="material-icons remove-btn">delete</button>
    </div>
</div> */



function CreateTodoElement(item) {
    // <div class="item">
    const item_element = document.createElement("div");
    item_element.classList.add("item");

    // <input type="checkbox">
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        item_element.classList.add("complete");
    }

    // <input type="text" class="text" value="Write here your task" disabled></input>
    const input_element = document.createElement("input");
    input_element.type = "text";
    input_element.value = item.text;
    input_element.setAttribute("disabled", "");

    // <div class="actions"></div>
    const actions_element = document.createElement("button");
    actions_element.classList.add("actions");

    // <button class="material-icons">edit_note</button>
    const edit_button = document.createElement("button");
    edit_button.classList.add("material-icons");
    edit_button.innerHTML = "edit";

    // <button class="material-icons remove-btn">delete</button>
    const delete_button = document.createElement("button");
    delete_button.classList.add("material-icons", "remove-btn");
    delete_button.innerHTML = "delete";

    // Add all this new elements in correct order 
    actions_element.append(edit_button);
    actions_element.append(delete_button);

    item_element.append(checkbox);
    item_element.append(input_element);
    item_element.append(actions_element);

    // Create events for elements 
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_element.classList.add("complete");
        } else {
            item_element.classList.remove("complete");
        }

        Save();
    });

    input_element.addEventListener("input", () => {
        item.text = input_element.value;
    });

    input_element.addEventListener("blur", () => {
        input_element.setAttribute("disabled", "");
        Save();
    });

    edit_button.addEventListener("click", () => {
        input_element.removeAttribute("disabled");
        input_element.focus();
    });

    delete_button.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);

        item_element.remove();

        Save();
    });

    return { item_element, input_element, edit_button, delete_button }
}
// Show ToDos
function DisplayTodos() {
    load();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];

        const { item_element } = CreateTodoElement(item);

        list_element.append(item_element);
    }
}

DisplayTodos();


// How to save my list: 
function Save() {
    const save = JSON.stringify(todos);

    localStorage.setItem("tasks", save);
}

function load() {
    const data = localStorage.getItem("tasks");

    if (data) {
        todos = JSON.parse(data);
    }
}