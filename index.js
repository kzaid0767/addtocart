
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playground-d1d7a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsinCart = ref(database,"cartitems")

const inputEl = document.querySelector('#input-field')
const btn = document.querySelector('#add-button')

btn.addEventListener('click',handleClick)

function handleClick(){
    let inputValue = inputEl.value

    //pushing to the database in firebase
    push(itemsinCart,inputValue)
    console.log(inputValue)
}