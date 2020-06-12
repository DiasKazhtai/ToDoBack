import './scss/index.scss'
const axios = require('axios')
const userUrl = 'http://jsonplaceholder.typicode.com/users'
const titleUrl = 'http://jsonplaceholder.typicode.com/todos'
const tableBody = document.querySelector('.tablebody')
const container = document.querySelector('.container')
const outputInfo = document.querySelector('.output-info')


const tasks = []
const completed = []
const title = []

    
function createDiv (){
    return document.createElement('div')
}

function complete (event){
    if (event.target.innerHTML === 'true'){
        event.target.innerHTML = 'false'
    } else{
        event.target.innerHTML = 'true'
    }
}


const userPromise = fetch(userUrl)
    .then(response => response.json())
    .then(user => user.forEach((elem, index)=>{
        const flexWrapperDiv = document.createElement('div')
        flexWrapperDiv.classList.add('flex-wrapper')
        const divId = createDiv()
        const divName = createDiv()
        divName.setAttribute('data-id', index)
        divId.innerHTML = elem.id
        divName.innerHTML = elem.name
        const input = document.createElement('input')
        divName.addEventListener('click', event => {
            const taskPrommise = fetch(titleUrl)
                .then(response => response.json())
                .then(data => {
                    if(Number(event.target.dataset.id) + 1){
                        data.forEach((elem, index)=>{
                            if(elem.userId == Number(event.target.dataset.id) + 1){
                                const divTitle = createDiv()
                                const divCompleted = createDiv()
                                const deleteButton = document.createElement('button')
                                const newTask = document.createElement('input')
                                deleteButton.innerHTML = 'Удалить'
                                divTitle.innerHTML = elem.title
                                divCompleted.innerHTML = elem.completed
                                divCompleted.classList.add('completed')
                                deleteButton.addEventListener('click', ()=>{
                                    divCompleted.remove()
                                    divTitle.remove()
                                    deleteButton.remove()
                                })
                                divCompleted.addEventListener('click', event=>{
                                    if(event.target.innerHTML == 'true'){
                                        event.target.innerHTML = 'false'
                                        divTitle.style = "text-decoration:none"
                                    }else {
                                        event.target.innerHTML = 'true'
                                        divTitle.style = "text-decoration:line-through"
                                        
                                    }
                                })
                                const outputWrapper = createDiv()
                                outputWrapper.classList.add('output-wrapper')
                                outputWrapper.appendChild(divTitle)
                                outputWrapper.appendChild(divCompleted)
                                outputWrapper.appendChild(deleteButton)
                                outputInfo.appendChild(outputWrapper)
                                
                            }
                        })
                    }
                })
        })
        flexWrapperDiv.appendChild(divId)
        flexWrapperDiv.appendChild(divName)
        tableBody.appendChild(flexWrapperDiv)
    }))
    .then(fetch(titleUrl))
    .then(response => response)
          
