interface GameType {
  code: number;
  info: string;
}

export const AIinfo: GameType = {
  code: 0,
  info: 'Artificial intelligence (AI)',
};

export const friendInfo: GameType = {
  code: 1,
  info: 'a Friend',
};

export const strangerInfo: GameType = {
  code: 2,
  info: 'a Random Stranger',
};

export default GameType;
