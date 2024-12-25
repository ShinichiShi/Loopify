import React from 'react';

interface Tune {
  title: string;
  icon: JSX.Element;
}

type TunesArray = Tune[];

const tunes: TunesArray = [
  {
    title: "tune1",
    icon: (
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    )
  },
  {
    title: "rain",
    icon: (
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10h-4v4h-4v-4H6v-4h4V4h4v4h4v4z" />
      </svg>
    )
  },
  {
    title: "birds",
    icon: (
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m0 16V5H5v14h14m-2.5-6c-.83 0-1.5-.67-1.5-1.5S15.67 10 16.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5m-7 0c-.83 0-1.5-.67-1.5-1.5S8.67 10 9.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5m3.5 6H7v-2h6v2z" />
      </svg>
    )
  },
  {
    title: "tune1",
    icon: (
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    )
  },
  {
    title: "tune1",
    icon: (
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
        <path d="M7 12h2v5h2v-5h2V7H7z" />
      </svg>
    )
  },
  {
    title: "tune1",
    icon: (
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    )
  }
];

export type { Tune, TunesArray };
export default tunes;