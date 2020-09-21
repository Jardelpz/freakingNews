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

    get key() {
        return this._key;
    }

    set key(postKey) {
        this._key = postKey;
    }
}

var itNome = document.getElementById("itNome");
var taPost = document.getElementById("taPost");
var selRegisteredPosts = document.getElementById("selRegisteredPosts");
var idx = 0;
var arrPosts = [];

//TODO transformar em function
if(storageAvailable('localStorage') && Storage.length > 0) {
    console.log("Tem Storage.")
    arrPosts = sessionStorage.getItem("registeredPosts");
    idx = sessionStorage.getItem("idx");
    for(i=0; i<idx; i++) {
        addPostToSelectionList(post[i].key)
    }
}

function savePost() {
    if(!nomeIsEmpty() && !postIsEmpty()) {
        if(storageAvailable('localStorage')) {
            addPostToLocalStorage();
        }
    } else {
        alert("Preencha todos os campos exigidos para registrar seu post.")
    }
}

//TODO ver de como salvar o conjunto de posts (tem que ser String)
function addPostToSessionStorage() {
    var postKey = `${idx}-${itNome.value}`;
    post = new Post(itNome.value, taPost.value, postKey);
    arrPosts[idx] = post;
    sessionStorage.setItem("registeredPosts", arrPosts);
    sessionStorage.setItem("idx", idx);
    addPostToSelectionList(post.key);
    idx++;
}

//TODO ver de como salvar o conjunto de posts (tem que ser String)
function addPostToLocalStorage() {
    var postKey = `${idx}-${itNome.value}`;
    post = new Post(itNome.value, taPost.value, postKey);
    arrPosts[idx] = post;
    localStorage.setItem("registeredPosts", arrPosts);
    localStorage.setItem("idx", idx);
    addPostToSelectionList(post.key);
    idx++;
}

function addPostToSelectionList(key) {
    var option = document.createElement("option");
    option.text = key;
    selRegisteredPosts.add(option);
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

/*
if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
  }
  else {
    // Too bad, no localStorage for us
  }
*/