const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

let editItemId

//check
let todos = JSON.parse(localStorage.getItem('list')) ? 
JSON.parse(localStorage.getItem('list')) : []

if(todos.length) showTodos()

//setlocalstroge
function setTodos(){
    localStorage.setItem('list', JSON.stringify(todos))
}

//time
function getTime(){
    let now =  new Date();
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let month = now.getMonth() < 10 ? '0' +(now.getMonth()+1) : now.getMonth()
    let year = now.getFullYear()

    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    let month_title = now.getMonth() 
    fullDay.textContent = `${date} ${months[month_title]} ${year}`

    hourEl.textContent = hour;
    minuteEl.textContent = minute;
    secondEl.textContent = second

   return `${hour}:${minute},${date}.${month}.${year}`;
}

setInterval(getTime, 1000)

//show todos
function showTodos(){
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todos.forEach((item, index) => {
        listGroupTodo.innerHTML += `
        <li ondblclick="setCompleted(${index})" class="list-group-item d-flex justify-content-between ${item.completed==true ? 'complated' : ''}">${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick=(editTodo(${index})) src="https://cdn.pixabay.com/photo/2013/07/12/18/38/edit-153612_1280.png" alt="edit-icon" width="19" height="19">
            <img onclick=(deleteTodo(${index})) src="https://icon-library.com/images/delete-icon-image/delete-icon-image-15.jpg" alt="delete-icon" width="20" height="20" padding-bottom="3">
          </div>
        </li>
        `
    });

}


//delete Todo
function deleteTodo(id) {
    const deletedTodos = todos.filter((item, i)=>{
        return i !== id
    })
    
    todos = deletedTodos;
    setTodos()
    showTodos()
}

//completed todo
function setCompleted(id) {
    const completetodos = todos.map((item, i)=>{
        if(id == i){
             return{...item, completed: item.completed==true ? false : true}
        } else {
            return {...item}
        }
})
todos = completetodos
    setTodos()
    showTodos()
}
//edit form
formEdit.addEventListener('submit', (e)=>{
    e.preventDefault()
    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if(todoText.length){
        todos.splice(editItemId, 1, {text:todoText, time:getTime(), completed:false})
       setTodos()
       showTodos()
       close()
    }
    else {
        showMessage('message-edit', 'Please, enter some text...')
    }
})

//edit Todo
function editTodo(id){
    open()
    editItemId = id
}

overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)


document.addEventListener('keydown', (e)=>{
    if(e.which==27){
        close()
    }
})

function open(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function close(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

//show error
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message
   
    setTimeout(()=>{
        document.getElementById(`${where}`).textContent = ''
    },3000)
}

 

//get todos
formCreate.addEventListener('submit', (e)=>{
    e.preventDefault()

    const todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if(todoText.length){
        todos.push({text:todoText, time:getTime(), completed:false})
       setTodos()
       showTodos()
    }
    else {
        showMessage('message-create', 'Please, enter some text...')
    }
    
} )

