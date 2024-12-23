import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "./App.css";
import { useEffect, useState } from "react";
import { vscode } from "./utilities/vscode";

function App() {
  // How we can pass data to webview from extension through window
  const [config, setConfig] = useState(window.config);

  function onSendMessage() {
    // send message to the extension
    console.log("now");
    vscode.postMessage({ type: "onMessageSend", value: "message" });
  }

  useEffect(() => {
    // Listen for messages from the extension
    window.addEventListener("message", (event) => {
      const message = event.data;
      switch (message.type) {
        case "onConfigChange": {
          setConfig(message.value);
          break;
        }
      }
    });
  }, []);

  return (
    <main>
      <h1>Extension</h1>
      <VSCodeButton onClick={onSendMessage}>Send Message</VSCodeButton>
    </main>
  );
}

export default App;
