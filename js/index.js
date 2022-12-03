if (document.URL.indexOf('index.html') >= 0 || document.URL.indexOf('incomplete.html') >= 0) {
  window.onload = updateToDoList();
}
window.onload = updateCompleted();

document.getElementById('newToDoItem').addEventListener("keyup", (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    saveItem();
  }
});


function saveItem(){
  storedList = JSON.parse(localStorage.getItem("toDoItems"));
  storedList.push(document.getElementById('newToDoItem').value);
  localStorage.setItem('toDoItems', JSON.stringify(storedList));
  updateToDoList();
  document.getElementById('newToDoItem').value = "";
}

function saveCompleted(item) {
    storedComplete = JSON.parse(localStorage.getItem("completedItems"));
    storedComplete.push(item);
    localStorage.setItem('completedItems', JSON.stringify(storedComplete));
}

function printNothingToDo() {
    nothingtodo = "<div class='mb-2 col-md-12'><p class='mb-2 mt-2 text-center text-light border border-light p-3'><i class='fa-solid fa-thumbs-up mx-4'></i>Thumbs up - theres nothing to do!</p></div>";
    document.getElementById('toDoContainer').innerHTML = nothingtodo;
          
}

function printNothing() {
    nothingtodo = "<div class='mb-2 col-md-12'><p class='text-center border p-3'><i class='fa-solid fa-hourglass'></i>&nbsp;&nbsp; Times ticking... better get things done</p></div>";
    document.getElementById('completedContainer').innerHTML = nothingtodo;
}

function updateCompleted() {
    if (localStorage.getItem("completedItems") === null) {
        blankArray = [];
        localStorage.setItem("completedItems", JSON.stringify(blankArray));
        printNothing() 
    } else if (localStorage.getItem("completedItems") === "[]") {
        printNothing();
    } else {
        storedList = JSON.parse(localStorage.getItem("completedItems"));
        completedContainer = document.createElement('div');
        storedList.forEach((item, index) => {
            div = document.createElement('div');
            div.setAttribute('class', 'mb-2 col-md-12');
            if (document.URL.indexOf('index.html') >= 0) {
              div.innerHTML = "<div class='alert alert-success mb-1' id=item-" + index + ")')' onclick='deleteComplete("+index+")'><p class='mb-0'><i class='far fa-circle'></i>&nbsp;" + item + "</p></div>";
            } else {
              div.innerHTML = "<div class='alert alert-success mb-1' id=item-" + index + ")')'><p class='mb-0'><i class='far fa-circle'></i>&nbsp;" + item + "</p></div>";
            }
            completedContainer.appendChild(div);
        })
        document.getElementById('completedContainer').innerHTML = completedContainer.innerHTML;
    }
}

function deleteCompleted() {
    localStorage.removeItem('completedItems')
    updateCompleted();
}

function updateToDoList() {
  if (localStorage.getItem("toDoItems") === null) { //  if array doesnt exist make one
    blankArray = [];
    localStorage.setItem("toDoItems", JSON.stringify(blankArray));
    printNothingToDo();
  } else if (localStorage.getItem("toDoItems") === "[]") { //  if array does exist but is empty
    printNothingToDo();
  } else {
    storedList = JSON.parse(localStorage.getItem("toDoItems")); //get localstorage and turn into array
    toDoContainer = document.createElement('div'); //go through array and write a new alert box for each
    storedList.forEach(function(item, index) {
      div = document.createElement('div');
      div.setAttribute('class', 'mb-2 col-md-12');
      if(document.URL.indexOf('index.html') >= 0) {
        div.innerHTML = "<div class='alert alert-primary mb-1' id=item-" + index + ")' onclick='complete("+index+" )' ><p class='mb-0'><i class='far fa-circle'></i>&nbsp;" + item + "</p></div>";
      } else {
        div.innerHTML = "<div class='alert alert-primary mb-1' id=item-" + index + ")'><p class='mb-0'><i class='far fa-circle'></i>&nbsp;" + item + "</p></div>";
      }
      toDoContainer.appendChild(div);
    });
    document.getElementById('toDoContainer').innerHTML = toDoContainer.innerHTML;
  }
}

function sortAscending(x) {

  if (x == 1) {
    storedList = JSON.parse(localStorage.getItem('toDoItems'));
    localStorage.setItem('toDoItems', JSON.stringify(storedList.sort()))
    updateToDoList();
  } else if (x == 2) {
    storedList = JSON.parse(localStorage.getItem('completedItems'));
    localStorage.setItem('completedItems', JSON.stringify(storedList.sort()))
    updateCompleted();
  }

}


function sortDescending(x) {

  if (x == 1) {
    storedList = JSON.parse(localStorage.getItem('toDoItems'));
    localStorage.setItem('toDoItems', JSON.stringify(storedList.reverse()))
    updateToDoList();
  } else if (x == 2) {
    storedList = JSON.parse(localStorage.getItem('completedItems'));
    localStorage.setItem('completedItems', JSON.stringify(storedList.reverse()))
    updateCompleted();
  }

}


function complete(index) {
    saveCompleted(storedList[index])
    updateCompleted();

    storedList = JSON.parse(localStorage.getItem("toDoItems"));
    storedList = storedList.filter((item) => {
        return item !== storedList[index]
    })
    localStorage.setItem('toDoItems', JSON.stringify(storedList))
    
    updateToDoList();
}

function deleteComplete(index) {
  storedList = JSON.parse(localStorage.getItem("completedItems"));
  storedList = storedList.filter((item) => {
    return item !== storedList[index]
  })
  localStorage.setItem('completedItems', JSON.stringify(storedList))

  updateCompleted();
}