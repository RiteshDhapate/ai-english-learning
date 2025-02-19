import  { useState, useEffect, useRef } from "react";
import { Mic, MicOff, ArrowLeft, Brain, History, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const navigate = useNavigate();

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speechSynthesisRef = useRef<SpeechSynthesis | null>(
    window.speechSynthesis
  );


 useEffect(() => {
   if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
     recognitionRef.current = new (window.SpeechRecognition ||
       window.webkitSpeechRecognition)();
     const recognition = recognitionRef.current;
     recognition.continuous = false;
     recognition.interimResults = true;
     recognition.lang = "en-US";

     recognition.onresult = async(event) => {
       const transcriptText = event.results[event.resultIndex][0].transcript;
       setTranscript(transcriptText);
       if (event.results[event.resultIndex].isFinal) {
         const userMessage: ChatMessage = {
           role: "user",
           content: transcriptText
         };
         try {
           setChatHistory((prev) => [...prev, userMessage]);
           setIsThinking(true);
           const { data } = await axios.post(
             "https://ai-english-learning.onrender.com/chat",
             {
               messages: [...chatHistory, userMessage],
             }
           );

           console.log(data);

           setChatHistory(data.chat_history);
           setResponse(data?.response || "I'm not sure how to respond.");
           setIsThinking(false);
           speakResponse(data?.response || "I'm not sure how to respond.");
         } catch (error) {
           console.error("Error fetching response:", error);
           setResponse("Sorry, I couldn't process that request.");
           speakResponse("Sorry, I couldn't process that request.")
         } finally {
           setIsThinking(false);
         }
       }
     };

     recognition.onend = () => setIsListening(false);
   }
 }, []);


const toggleListening = () => {
  if (!recognitionRef.current) {
    alert("Speech recognition is not supported in your browser.");
    return;
  }
  if (!isListening) {
    setTranscript("");
    setResponse("");
    recognitionRef.current.start();
    setIsListening(true);
  } else {
    recognitionRef.current.stop();
    setIsListening(false);
  }
};


const speakResponse = (text: string) => {
  if (!speechSynthesisRef.current) {
    alert("Text-to-speech is not supported in your browser.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesisRef.current.speak(utterance);
};


  return (
    <div className="min-h-screen assistant-gradient text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-4 hidden lg:block">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Practice Sessions</h2>
          <div className="space-y-2">
            {["Pronunciation", "Conversation", "Vocabulary"].map((session) => (
              <button
                key={session}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
              >
                {session}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Speaking Stats</h2>
          <div className="glass-card rounded-lg p-4 space-y-4">
            <div>
              <p className="text-sm text-gray-400">Today's Practice</p>
              <p className="text-lg font-semibold">15 minutes</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Pronunciation Score</p>
              <p className="text-lg font-semibold">92%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* History Button */}
          <button
            onClick={() => setShowHistory(true)}
            className="absolute top-4 right-4 glass-card p-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <History className="w-6 h-6" />
          </button>

          {/* Central Voice Interface */}
          <div className="relative w-64 h-64 mb-8">
            <div
              className={`absolute inset-0 bg-purple-500/10 rounded-full ${
                isListening ? "animate-pulse" : ""
              }`}
            ></div>
            <div
              className={`absolute inset-2 bg-purple-500/20 rounded-full ${
                isListening ? "animate-pulse delay-75" : ""
              }`}
            ></div>
            <div
              className={`absolute inset-4 bg-purple-500/30 rounded-full ${
                isListening ? "animate-pulse delay-150" : ""
              }`}
            ></div>
            <button
              onClick={toggleListening}
              className={`absolute inset-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </button>
          </div>

          {/* Transcription and Response Display */}
          <div className="text-center max-w-2xl mx-auto w-full space-y-4">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Brain
                  className={`w-6 h-6 text-purple-400 ${
                    isThinking ? "animate-pulse" : ""
                  }`}
                />
                <h2 className="text-xl font-semibold">AI Language Assistant</h2>
              </div>
              {isListening ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              ) : isThinking ? (
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-purple-400">Thinking...</p>
                </div>
              ) : (
                <p className="text-gray-400">
                  Click the microphone to start speaking
                </p>
              )}
            </div>

            {transcript && (
              <div className="glass-card rounded-xl p-6 animate-fadeIn">
                <h3 className="text-sm text-gray-400 mb-2">You said:</h3>
                <p className="text-lg">{transcript}</p>
              </div>
            )}

            {response && (
              <div className="glass-card rounded-xl p-6 animate-fadeIn bg-purple-500/10">
                <h3 className="text-sm text-gray-400 mb-2">AI Response:</h3>
                <p className="text-lg">{response}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="p-4 border-t border-gray-800">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isListening
                    ? "bg-red-500"
                    : isThinking
                    ? "bg-purple-500"
                    : "bg-gray-500"
                }`}
              ></div>
              <span className="text-sm text-gray-400">
                {isListening
                  ? "Listening..."
                  : isThinking
                  ? "Processing..."
                  : "Ready to listen"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                <span className="font-medium">Language:</span> English
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-medium">Mode:</span> Conversation Practice
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card rounded-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold">Chat History</h2>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`glass-card rounded-xl p-4 max-w-[80%] ${
                      message.role === "assistant" ? "bg-purple-500/10" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-400">
                        {message.role === "user" ? "You" : "AI Assistant"}
                      </span>
                      {/* <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span> */}
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              {chatHistory.length === 0 && (
                <div className="text-center text-gray-400">
                  No conversation history yet. Start speaking to see your chat
                  history!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;