import { RefObject } from 'react';
import GameType from './GameInfo';

export type NavProps = {
  children: {
    nav: RefObject<HTMLDivElement> | null;
  }
}

export type ContainerProps = {
  children: {
    container: RefObject<HTMLDivElement> | null;
    margin: number;
    playingInfo: GameType;
  }
}
