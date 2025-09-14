.chat-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chat {
  width: 100%;
  max-width: 480px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  background: #f0f2f5;
  overflow: hidden;
}

/* Header fixed inside card */
.chat header {
  background: #075e54;
  color: #fff;
  padding: 10px 15px;
  flex-shrink: 0;
  z-index: 10;
}

/* Messages scrollable */
#messages {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #e5ddd5;
  scroll-behavior: smooth;
}

/* Input fixed at bottom of card */
#form {
  flex-shrink: 0;
  display: flex;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
  background: #f0f2f5;
}

#form input {
  flex: 1;
  border-radius: 25px;
  padding: 10px 15px;
  border: none;
  outline: none;
  font-size: 14px;
}

#form button {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-left: 10px;
  font-size: 18px;
  background-color: #128c7e;
  border: none;
  color: #fff;
  cursor: pointer;
}

#form button:hover {
  background-color: #075e54;
}

/* Messages bubbles */
.message {
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 20px;
  word-wrap: break-word;
  font-size: 14px;
  display: inline-block;
}

.message.self {
  align-self: flex-end;
  background: #dcf8c6;
}

.message.other {
  align-self: flex-start;
  background: #fff;
}

.message.system {
  align-self: center;
  text-align: center;
  font-style: italic;
  color: #888;
  max-width: 100%;
}

.message .meta {
  font-size: 10px;
  color: rgba(0,0,0,0.4);
  display: block;
  text-align: right;
  margin-top: 4px;
}

.message .delete-btn {
  border: none;
  background: transparent;
  color: red;
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;
}