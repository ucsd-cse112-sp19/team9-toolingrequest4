loadScript('metrics/core.js');

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
    owner.value = ''+data['owner'];
  } else {
    owner.placeholder = 'repository owner';
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

  document.getElementById("github-settings").onsubmit = updateRepositoryInfo;
});