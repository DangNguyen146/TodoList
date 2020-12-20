var validation = new Validation();
var TaskList = new taskService();

var isLoading = true;

loadingTodo();
loadingComplete();
ShowListTask();
loadingTodo();
loadingComplete();


function loadingTodo() {
    if (isLoading == true) {
        getEle("todo").innerHTML = `<div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>`;
        isLoading = false;
    } else
        isLoading = true;
}

function loadingli(id) {
    if (isLoading == true) {
        getEle(`animated${id}`).innerHTML = `
        
<svg class="tea" width="27" height="32" viewbox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z" stroke="var(--secondary)" stroke-width="2"></path>
<path d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34" stroke="var(--secondary)" stroke-width="2"></path>
<path id="teabag" fill="var(--secondary)" fill-rule="evenodd" clip-rule="evenodd" d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"></path>
<path id="steamL" d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="var(--secondary)"></path>
<path id="steamR" d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
        `;
        isLoading = false;
    } else
        isLoading = true;
}

function loadingComplete() {
    if (isLoading == true) {
        getEle("completed").innerHTML = `<div class="loader">
        <div class="circles">
          <span class="one"></span>
          <span class="two"></span>
          <span class="three"></span>
        </div>
        <div class="pacman">
          <span class="top"></span>
          <span class="bottom"></span>
          <span class="left"></span>
          <div class="eye"></div>
        </div>
      </div>`;
        isLoading = false;
    } else
        isLoading = true;
}


function ShowListTask() {
    TaskList.getListUserApi()
        .then(function(result) {
            CreateTable(result.data);
        })
        .catch(function(erro) {
            console.log(erro);
        })
}

function CreateTable(arr) {
    var contentTodo = "";
    var contentComplete = "";
    arr.map(function(item, i) {
        if (item.status == "todo") {
            contentTodo += `
        <li id="animated${item.id}">
            <span>${item.textTodo}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTask('${item.id}')"><i class="fa fa-trash-alt"></i></button>
                <button class="complete" onclick="clickTask('${item.id}')"><i class="far fa-check-circle"></i></button>
            </div>
        </li>
        `
        };
        if (item.status == "completed") {
            contentComplete += `
            <li id="animated${item.id}">
                <span>${item.textTodo}</span>
                <div class="buttons">
                    <button class="remove" onclick="deleteTask('${item.id}')"><i class="fa fa-trash-alt"></i></button>
                    <button class="complete" ')"><i class="fas fa-check-circle"></i></button>
                </div>
            </li>
            `
        }
    })
    getEle("todo").innerHTML = contentTodo;
    getEle("completed").innerHTML = contentComplete;
}

function deleteTask(id) {
    loadingli(id);
    TaskList.deleteUserApi(id)
        .then(function(result) {
            loadingli(id);
            ShowListTask();
        })
        .catch(function(err) {
            console.log(err);
        })
}

function clickTask(id) {
    loadingli(id);
    TaskList.getTaskById(id)
        .then(function(result) {
            var newTask = new task(result.data.id, result.data.textTodo, "completed", result.data.textTask);
            TaskList.updateUserApi(newTask)
                .then(function(result) {
                    loadingli(id);
                    ShowListTask();
                })
        })
}

function KiemTraTrung(textTodo) {
    return new Promise(function(resole, reject) {
        setTimeout(function() {
            TaskList.getListUserApi()
                .then(function(result) {
                    resole(validation.KiemTraTrung(textTodo, result.data, "Trung task"));

                })
        }, 0)
    })
}

function KiemTraRong(textTodo) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(validation.KiemTraRong(textTodo, "Mang rong"));
        }, 0)
    })
}

async function isvalueTrue(textTodo) {
    var isValid = true;
    isValid &= await KiemTraRong(textTodo);
    if (isValid == false) {
        return isValid;
    } else {
        isValid &= await KiemTraTrung(textTodo);
        loadingTodo();
    }
    return isValid;
}

getEle("addItem").addEventListener("click", async function() {
    var textTodo = getEle("newTask").value;
    var newtask = new task("", textTodo, "todo", "adasd");
    loadingTodo();
    if (await isvalueTrue(textTodo) == 0) {
        ShowListTask();
        return;
    } else {

        TaskList.addUserApi(newtask)
            .then(function(result) {
                loadingTodo();
                ShowListTask();
            })
            .catch(function(err) {
                confirm.log(err);
            })
    }
})

function getEle(id) {
    return document.getElementById(id);
}