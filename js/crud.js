class Post {
    constructor(nome, post, postKey) {
        this._nome = nome;
        this._post = post;
        this._key = postKey;
    }

    get nome() {
        return this._nome;
    }

    get post() {
        return this._post;
    }
    
    set post(postText) {
        this._post = postText;
        saveLocalStorage();
    }

    get key() {
        return this._key;
    }

    set key(postKey) {
        this._key = postKey;
        saveLocalStorage();
    }
}

var itNome = document.getElementById("itNome");
var taPost = document.getElementById("taPost");
var selRegisteredPosts = document.getElementById("selRegisteredPosts");
var idx = 0;
var arrPosts = [];

loadLocalStorage();

function readPost() {
    var selectKey = selRegisteredPosts.value;
    for(let i in arrPosts) {
        if(arrPosts[i].key == selectKey) {
            displayPost(arrPosts[i].post);
            generateUpdateAndDeleteBtns();
            break;
        }
    }
}

function displayPost(post) {
    var bloco = document.getElementById("blocoPostCarregado");
    var ta = document.createElement("textarea");
    ta.cols = taPost.cols;
    ta.rows = taPost.rows;
    ta.setAttribute("id", "taPostCarregado");
    ta.value = post;
    bloco.innerHTML = '';
    bloco.appendChild(ta);
}

function generateUpdateAndDeleteBtns() {
    var bloco = document.getElementById("blocoUpdateDelete");
    bloco.innerHTML = "";

    var btnUpdate = document.createElement("button");
    btnUpdate.setAttribute("class", "component");
    btnUpdate.innerText = "Gravar";
    btnUpdate.addEventListener("click", updatePost);
    bloco.appendChild(btnUpdate);

    var btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "component");
    btnDelete.innerText = "Deletar";
    btnDelete.addEventListener("click", deletePost);
    bloco.appendChild(btnDelete);
}

function updatePost() {
    var selectKey = selRegisteredPosts.value;
    var ta = document.getElementById("taPostCarregado");
    for (let i in arrPosts) {
        if (arrPosts[i].key == selectKey) {
            arrPosts[i].post = ta.value;
            alert("Post alterado com sucesso!");
            break;
        }
    }
}

function deletePost() {
    var selectKey = selRegisteredPosts.value;
    for (let i in arrPosts) {
        if (arrPosts[i].key == selectKey) {
            arrPosts.splice(i,1);
            saveLocalStorage();
            alert("Post deletado com sucesso!");
            remakeSelectList();
            readPost();
            break;
        }
    }
}

function remakeSelectList() {
    selRegisteredPosts.innerHTML = "";
    for (let i in arrPosts) {
        addPostToSelectionList(arrPosts[i].key);
    }
    selRegisteredPosts.click();
}

function clearStorage() {
    localStorage.clear();
    clearSelRegisteredPosts();
}

function clearSelRegisteredPosts() {
    selRegisteredPosts.innerHTML = "";
}

function loadLocalStorage() {
    if(storageAvailable('localStorage') && localStorage.length > 0) {
        loadedArray = JSON.parse(localStorage.getItem("registeredPosts")); 
        idx = localStorage.getItem("idx");
        for(let i in loadedArray) {
            arrPosts[i] = new Post(loadedArray[i]._nome, loadedArray[i]._post, loadedArray[i]._key);
            addPostToSelectionList(arrPosts[i].key);
        }
        selRegisteredPosts.click();
    }
}

function savePost() {
    if(!nomeIsEmpty() && !postIsEmpty()) {
        if(storageAvailable('localStorage')) {
            addPostToLocalStorage();
            alert("Post criado com sucesso!")
        }
    } else {
        alert("Preencha todos os campos exigidos para registrar seu post.")
    }
}

function addPostToLocalStorage() {
    var postKey = `${idx}-${itNome.value}`;
    post = new Post(itNome.value, taPost.value, postKey);
    arrPosts.push(post);
    addPostToSelectionList(post.key);
    idx++;
    saveLocalStorage();
}

function saveLocalStorage() {
    localStorage.setItem('registeredPosts', JSON.stringify(arrPosts));
    localStorage.setItem('idx', idx);
}

function addPostToSelectionList(key) {
    var option = document.createElement("option");
    option.value = key;
    option.text = key;
    selRegisteredPosts.add(option);
    arrPosts.length == 1 ? readPost() : null ;
}

function nomeIsEmpty() {
    if(itNome.value == "") {
        return true;
    }
    return false;
}

function postIsEmpty() {
    if(taPost.value == "") {
        return true;
    }
    return false;
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}