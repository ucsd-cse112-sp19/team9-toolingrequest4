document.getElementById('settings').onclick = function(e) {
  console.log('got here');
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
};

function makeRow(key, value) {
  let row = document.createElement('tr');
  let _key = document.createElement('td');
  let highlight = document.createElement('mark');
  highlight.innerText = key;
  _key.appendChild(highlight);
  let _value = document.createElement('td');
  _value.innerText = value;
  row.appendChild(_key);
  row.appendChild(_value);
  return row;
}

function appendRow(parent, key, value) {
  parent.appendChild(makeRow(key, value));
}

function addContribs(contribs, data) {

  let table = document.createElement('table');
  contribs.appendChild(table);

  data.forEach((user)=>{
    let panel = document.createElement('div');
    panel.style.borderColor = "blue";
    panel.style.borderWidth = "2px";
    panel.style.borderStyle = "solid";
    panel.style.borderRadius = "2px";
    panel.style.margin = "2px";
    panel.style.whiteSpace = "nowrap";

    let append = (k, v) => appendRow(panel, k, v);
    append("Author", "" + user["author"]["login"]);
    weeks = user["weeks"];
    append("Past Week", "" + weeks[weeks.length - 1]["a"]);
    append("Total Contributions", "" + user["total"]);

    table.appendChild(panel);
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

