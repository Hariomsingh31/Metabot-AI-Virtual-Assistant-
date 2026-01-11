// ===== Elements =====
const btn = document.getElementById("btn");
const content = document.getElementById("content");
const voice = document.getElementById("voice");
const output = document.getElementById("output");

// ===== Speech Recognition =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";

// ===== Speak =====
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  window.speechSynthesis.speak(speech);
}

// ===== Greeting =====
window.addEventListener("load", () => {
  speak("Hello, I am Metabot. How can I help you?");
});

// ===== Button Click =====
btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  content.innerText = "Listening...";
});

// ===== Result =====
recognition.onresult = (event) => {
  const text = event.results[0][0].transcript.toLowerCase();

  voice.style.display = "none";
  content.innerText = text;
  output.innerText = text;

  handleCommand(text);
};

// ===== Commands =====
function handleCommand(msg) {
  if (msg.includes("hello")) {
    speak("Hello! How can I help?");
  } 
  else if (msg.includes("time")) {
    speak(new Date().toLocaleTimeString());
  } 
  else if (msg.includes("date")) {
    speak(new Date().toLocaleDateString());
  } 
  else if (msg.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google");
  } 
  else {
    speak("Sorry, I didn't understand.");
  }
}

// ===== Error Handling =====
recognition.onerror = () => {
  voice.style.display = "none";
  content.innerText = "Click to speak";
};
