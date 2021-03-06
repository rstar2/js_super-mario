
// This file is required by the electron.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// TODO: Require the 'fetchLocal.js'
// require('./fetchLocal');

const url = require('url');

function fetchLocal(name) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest;
        xhr.onload = function () {
            resolve(new Response(xhr.responseText, { status: xhr.status }));
        }
        xhr.onerror = function () {
            reject(new TypeError('Local request failed'));
        };
        xhr.open('GET', name);
        xhr.send(null);
    });
}
const fetchOrig = window.fetch;

window.fetch = function (name) {
    const fetchUrl = url.parse(name);
    if (fetchUrl.protocol === 'file:') {
        // requested name is local file
        return fetchLocal(name);
    } else if (!fetchUrl.protocol && url.parse(window.location.href).protocol === 'file:') {
        // requested name is relative to a local file
        return fetchLocal(name);
    }

    return fetchOrig(name);
};