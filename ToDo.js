
// Basic Functions

function isObjectEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
} 

function addEvent(date, month, year, message, status = 0, stared = 0) {

    if (!events.hasOwnProperty(year)) {
        events[year] = {};
    }
    if (!events[year].hasOwnProperty(month)) {
        events[year][month] = {};
    }
    if (!events[year][month].hasOwnProperty(date)) {
        events[year][month][date] = [];
    }
    events[year][month][date].push([status, message, stared]);
    saveEvents();
}

function loadTodo(day,month,year){
    ListContainer.innerHTML = ''
    if (TaskStatus(day,month,year)){
        arr = events[year][month][day];
        TaskInput.value = "";
        for (i in arr){
            let Element = createTask(arr[i][0],arr[i][1],arr[i][2]);

            ListContainer.appendChild(Element);
        }
    }
}

// Task Functions

function TaskStatus(day,month,year) {
    if (!events.hasOwnProperty(year)) {
        return false;
    }
    if (!events[year].hasOwnProperty(month)) {
        return false;
    }
    if (!events[year][month].hasOwnProperty(day)) {
        return false;
    }
    return true;
}

function createTask(status,task,stared) {
    let liElement = document.createElement('li');
    let checkBoxBtn = document.createElement('button');
    let taskText = document.createElement('p');
    let starBtn = document.createElement('button');
    let cancelBtn = document.createElement('button');

    const checked = '<i class="fa-regular fa-circle-check"></i>'
    const unchecked = '<i class="fa-regular fa-circle"></i>'

    const star = '<i class="fa-solid fa-star"></i>';
    const not_star = '<i class="fa-regular fa-star"></i>';
    
    taskText.innerText = task
    
    
    checkBoxBtn.setAttribute('id', 'todo-check-box');
    if (status){
        checkBoxBtn.innerHTML = checked;
        taskText.classList.add("todo-complete");
    } else {
        checkBoxBtn.innerHTML = unchecked;
    }
    checkBoxBtn.addEventListener("click", () => {
        if (checkBoxBtn.innerHTML == checked){
            taskText.classList.remove("todo-complete");
            checkBoxBtn.innerHTML = unchecked;
            completeTask(CurrDay,Months[CurrMonth],CurrYear,status,task,stared);
            status = 0;
        } else { 
            taskText.classList.add("todo-complete");
            checkBoxBtn.innerHTML = checked;
            completeTask(CurrDay,Months[CurrMonth],CurrYear,status,task,stared);
            status = 1;
        }
    })
    
    
    starBtn.setAttribute('id', 'todo-important');
    if (stared){
        starBtn.innerHTML = star;
    } else {
        starBtn.innerHTML = not_star;     
    }
    starBtn.addEventListener("click", ()=>{
        if (starBtn.innerHTML == star){
            starBtn.innerHTML = not_star;
            starTask(CurrDay,Months[CurrMonth],CurrYear,status,task,stared);
            stared = 0;
        } else {
            starBtn.innerHTML = star;
            starTask(CurrDay,Months[CurrMonth],CurrYear,status,task,stared);
             stared = 1;
        }
    })
    
    cancelBtn.setAttribute('id', 'todo-cancel');
    cancelBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    cancelBtn.addEventListener("click", ()=>{
        deleteTask(CurrDay,Months[CurrMonth],CurrYear,status,task,stared);
        liElement.remove();
    })
    
    
    liElement.appendChild(checkBoxBtn);
    liElement.appendChild(taskText);
    liElement.appendChild(starBtn);
    liElement.appendChild(cancelBtn);
    
    return liElement;
    
}

function addTask(){
    let Task = TaskInput.value;
    
    if (Task){
        let Element = createTask(0,Task,0);

        TaskInput.value = "";
    
        ListContainer.appendChild(Element);
        
        addEvent(CurrDay,Months[CurrMonth],CurrYear,Task,0,0);

    } else {
        alert("Enter some value to add Task");
    }
}

function deleteTask(day,month,year,status,task,stared) {
    if (TaskStatus(day,month,year)){
        arr = events[year][month][day];
        TaskInput.value = "";
        for (i in arr){
            if (arr[i][0] === status && arr[i][1] === task && arr[i][2] === stared) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0){
            console.log('Day deleted')
            delete events[year][month][day];
        }


        if (isObjectEmpty(events[year][month])) {
            console.log('month deleted')
            delete events[year][month];
        }

        if (isObjectEmpty(events[year])) {
            console.log('year deleted')
            delete events[year];
        }
        
        saveEvents();
        loadTodo(day,month,year);
    }
}

function completeTask(day,month,year,status,task,stared) {
    if (TaskStatus(day,month,year)){
        arr = events[year][month][day];
        TaskInput.value = "";
        for (i in arr){
            if (arr[i][0] === status && arr[i][1] === task && arr[i][2] === stared) {
                if (!status)
                    arr[i][0] = 1;
                else
                    arr[i][0] = 0;
                break;
            }
        }

        events[year][month][day] = sortTask(arr);
        saveEvents();
        loadTodo(day,month,year);
    }
}


function starTask(day,month,year,status,task,stared) {
    if (TaskStatus(day,month,year)){
        arr = events[year][month][day];
        TaskInput.value = "";
        for (i in arr){
            if (arr[i][0] === status && arr[i][1] === task && arr[i][2] === stared) {
                if (!stared)
                    arr[i][2] = 1;
                else
                    arr[i][2] = 0;
                break;
            }
        }

        events[year][month][day] = sortTask(arr);
        saveEvents();
        loadTodo(day,month,year);
    }
}




function sortTaskByStatus(arr, returnArr = 0) {
    let arr1 = [];
    let arr2 = [];
    
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === 1) {
            arr2.push(arr[i]);
        } else {
            arr1.push(arr[i]);
        }
    }
    
    if (returnArr === 1)
        return arr1;
    else if (returnArr === 2)
        return arr2;
    
    return arr1.concat(arr2);
}

function sortTaskByStar(arr) {
    let arr1 = [];
    let arr2 = [];
    
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][2] === 1) {
            arr1.push(arr[i]);
        } else {
            arr2.push(arr[i]);
        }
    }
    
    return arr1.concat(arr2);
}

function sortTask(arr) {
    arr = sortTaskByStar(sortTaskByStatus(arr,1)).concat(sortTaskByStar(sortTaskByStatus(arr,2)));
    return arr;
}


function checkToDoDay(arr) {
    let alertType = 0;
    
    for (j in arr) {
        if (!arr[j][0])
            alertType = 1;

        if (!arr[j][0] && arr[j][2])
            return 2;
        
    }
    
    return alertType;
}

// on mount

// ListContainer.innerHTML = '';
// TaskInput.value = "";

// monthLoad();
// initButtons();
// load();
// loadTodo(CurrDay,Months[CurrMonth],CurrYear);
// createTask(0,"Hi",0);

