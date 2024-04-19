postMessage('Hiiiii 1');

onmessage = function(e) {
    console.log('message recived from main: ', e.data)
}