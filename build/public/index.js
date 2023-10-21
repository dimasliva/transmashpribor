console.log(1);
async function getFiles() {
    console.log(1);
    fetch('/api/files').then(async (result) => {
        let res = await result.json();
        let tbody = document.querySelector('#myTable tbody');
        tbody.innerHTML = res.map((val) => `<tr><td>${val.id}</td><td role="button" onclick="downloadFile('${val.secret}')">${val.title}</td><td>${val.secret}</td></tr>`).join('');
        console.log(res);
    });
}
getFiles();
async function downloadFile(secret) {
    console.log('secret', secret);
    fetch(`/api/file/${secret}`).then(async (result) => {
        let res = await result.blob();
        console.log(res);
        const aElement = document.createElement('a');
        aElement.setAttribute('download', secret);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
        getFiles();
    });
}
async function createFile() {
    var input = document.querySelector('input[type="file"]');
    var data = new FormData();
    data.append('file', input.files[0]);
    data.append('user', 'hubot');
    await fetch('/api/file', {
        method: 'POST',
        body: data
    });
    getFiles();
}
export {};
//# sourceMappingURL=index.js.map