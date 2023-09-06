let MainBox = document.querySelector("#mainBox")
// let EditButton;
// let DeleteButton;
let sub;
let i = 0, arr = [];
let input;

let addButton = document.getElementsByClassName("button")[0]



ADD_NOTE = (value) => {

    if (value === undefined) {
        input = ` 
        <div class="container-top">
            <button class="delete-button" id="delete" onclick="DELETE(this)" >🗑️</button>
            <button class="edit-button" id="edit"  onclick="EDIT(this)">✏️</button>
            <button class="save-button" id="save"  onclick="SAVE(this)" >🏷️</button>
            
        </div>
        <div class="container-buttom">
            <textarea class="text-area" id="t-area" cols="25" rows="6" onchange="TextArea_Change(this)" data-flag=${i} ></textarea>
        </div>`
    }
    else {
        input = ` 
        <div class="container-top">
            <button class="delete-button" id="delete" onclick="DELETE(this)" >🗑️</button>
            <button class="edit-button" id="edit"  onclick="EDIT(this)">✏️</button>
            <button class="save-button" id="save"  onclick="SAVE(this)" >🏷️</button>
            
        </div>
        <div class="container-buttom">
            <textarea class="text-area" id="t-area" cols="25" rows="6" onchange="TextArea_Change(this)" data-flag=${i} disabled>${value}</textarea>
        </div>`
    }

    sub = document.createElement('div')
    sub.classList.add('sub-container')

    sub.innerHTML = input
    MainBox.appendChild(sub)

    i++

}

function FETCH_DATA() {
    // console.log(localStorage.getItem("MyNotesApp"))
    // let j=[]
    // localStorage.setItem("MyNotesApp",JSON.stringify(j))

    console.log("FETCH_DATA ------------")
    let x = localStorage.getItem("MyNotesApp")
    console.log(x)
    //console.log(arr.length)
    if (typeof x == 'string' && JSON.parse(x).length > 0 && typeof x != 'null') {

        arr = JSON.parse(x)
        console.log(arr)
        arr.forEach(element => {
            if (element)
                ADD_NOTE(element)
        });
    }
    else { return }
}
FETCH_DATA()


function UPDATE(arr, del = false) {
    if (del != false) {
        del_value = arr.indexOf(del)
        arr.splice(del_value, 1)
        console.log("deleted.........")
        console.log(arr)
        UPDATE(arr)
        // localStorage.setItem("MyNotesApp", JSON.stringify(arr))
    }
    else if (del == false) {
        console.log("updated.........")
        console.log(arr)
        localStorage.setItem("MyNotesApp", JSON.stringify(arr))
    }
}


function SAVE(e1) {
    console.log("SAVE------------")
    let t = e1.parentElement.parentElement.children[1].children[0]
    // let index = t.dataset.flag
    let value = t.value
    // console.log(t.value)
    let arr2_values=localStorage.getItem("MyNotesApp")
    let arr2=[]
    arr2=JSON.parse(arr2_values)
    console.log(arr2)

    let index_flag=arr2.indexOf(value)
    if(index_flag==-1){
    if (value != '' && typeof value != 'null' && value != ' ') {
        //arr[index] = t.value.toString()
        arr.push(value)
        console.log(arr)
        UPDATE(arr)
        //localStorage.setItem("MyNotesApp", JSON.stringify(arr))
    }}
}


function EDIT_SAVE(k){
    let i=arr.indexOf(k.value)
    console.log("EDIT_SAVE.................")
    console.log(arr,k.value)
    if(i!=-1){
        let x = localStorage.getItem("MyNotesApp")
       
        arr=JSON.parse(x)
        console.log(arr)
        i=arr.indexOf(k.value)
        arr.splice(i,1)
        console.log(arr)
        
    }
}

function TextArea_Change(e) {
    e.setAttribute("disabled", "true")
}


function EDIT(e) {
    console.log("edit------------")
    let k = e.parentElement.parentElement.children[1].children[0]
    //console.log(k)
    EDIT_SAVE(k)
    k.removeAttribute("disabled")
}

function DELETE(e) {
    //console.log(e)
    let k = e.parentElement.parentElement.children[1].children[0]

    console.log("delete------------")
    //console.log(arr)
    e.parentElement.parentElement.remove()
    console.log(k.value)
    UPDATE(arr, k.value)

    // localStorage.setItem("MyNotesApp", JSON.stringify(arr))
}


addButton.addEventListener("click", function () { ADD_NOTE() })
