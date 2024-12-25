import React from 'react';
import {
  GiBattleAxe,
  GiHummingbird,
  GiCampfire,
  GiDrinking,
  GiRollingEnergy,
  GiFarmTractor,
  GiFireworkRocket,
  GiForest,
  GiWaterfall,
  GiRoad,
  GiFlute,
  GiPendulumSwing,
  GiFootprint,
  GiLindenLeaf,
  GiSpookyHouse,
} from 'react-icons/gi';
import { PiConfettiBold } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa";

import {
  BsMusicNote,
  BsCloudRain,
  BsBook,
  BsEmojiSunglasses,
  BsClock,
  BsDroplet,
  BsKeyboard,
  BsMouse,
  BsSunglasses,
  BsCloudSnow,
  BsTelephone
} from 'react-icons/bs';

import { 
  BiCloudRain, 
  BiTrain,
  BiRocket 
} from 'react-icons/bi';

import { 
  FaUmbrellaBeach, 
  FaHelicopter,
  FaShip 
} from 'react-icons/fa';

import { 
  MdThunderstorm,
  MdKeyboardAlt 
} from 'react-icons/md';

import { RiRoadMapLine } from 'react-icons/ri';

import { WiStormWarning } from 'react-icons/wi';

interface Tune {
  title: string;
  icon: JSX.Element;
}

type TunesArray = Tune[];

const tunes: TunesArray = [
  {
    title: "sample",
    icon: <BsMusicNote className="w-8 h-8" />
  },
  {
    title: "rain",
    icon: <BsCloudRain className="w-8 h-8" />
  },
  {
    title: "birds",
    icon: <GiHummingbird className="w-8 h-8" />
  },
  {
    title: "battle",
    icon: <GiBattleAxe className="w-8 h-8" />
  },
  {
    title: "boat",
    icon: <FaShip className="w-8 h-8" />
  },
  {
    title: "book",
    icon: <BsBook className="w-8 h-8" />
  },
  {
    title: "beach",
    icon: <FaUmbrellaBeach className="w-8 h-8" />
  },
  {
    title: "campfire",
    icon: <GiCampfire className="w-8 h-8" />
  },
  {
    title: "chill",
    icon: <BsEmojiSunglasses className="w-8 h-8" />
  },
  {
    title: "pendulum",
    icon: <GiPendulumSwing className="w-8 h-8" />
  },
  {
    title: "clock",
    icon: <BsClock className="w-8 h-8" />
  },
  {
    title: "drinking",
    icon: <GiDrinking className="w-8 h-8" />
  },
  {
    title: "drip",
    icon: <BsDroplet className="w-8 h-8" />
  },
  {
    title: "energy",
    icon: <GiRollingEnergy className="w-8 h-8" />
  },
  {
    title: "farm",
    icon: <GiFarmTractor className="w-8 h-8" />
  },
  {
    title: "fireworks",
    icon: <GiFireworkRocket className="w-8 h-8" />
  },
  {
    title: "flute",
    icon: <GiFlute className="w-8 h-8" />
  },
  {
    title: "footsteps",
    icon: <GiFootprint className="w-8 h-8" />
  },
  {
    title: "grind",
    icon: <FaQuestion className="w-8 h-8" />
  },
  {
    title: "helicopter",
    icon: <FaHelicopter className="w-8 h-8" />
  },
  {
    title: "keyboard",
    icon: <MdKeyboardAlt className="w-8 h-8" />
  },
  {
    title: "leaves",
    icon: <GiLindenLeaf className="w-8 h-8" />
  },
  {
    title: "mouse",
    icon: <BsMouse className="w-8 h-8" />
  },
  {
    title: "polozhenie",
    icon: <BsMusicNote className="w-8 h-8" />
  },
  {
    title: "retro",
    icon: <BsSunglasses className="w-8 h-8" />
  },
  {
    title: "river",
    icon: <GiWaterfall className="w-8 h-8" />
  },
  {
    title: "road",
    icon: <RiRoadMapLine className="w-8 h-8" />
  },
  {
    title: "rocket",
    icon: <BiRocket className="w-8 h-8" />
  },
  {
    title: "snow",
    icon: <BsCloudSnow className="w-8 h-8" />
  },
  {
    title: "spooky",
    icon: <GiSpookyHouse className="w-8 h-8" />
  },
  {
    title: "storm",
    icon: <WiStormWarning className="w-8 h-8" />
  },
  {
    title: "telephone",
    icon: <BsTelephone className="w-8 h-8" />
  },
  {
    title: "thunder",
    icon: <MdThunderstorm className="w-8 h-8" />
  },
  {
    title: "train",
    icon: <BiTrain className="w-8 h-8" />
  },
  {
    title: "victory",
    icon: <PiConfettiBold className="w-8 h-8" />
  }
];

export type { Tune, TunesArray };
export default tunes;