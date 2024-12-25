interface TuneTileProps {
  icon: any;
  title: string;
  onClick: () => void;
  isPlaying: boolean;
}

const TuneTile: React.FC<TuneTileProps>  = ({ icon, title, onClick,isPlaying }) => (
  <div 
  className={`p-3 cursor-pointer border rounded-lg transition-all duration-200
  ${isPlaying ? 'bg-blue-100' : ''}
  hover:scale-105
  w-[120px] h-[80px] // Base size
  md:w-[140px] md:h-[90px] // Medium screens
  lg:w-[160px] lg:h-[100px] // Large screens
  flex items-center justify-center`}
  onClick={onClick}
>
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="text-2xl">{icon}</div>
    <span className="w-full text-sm truncate">{title}</span>
    {isPlaying && <span className="absolute text-xs top-1 right-1">▶️</span>}
  </div>
</div>
  );
export default TuneTile;  