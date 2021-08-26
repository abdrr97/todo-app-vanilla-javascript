const todoInputEl = document.querySelector('#todo-input')
const btnAddTodo = document.querySelector('#btn-add-todo')
const listEL = document.querySelector('#list')

// loading data from our localstorage if is there any thing there or else []
const todosList = JSON.parse(localStorage.getItem('todos')) || []

// loading theme from local storage
loadTheme()
// this with render the array the ui
// if our todolist array contains any data
showAllTodos()

btnAddTodo.addEventListener('click', function () {
  // instantiating a todo object with all data we need
  const todoObject = {
    id: Date.now(),
    text: todoInputEl.value,
    status: false,
  }

  // adding / pushing the object to out todoList array
  todosList.push(todoObject)
  // and saving the hole array in the local storage
  // our local storage undertand string only so we need to
  // stringify our list
  localStorage.setItem('todos', JSON.stringify(todosList))

  // refreshing / updating the ui with our new data
  showAllTodos()
})

function showAllTodos() {
  // clearing the list before adding any thing or this will duplicate the array
  listEL.innerHTML = ''
  // looping trough the array
  todosList.forEach(function (todo, idx) {
    // showing todo as an <li> tag
    // with <button> so we can delete it later
    // the id in button is a refrece to every todo's index
    // in the array
    listEL.innerHTML += `
        <li class='todo'> ${todo.text}
            <button id=${idx} class='btn delete-todo'>x</button>
        </li>
    `
  })

  // deleting a todo
  // selecting all buttons after adding a todo
  const btnDeleteTodo = document.querySelectorAll('button.delete-todo')
  // looping trough all of them
  btnDeleteTodo.forEach(function (btn, idx) {
    // adding a click event
    btn.addEventListener('click', function (e) {
      // remove one item from the todoList array
      todosList.splice(e.target.id, 1)
      // re-assigning the array to local storage
      localStorage.setItem('todos', JSON.stringify(todosList))

      // refeshing UI
      showAllTodos()
    })
  })
}

function loadTheme() {
  //  loads theme-mode from localstorage
  let st = localStorage.getItem('theme') || 'dark-mode'
  // selected all buttons from HTML
  const btns = document.querySelectorAll('button.theme-btn')
  const body = document.body
  // applay selected theme mode to body tag
  body.className = st

  // make the button selected
  btns.forEach((btn) => btn.id === st && btn.classList.add('active-theme'))

  // loops trough all button and adds a click event to all of them
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      body.className = e.target.id
      localStorage.setItem('theme', e.target.id)

      // re-assigning selected theme
      st = e.target.id

      btns.forEach((btn) => {
        btn.classList.remove('active-theme')
      })
      e.target.classList.add('active-theme')
    })
  })
}
