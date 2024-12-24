interface TuneTileProps {
  icon: any;
  title: string;
  onClick: () => void;
  isPlaying: boolean;
}

const TuneTile: React.FC<TuneTileProps>  = ({ icon, title, onClick,isPlaying }) => (
         <div 
         className={`p-4 cursor-pointer border rounded-lg ${isPlaying ? 'bg-blue-100' : ''}`}
         onClick={onClick}
        >
         <div className="flex items-center gap-2">
             {icon}
             <span>{title}</span>
             {isPlaying && <span>▶️</span>}
         </div>
        </div>
  );
export default TuneTile;  