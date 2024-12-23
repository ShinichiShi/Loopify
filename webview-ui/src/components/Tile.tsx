const TuneTile = ({ icon, title, onClick }:any) => (
    <div 
      className="p-6 bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3">
        {icon}
        <span className="text-sm text-blue-300">{title}</span>
      </div>
    </div>
  );
export default TuneTile;  