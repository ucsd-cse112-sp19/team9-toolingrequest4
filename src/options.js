let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

chrome.storage.sync.get(['repo', 'owner'], function (data) {
  let repo = document.getElementById('repo');
  let owner = document.getElementById('owner');
  
  let user = document.getElementById('user');
  let pass = document.getElementById('pass');
  if( data['repo'] ) {
    repo.value = ''+data['repo'];
  } else {
    repo.placeholder = 'repository name';
  }

  if( data['owner'] ) {
    repo.value = ''+data['owner'];
  } else {
    repo.placeholder = 'repository owner';
  }

  function authenticate(user, pass) {
    console.log('attempting authentication');
    let token = user + ":" + pass;
    let hash = btoa(token);
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.github.com/authorizations", true, user, pass);
    req.setRequestHeader('Authorization', 'Basic ' + hash);
    req.onload = () => {
      console.log(req.responseText);
    };
    req.send();
  }

  function updateRepositoryInfo(e) {
    e.preventDefault();
    if( repo.value ) {
      chrome.storage.sync.set({'repo': repo.value});
    }
    if( owner.value ) {
      chrome.storage.sync.set({'owner': owner.value});
    }
    // authenticate(user.value, pass.value);
  }

  document.getElementById("settings").onsubmit = updateRepositoryInfo;
});