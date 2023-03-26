const socket = io('http://localhost:8000')

const form = document.getElementById('form');
const msg = document.getElementById('message');
const msgCon = document.querySelector('.container');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const ms = msg.value;
    append(`${ms}`,'right');
    socket.emit('send',ms);
    msg.value='';
})
function begin(){
    const name = document.getElementById('name').value;
    socket.emit('user-joined',name);
    document.getElementById('nameInput').style.display='none';
    document.getElementById('container').style.display='flex';
    document.getElementById('head').style.display='block';
    document.getElementById('text').style.display='block';
}
const append=(message,position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerHTML = message;
    msgElement.classList.add(position);
    msgCon.append(msgElement);
}
const appendLeft=(name,message)=>{
    const msgElement = document.createElement('div');
    const sender = document.createElement('p');
    sender.innerHTML = name;
    const msg = message;
    msgElement.append(sender);
    msgElement.append(msg);
    msgElement.classList.add('left');
    msgCon.append(msgElement);
}
const d = new Date();
let hour = d.getHours();
let min = d.getMinutes();
const time = `${hour}:${min}`;


socket.on('join',data=>{
    append(`${data} joined the chat at ${time}`,'mid');
})

socket.on('receive',data=>{
    appendLeft(`${data.name}`,`${data.message}`);
})

socket.on('left',name=>{
    append(`${name} has left the chat at ${time}`,'mid');
})
