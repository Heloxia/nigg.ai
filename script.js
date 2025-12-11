const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Mesaj ekleme
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "you" ? "message you" : "message bot";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Gönder butonu
sendBtn.onclick = async () => {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "you");
  input.value = "";

  addMessage("Yazıyor...", "bot");

  const res = await fetch("https://nigg-ai.replit.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  // "Yazıyor..." mesajını kaldır
  chatBox.removeChild(chatBox.lastChild);

  addMessage(data.reply, "bot");
};
