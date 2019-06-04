function loadScript(path) {
    let script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
}