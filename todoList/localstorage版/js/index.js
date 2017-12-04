var todoTemplate = (text, idName, state, currentTime) => {
    log(currentTime)
    var removeSVG =
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="class-svg-remove noFill" width="22" height="22"/><g><g><path class="class-svg-remove fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="class-svg-remove fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill class-svg-remove" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="class-svg-remove fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>`
    var completeSVG =
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="class-svg-complete fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>`
    var item = document.createElement('li')
    var buttons = document.createElement('div');
    var remove = document.createElement('button');
    var complete = document.createElement('button');
    var time = document.createElement('span')
    var removeId = idName + "-" + "remove"
    var completeId = idName +  "-" + "complete"
    var input
    if (state == "unCompleted") {
        input = `<input class="${idName}+'-input' unCompleted-input" type="text" style="border:none; background:none; width:70%; height:20px;" placeholder=${text} >`
    } else if (state == "done") {
        input = `<input class="${idName}+'-input'" type="text" style="border:none; background:none; width:70%; height:20px;" disabled  placeholder=${text} >`
    }

    item.dataset.state = `${state}`
    buttons.classList.add('class-div-todoButtons');

    remove.classList.add('class-button-removeTodo');
    remove.id = removeId
    remove.innerHTML = removeSVG;
    bindEvent(remove, "click", removeTodo)

    complete.classList.add('class-button-completeTodo');
    complete.id = completeId
    complete.innerHTML = completeSVG;

    bindEvent(complete, "click", completeTodo)
    time.innerText = currentTime
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.innerHTML = input
    item.appendChild(time)
    item.appendChild(buttons);
    return item
}

var addNewTodoItem = (todoText, idName, state="unCompleted", currentTime) => {
    var html = todoTemplate(todoText, idName, state, currentTime)
    if (state == "unCompleted") {
        var allTodoList = document.querySelector("#" + idName + " "  + ".class-ul-allTodo")
        allTodoList.appendChild(html)
        return
    } else if (state == 'done') {
        var doneTodoList = document.querySelector("#" + idName + " " + ".class-ul-doneTodo")
        doneTodoList.appendChild(html)
        return
    }
}

var bindAddButtonEvent = () => {
    bindAll(".class-button-addTodo", "click", function(event) {
        var currentTime = getCurrentDate()
        var self = event.target
        var idName = self.closest('.class-div-quadrant').id
        var todoInput = e("#" + idName + " " + "#id-input-todoText")
        var todoText = todoInput.value
        if (todoText) {
            addNewTodoItem(todoText, idName, state="unCompleted", currentTime)
            addTodoToLocal(todoText, idName, state="unCompleted", currentTime)
            todoInput.value = ""
        }
    })
}

var bindEditEvent = () => {
    var oldTodoText
    var newTodoText
    var idName
    bindAll(".unCompleted-input", "focus", function(event) {
        var self = event.target
        var idName = self.closest('.class-div-quadrant').id
        oldTodoText = self.placeholder
    })
    bindAll(".unCompleted-input", "blur", function(event) {
        var self = event.target
        idName = self.closest('.class-div-quadrant').id
        newTodoText = self.value

        if (newTodoText.length != 0) {
            self.placeholder = newTodoText
            editTodoLocal(oldTodoText, newTodoText)
        } else {
            return
        }
    })

}

var removeTodo = (event) => {
    var self = event.target
    var parentLi = self.closest("li")
    var idName = parentLi.closest(".class-div-container").parentNode.id
    parentLi.classList.add("removeLi")
    setTimeout(function() {
        parentLi.remove()
        removeTodoToLocal(parentLi.innerText, idName, parentLi.dataset.state)
    }, 300)
}

//根据传入的event创建节点
var completeTodo = (event) => {
    var self = event.target
    var parentLi = self.closest("li")
    var idName = parentLi.closest(".class-div-container").parentNode.id
    var state = parentLi.dataset.state
    var currentTime = parentLi.childNodes[1].innerText
    var text
    if (state == "unCompleted") {
        var doneList = e("#" + idName + " " + ".class-ul-doneTodo")
        var input = parentLi.firstChild
        input.style="background:#fff;border:none;"
        input.disabled="disabled"
        input.classList.remove("unCompleted-input")
        parentLi.dataset.state = "done"
        doneList.appendChild(parentLi)
        text = parentLi.firstChild.placeholder
    } else if (state == "done"){
        var unCompleteList = e("#" + idName + " " + ".class-ul-allTodo")
        var input = parentLi.firstChild
        input.classList.add("unCompleted-input")
        if (input.disabled) {
            input.removeAttribute("disabled")
        }

        text = parentLi.firstChild.placeholder
        parentLi.dataset.state = "unCompleted"
        unCompleteList.appendChild(parentLi)
    }
    completeTodoToLocal(text, idName, parentLi.dataset.state, currentTime)
}

var upDateLocal = (localData) => {
    var localDataStringify = JSON.stringify(localData)
    localStorage.todoData = localDataStringify
}

var editTodoLocal = (oldTodoText, newTodoText) => {
    var allData = getLocalData()
    var targetArray = allData.newTodo
    var index
    for (var i = 0; i < targetArray.length; i++) {
        var item = targetArray[i]
        if (item.text == oldTodoText) {
            index = i
            break
        }
    }
    allData.newTodo[index].text = newTodoText
    upDateLocal(allData)
}

var addTodoToLocal = (todoText, idName, state="unCompleted", currentTime) => {
    var newItem = {
        text:todoText,
        state,
        idName,
        time:currentTime,
    }
    var localData = getLocalData()
    localData.newTodo.push(newItem)
    upDateLocal(localData)
}

var removeTodoToLocal = (todoText, idName, state) => {
    var allData = getLocalData()//对象
    var targetArray
    var index
    var label
    if (state == "unCompleted") {
        targetArray = allData.newTodo
        label = true
    } else if (state == "done"){
        targetArray = allData.doneTodo
        label = false
    }

    for (var i = 0; i < targetArray.length; i++) {
        var item = targetArray[i]
        if (item.text == todoText) {
            index = i
            break
        }
    }
    if (label) {
        allData.newTodo.splice(index, 1)
    } else {
        allData.doneTodo.splice(index, 1)
    }
    upDateLocal(allData)
}

var completeTodoToLocal = (todoText, idName, state, currentTime) => {
    var allData = getLocalData()
    var targetArray
    var index
    var newItem = {
        text:todoText,
        idName,
        state,
        time:currentTime,
    }
    if (state == "unCompleted") {
        targetArray = allData.doneTodo
    } else if (state == "done"){
        targetArray = allData.newTodo
    }
    for (var i = 0; i < targetArray.length; i++) {
        var item = targetArray[i]
        if (item.text == todoText) {
            index = i
        }
    }
    if (state == "unCompleted") {
        allData.doneTodo.splice(index, 1)
        allData.newTodo.push(newItem)
    } else if (state == "done") {
        allData.newTodo.splice(index, 1)
        allData.doneTodo.push(newItem)
    }
    upDateLocal(allData)
}

//返回一个对象
var getLocalData = () => {
    var localData = localStorage.todoData
    if (localData == undefined) {
        var todoData = {
            newTodo: [],
            doneTodo: [],
        }
        var newData = JSON.stringify(todoData)
        localStorage.todoData = newData
        return todoData
    }
    var parseData = JSON.parse(localData)
    return parseData
}

var insertLocalTodo = (data) => {
    var newTodoArray = data.newTodo
    for (var i = 0; i < newTodoArray.length; i++) {
        var item = newTodoArray[i]
        addNewTodoItem(item.text, item.idName, item.state, item.time)
    }
    var doneTodoArray = data.doneTodo
    for (var i = 0; i < doneTodoArray.length; i++) {
        var item = doneTodoArray[i]
        addNewTodoItem(item.text, item.idName, item.state, item.time)
    }
}

var initLocalData = () => {
    var data = getLocalData()
    log(data)
    if (data.newTodo.length == 0 && data.doneTodo.length == 0) {
        return
    }
    insertLocalTodo(data)
}

var bindEvents = () => {
    bindAddButtonEvent()
    bindEditEvent()
}

var __main = () => {
    initLocalData()
    bindEvents()
}

__main()
