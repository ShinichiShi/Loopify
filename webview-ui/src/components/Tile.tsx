import React, { useState } from 'react';

interface TuneTileProps {
  icon: any;
  title: string;
  onClick: () => void;
  isPlaying: boolean;
}

const colors = [
  '#00ccff', // Electric Blue
  '#33ff33', // Neon Green
  '#ff3399', // Vibrant Pink
  '#cc33ff', // Electric Purple
  '#ff9933', // Radiant Orange
  '#FFD700', // Gold
  '#ff3333', // Fiery Red
  '#00ffff', // Aqua Blue
  '#33cc33', // Brilliant Green
  '#ff66cc', // Hot Pink
];

const TuneTile: React.FC<TuneTileProps> = ({ icon, title, onClick, isPlaying }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [randomColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

  const glowEffectStyles = {
    boxShadow: isHovered
      ? `0 0 10px 5px ${randomColor}, 0 0 10px 5px ${randomColor}`
      : 'none',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div 
      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-200
        w-[100px] h-[70px]
        md:w-[120px] md:h-[80px]
        lg:w-[140px] lg:h-[90px]
        flex items-center justify-center
        dark:bg-[#252424] hover:dark:bg-black
        ${isPlaying ? 'border-2 border-blue-500' : 'border border-gray-600'}
      `}
      style={glowEffectStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex flex-col items-center w-full gap-2">
        <div 
          className="text-xl"
          style={{
            transition: 'all 0.2s ease-in-out',
            color: isHovered ? randomColor : 'currentColor'
          }}
        >
          {icon}
        </div>
        <span 
          className="w-full text-xs text-center truncate"
          style={{
            transition: 'all 0.2s ease-in-out',
            color: isHovered ? randomColor : 'currentColor'
          }}
        >
        {title.charAt(0).toLocaleUpperCase() + title.slice(1)}        
      </span>
      </div>

      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1">
          <div 
            className="h-full"
            style={{
              backgroundColor: randomColor,
              width: '100%',
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TuneTile;