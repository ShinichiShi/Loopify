import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEffect, useRef, useState } from "react";
import { vscode } from "./utilities/vscode";
import tunes from "./utilities/tunes";
import TuneTile from './components/Tile';
import { FaStop } from 'react-icons/fa';

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
    <main className="flex flex-col items-center w-full min-h-screen bg-black">
    <div className="flex items-center justify-center w-full">
      <h1 className="text-2xl font-bold text-lime-300">Loopify</h1>
    </div>
    {playingTunes.size != 0 && <button
        onClick={stopAllAudio}
        className="flex items-center self-end justify-center p-3 m-4 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
      >
        <FaStop/>
      </button>}
      <div className="relative w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] mx-auto">
      <div className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent" />
      
      <div className="flex items-start flex-wrap p-1
        h-[70vh] overflow-y-auto
        text-lime-300 border-4 border-cyan-200 
        justify-center gap-4 rounded-lg
        scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-transparent
        hover:scrollbar-thumb-lime-400  
        w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 
       min-h-[50vh] my-20
      ">
        
        <div className="flex flex-wrap items-center justify-center gap-4 p-2">
          {tunes.map((tune, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <TuneTile
                icon={tune.icon}
                title={tune.title}
                onClick={() => handleTileClick(tune.title)}
                isPlaying={playingTunes.has(tune.title)}
              />
              
              {playingTunes.has(tune.title) && (
                <div className="relative w-32 group">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volumes.get(tune.title) ?? 1}
                    onChange={(e) => handleVolumeChange(tune.title, parseFloat(e.target.value))}
                    className="w-full h-2 transition-all duration-200 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-300"
                  />
                  <div className="absolute left-0 text-xs transition-opacity opacity-0 -bottom-5 group-hover:opacity-100 text-lime-300">
                    {Math.round((volumes.get(tune.title) ?? 1) * 100)}%
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
  );
};

export default App;