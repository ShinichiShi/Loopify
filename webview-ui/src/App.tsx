import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEffect, useState } from "react";
import { vscode } from "./utilities/vscode";
import tunes,{Tune} from "./utilities/tunes"
import TuneTile from './components/Tile';
const App = () => {
  const [config, setConfig] = useState(window.config);

  function onSendMessage() {
    vscode.postMessage({ type: "onMessageSend", value: "message" });
  }

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;
      switch (message.type) {
        case "onConfigChange":
          setConfig(message.value);
          break;
      }
    });
  }, []);

  const handleTileClick = (title:string) => {
    vscode.postMessage({
      type: "selectTune",
      value: title
    });
  };
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Loopify</h1>
      <div className="grid grid-cols-3 gap-4">
        {tunes.map((tune:Tune, index) => (
          <TuneTile
            key={index}
            icon={tune.icon}
            title={tune.title}
            onClick={() => handleTileClick(tune.title)}
          />
        ))}
      </div>
      <VSCodeButton onClick={onSendMessage}>Send Message</VSCodeButton> 
    </main>
  );
};

export default App;