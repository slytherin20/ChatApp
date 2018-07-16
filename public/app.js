
$(document).ready(function() {
    let socket = io();
    let user_name = prompt("Enter your user name");
    let btn = $('#btn');
    let inp = $('#inp');
    let result = $('#result');
    let connectedusers=$('#users');
    display();
    socket.on('connect', function () {
        socket.emit('userdetails', user_name);
    });

    btn.click(function () {
        let value = inp.val();
        socket.emit('message', value);
    });
    socket.on('show users', function(data){
        connectedusers.empty();
       for( let x in data){
           connectedusers.append(`<li>${data[x]}</li>`);
       }

    });
    socket.on('show', function (data) {
        result.append(`<li>${data}</li>`);

    });

    function render(data) {
        data.forEach((msg) => {
            result.append(`<li>${msg}</li>`);

        });

    }

    function display() {
        socket.on('ms', function (data) {
            render(data);
        });
    }
});

