import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEffect, useRef, useState } from "react";
import { vscode } from "./utilities/vscode";
import tunes, { Tune } from "./utilities/tunes";
import TuneTile from './components/Tile';

const App = () => {
  const [playingTunes, setPlayingTunes] = useState<Set<string>>(new Set());
  const [volumes, setVolumes] = useState<Map<string, number>>(new Map());
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const { type, uri, title, volume } = event.data;
      if (type === "playAudio" && title && uri) {
        if (!audioElementsRef.current.has(title)) {
          const newAudio = new Audio(uri);
          newAudio.loop = true;
          const savedVolume = volumes.get(title) ?? 1;
          newAudio.volume = savedVolume;
          audioElementsRef.current.set(title, newAudio);
          newAudio.play().catch(console.error);
          setPlayingTunes(prev => new Set([...prev, title]));
        }
      }
      if (type === "stopAudio" && title) {
        handleStopAudio(title);
      }
      if (type === "setVolume" && title && typeof volume === 'number') {
        handleVolumeChange(title, volume);
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      // window.removeEventListener("message", messageHandler);
      // audioElementsRef.current.forEach(audio => {
      //   audio.pause();
      //   audio.currentTime = 0;
      // });
      // audioElementsRef.current.clear();
      // setPlayingTunes(new Set());
    };
  }, [volumes]);

  const handleStopAudio = (title: string) => {
    const audioToStop = audioElementsRef.current.get(title);
    if (audioToStop) {
      audioToStop.pause();
      audioToStop.currentTime = 0;
      audioElementsRef.current.delete(title);
    }
    
    setPlayingTunes(prev => {
      const updated = new Set(prev);
      updated.delete(title);
      return updated;
    });
  };

  const handleVolumeChange = (title: string, volume: number) => {
    const audio = audioElementsRef.current.get(title);
    if (audio) {
      audio.volume = volume;
      setVolumes(prev => {
        const updated = new Map(prev);
        updated.set(title, volume);
        return updated;
      });
    }
  };

  const handleTileClick = (title: string) => {
    if (playingTunes.has(title)) {
      vscode.postMessage({ type: "stopAudio", title });
    } else {
      vscode.postMessage({ type: "playTune", title });
    }
  };

  const stopAllAudio = () => {
    playingTunes.forEach(title => {
      vscode.postMessage({ type: "stopAudio", title });
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
    <h1 className="w-full mb-8 text-2xl font-bold text-center text-lime-300">Loopify</h1>
    
    <div className="flex items-center flex-wrap p-4 
      w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 
      h-auto min-h-[50vh] 
      text-lime-300 border-4 border-cyan-200 
      justify-center gap-4 rounded-lg">
      
      {tunes.map((tune, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <TuneTile
            icon={tune.icon}
            title={tune.title}
            onClick={() => handleTileClick(tune.title)}
            isPlaying={playingTunes.has(tune.title)}
          />
          
          {playingTunes.has(tune.title) && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.get(tune.title) ?? 1}
              onChange={(e) => handleVolumeChange(tune.title, parseFloat(e.target.value))}
              className="w-24 accent-lime-300"
            />
          )}
        </div>
      ))}
    </div>
    
    <div className="mt-6">
      <button
        onClick={stopAllAudio}
        className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
      >
        Stop All
      </button>
    </div>
  </main>
  );
};

export default App;