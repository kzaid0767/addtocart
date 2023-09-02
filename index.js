
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playground-d1d7a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database,"cartitems")

const inputEl = document.querySelector('#input-field')
const btn = document.querySelector('#add-button')
btn.addEventListener('click',handleClick)
//ul holder for list items
const shoppingList = document.querySelector('#shopping-list')

//fetching from firebase
onValue(itemsInDB, function(snapshot){
    //making array from snapshot values
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        // console.log(itemsArray)
        //reset innerhtml
        clearShoppingListEl()
        let newInnerHTML = ``
        for(let thing of itemsArray){
            let currentItemID = thing[0]
            let currentItemValue = thing[1]
            addULHtml(thing)
        }
    } else shoppingList.innerHTML = `<li> cart is empty!</li>`
})

function handleClick(){
    let inputValue = inputEl.value

    //pushing to the database in firebase
    if(inputValue){
        push(itemsInDB,inputValue)
    }

    resetInputEl()    
    //addULHtml(inputValue)
    
}

function resetInputEl(){
    inputEl.value = ''
}

function clearShoppingListEl(){
    shoppingList.innerHTML = ''
}


function addULHtml(value){
    let [itemID,itemName] = value
    let newEl = document.createElement('li')
    newEl.textContent = itemName
    newEl.addEventListener("click",()=>deleItem(itemID))
    shoppingList.append(newEl)
}

//handle deleting from database
function deleItem(itemID){
    let exactLocationInFirebaseDB = ref(database,`cartitems/${itemID}`)
    remove(exactLocationInFirebaseDB)
}