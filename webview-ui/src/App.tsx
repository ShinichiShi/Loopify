import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEffect, useState } from "react";
import { vscode } from "./utilities/vscode";
import tunes,{Tune} from "./utilities/tunes"
import TuneTile from './components/Tile';
const App = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  function onSendMessage() {
    vscode.postMessage({ type: "stopTune", value: "message" });
  }

  
useEffect(() => {
  // Handle messages from the extension
  window.addEventListener('message', event => {
    const message = event.data;
    
    switch (message.type) {
      case 'audioStarted':
        setCurrentlyPlaying(message.title);
        break;
      case 'audioStopped':
      case 'audioEnded':
        setCurrentlyPlaying(null);
        break;
    }
  });
}, []);

window.addEventListener('message', (event) => {
  const { type, uri } = event.data;
  if (type === 'playAudio') {
    const audio = new Audio(uri);
    audio.play();
  }
});

const handleTileClick = (title: string) => {
  if (currentlyPlaying === title) {
    vscode.postMessage({ type: "stopAudio" });
  } else {
    vscode.postMessage({ type: "playTune", title: title });
  }
};
  return (
    <main className="">
      <h1 className="w-full mb-8 text-2xl font-bold text-center">Loopify</h1>
      <div className="flex items-center flex-wrap h-[50vh] border-4 border-red-900 justify-center gap-4  ">
        {tunes.map((tune:Tune, index) => (
          <TuneTile
            key={index}
            icon={tune.icon}
            title={tune.title}
            onClick={() => handleTileClick(tune.title)}
            isPlaying={currentlyPlaying === tune.title}
          />
        ))}
      </div>
      <VSCodeButton onClick={onSendMessage}>stop Message</VSCodeButton> 
    </main>
  );
};

export default App;