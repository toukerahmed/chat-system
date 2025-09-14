const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('msg');
const messages = document.getElementById('messages');
const nameInput = document.getElementById('nameInput');

let myId = null;
// Load saved username or ask
let username = localStorage.getItem('chatUsername');
if (!username) {
  username = prompt("Enter your name:", "Anonymous") || "Anonymous";
  localStorage.setItem('chatUsername', username);
}
nameInput.value = username;

// Register username with server
socket.emit('register', username);

// Update username when input changes
nameInput.addEventListener('change', () => {
  const newName = nameInput.value.trim() || "Anonymous";
  username = newName;
  localStorage.setItem('chatUsername', username);
  socket.emit('register', username);
});


function escape(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function addMessage(m) {
  const el = document.createElement('div');
  el.className = 'message ' + (m.id === myId ? 'self' : 'other');
  el.dataset.msgid = m.msgId;

  el.innerHTML = `
    <div class="bubble">
      <b class="text-success">${escape(m.user)}</b><br/>
        <div class="d-flex justify-content-between">
            <p class="text-info">${escape(m.text)}</p>
            <span class="meta text-end">${m.id === myId ? `<button class="delete-btn btn btn-sm btn-danger ms-2"><i class="fa fa-trash"></i></button>` : ''}</span> 
        </div>
    </div>
  `;

  if (m.id === myId) {
    el.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm("Delete this message?")) {
        socket.emit('delete message', m.msgId);
      }
    });
  }

  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

socket.on('connect', () => {
  myId = socket.id;
});

socket.on('chat history', msgs => msgs.forEach(addMessage));
socket.on('chat message', addMessage);
socket.on('delete message', (msgId) => {
  const el = document.querySelector(`[data-msgid="${msgId}"]`);
  if (el) el.remove();
});
socket.on('system', (txt) => {
  const el = document.createElement('div');
  el.className = 'message system';
  el.innerHTML = `<em>${escape(txt)}</em>`;
  messages.appendChild(el);
});

// Send message
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!input.value) return;
  socket.emit('chat message', input.value);
  input.value = '';
});