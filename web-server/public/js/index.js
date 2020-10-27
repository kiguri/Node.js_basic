console.log('Client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle')
    .then(response => {
        response.json().then(data => {
            console.log(data);
        });
    })
    .catch(error => {
        console.log(error)
    })

