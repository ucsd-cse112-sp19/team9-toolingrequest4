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

chrome.storage.sync.get('repo', function (data) {
  let repo = data['repo'];
  let repo_input = document.getElementById('repo');
  if( repo ) {
    repo_input.value = ''+repo;
  } else {
    repo_input.placeholder = 'repository url';
  }

  function updateRepositoryInfo(e) {
    e.preventDefault();
    if( repo_input.value ) {
      chrome.storage.sync.set({'repo': repo_input.value});
    }
  }

  document.getElementById("settings").onsubmit = updateRepositoryInfo;
});