const button = document.querySelector("#submitbutton");
const listGroup = document.querySelector(".list-group");
const nameInput = document.querySelector("#nameInput");
const col7 = document.querySelector(".col-7");
const textArea = document.querySelector("#exampleFormControlTextarea1");
const radio = document.getElementsByName('gender');
const row = document.querySelectorAll(".container")[0];
let radioValue = [];
let commentValue = [];
let nameValue = [];

startEvents();

function startEvents() {
    button.addEventListener("click", addComment);
    row.addEventListener("keydown", checkEvent);
    document.addEventListener("DOMContentLoaded", pageLoaded);

}

function pageLoaded() {
    checkCommentsFromStorage();
    checkNamesFromStorage();
    checkImgsFromStorage();

    for (let i = 0; i < nameValue.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-start";

        const img = document.createElement("img");

        const p = document.createElement("p");

        const col1 = document.createElement("col");
        col1.className = "col-2-sm";
        col1.style.padding = "0%";
        col1.style.marginRight = "20px";

        const col10 = document.createElement("col");
        col10.className = "col-10-sm";
        col10.style.marginLeft = "25px";
        col10.textContent = commentValue[i];
        img.src = radioValue[i];
        img.id = "pic";
        p.textContent = nameValue[i];
        if (p.textContent.length <= 6) {
            p.style.textAlign = "center";
        } else {
            let p1 = "";
            for (let i = 0; i <= p.textContent.length; i++) {
                p1 += p.textContent[i].trim();
                if (i > 0 && i % 5 == 0) {
                    p.style.marginLeft = "-5px";
                    p1 += ".";
                    break;
                }
            }
            p.innerHTML = p1;
        }
        console.log(p.textContent);

        col1.appendChild(img);
        col1.appendChild(p);
        li.appendChild(col1);
        li.appendChild(col10);
        listGroup.appendChild(li);
    }

}

function checkEvent(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
}

function addComment() {

    const inputTextArea = textArea.value.trim();
    if (inputTextArea == null || inputTextArea == "") {
        startAlert("warning", "You can not submit because the comment section is EMPTY!");
    } else {
        addCommentToUI(inputTextArea);
    }

}

function addNameToUI(nameInput) {
    const p = document.createElement("p");
    p.textContent = nameInput;
    if (p.textContent.length <= 6) {
        p.style.textAlign = "center";
    } else {
        let p1 = "";
        for (let i = 0; i <= p.textContent.length; i++) {
            p1 += p.textContent[i].trim();
            if (i > 0 && i % 5 == 0) {
                p.style.marginLeft = "-5px";
                p1 += ".";
                break;
            }
        }
        p.innerHTML = p1;
    }
    return p;
}

function addRadioToUI(value) {
    const img = document.createElement("img");
    img.src = value;
    return img.src;
}

function addCommentToUI(textContent) {
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radioValue = radio[i].value;
        }
    }


    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-start";

    const col1 = document.createElement("col");
    col1.className = "col-2-sm";
    col1.style.padding = "0%";
    col1.style.marginRight = "20px";


    const p = document.createElement("p");
    let indexValue = nameInput.value.trim();
    if (indexValue == "") {
        startAlert("warning", "You can not submit without filling name text!");
    }
    p.textContent = indexValue;
    if (p.textContent.length <= 6) {
        p.style.textAlign = "center";
    } else {
        let p1 = "";
        for (let i = 0; i <= p.textContent.length; i++) {
            p1 += p.textContent[i].trim();
            if (i > 0 && i % 5 == 0) {
                p.style.marginLeft = "-5px";
                p1 += ".";
                break;
            }
        }
        p.innerHTML = p1;
    }

    const img = document.createElement("img");
    if (radioValue == "male") {
        img.src = "resimler/man-avatar.jpg"
        addImgToStorage(img.src);
        img.id = "pic";
    } else if (radioValue == "female") {
        img.src = "resimler/woman-avatar.jpg"
        addImgToStorage(img.src);
        img.id = "pic";
    }
    else {
        startAlert("warning", "You can't submit the comment without selecting a gender!");
        return;
    }

    addNamesToStorage(indexValue);
    if (radioValue, indexValue != "" || null) {
        const col11 = document.createElement("col");
        col11.className = "col-10-sm";
        col11.style.marginLeft = "25px";
        col11.textContent = textContent;
        addCommentToStorage(textContent);
        col1.appendChild(img);
        col1.appendChild(p);
        li.appendChild(col1);
        li.appendChild(col11);
        listGroup.appendChild(li);
        nameInput.value = "";
        textArea.value = "";
    }
}

function startAlert(type, message) {
    const div = document.createElement("div");
    div.className = "alert mt-3 alert-" + type;
    div.textContent = message;

    row.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2500);
}


function addCommentToStorage(newComment) {
    checkCommentsFromStorage();
    commentValue.push(newComment);
    localStorage.setItem("comment", JSON.stringify(commentValue));
}

function addNamesToStorage(newName) {
    checkNamesFromStorage();
    nameValue.push(newName);
    localStorage.setItem("name", JSON.stringify(nameValue));

}

function addImgToStorage(newImg) {
    checkImgsFromStorage();
    radioValue.push(newImg);
    localStorage.setItem("img", JSON.stringify(radioValue));
}


function checkCommentsFromStorage() {
    if (localStorage.getItem("comment") === null) {
        commentValue = [];
    } else {
        commentValue = JSON.parse(localStorage.getItem("comment"));
    }
}
function checkNamesFromStorage() {
    if (localStorage.getItem("name") === null) {
        nameValue = [];
    } else {
        nameValue = JSON.parse(localStorage.getItem("name"));
    }
}

function checkImgsFromStorage() {
    if (localStorage.getItem("img") === null) {
        radioValue = [];
    } else {
        radioValue = JSON.parse(localStorage.getItem("img"));
    }
}
