import './scss/index.scss'
const axios = require('axios')
const userUrl = 'http://jsonplaceholder.typicode.com/users'
const titleUrl = 'http://jsonplaceholder.typicode.com/todos'
const tableBody = document.querySelector('.tablebody')
const container = document.querySelector('.container')

const storeTitle = []
const storeCompleted = []


const userPromise = fetch(userUrl)
    .then(response => response.json())
    .then(user => user.forEach((elem)=>{
        const flexWrapperDiv = document.createElement('div')
        flexWrapperDiv.classList.add('flex-wrapper')
        const divId = document.createElement('div')
        const divName = document.createElement('div')
        divId.innerHTML = elem.id
        divName.innerHTML = elem.name
        flexWrapperDiv.appendChild(divId)
        flexWrapperDiv.appendChild(divName)
        tableBody.appendChild(flexWrapperDiv)
    }))
    .then(fetch(titleUrl))
    .then(response => response)
            fetch(titleUrl)
                .then(response => response.json())
                .then(data => {
                    data.forEach((elem) => {
                        if(!storeTitle.includes(elem.userId)){
                            storeTitle.push(elem.title) 
                            storeCompleted.push(elem.completed)
                        }
                    })
                }).then(inf => {
                    storeTitle.forEach((elem, index)=>{
                        const divCompleted  = document.createElement('div')
                        const divTitle = document.createElement('div')
                         divTitle.innerHTML = storeTitle[index]
                         divCompleted.innerHTML = storeCompleted[index]
                         divTitle.setAttribute('align', 'left')
                        document.querySelectorAll('.flex-wrapper')[index].appendChild(divTitle)
                        document.querySelectorAll('.flex-wrapper')[index].appendChild(divCompleted)
                    })
                })

