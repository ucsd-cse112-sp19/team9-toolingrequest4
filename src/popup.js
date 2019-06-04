document.getElementById('settings').onclick = function(e) {
  console.log('got here');
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
};

function makeRow(text) {
  let elem = document.createElement('div');
  elem.innerText = text;
  return elem;
}

function appendRow(parent, text) {
  parent.appendChild(makeRow(text));
}

function addContribs(contribs, data) {

  data.forEach((user)=>{
    let panel = document.createElement('div');
    panel.style.borderColor = "blue";
    panel.style.borderWidth = "2px";
    panel.style.borderStyle = "solid";
    panel.style.borderRadius = "2px";
    panel.style.margin = "2px";

    let append = (text) => appendRow(panel, text);
    append("Author: " + user["author"]["login"]);
    weeks = user["weeks"];
    append("Past Week: " + weeks[weeks.length - 1]["a"]);
    append("Total Contributions: " + user["total"]);

    contribs.appendChild(panel);
  });
}

function displayInfo(info) {
  let contribs = document.getElementById("contribs");
  addContribs(contribs, JSON.parse(info));
}

function getContributions(repo, owner) {
  let req = new XMLHttpRequest();
  let url = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
  req.open("GET", url, true);
  req.onload = () => {
    displayInfo(req.responseText);
  };
  req.send();
}

let repo_key = "repo", owner_key = "owner";

chrome.storage.sync.get([repo_key, owner_key], function(data) {
  let repo = data[repo_key];
  let owner = data[owner_key];
  if( !(repo && owner) ) {
    displayInfo("not enough info");
    return;
  }

  // document.getElementById('repo_name').value = repo;
  // document.getElementById('repo_owner').value = owner;

  getContributions(repo, owner);
})

