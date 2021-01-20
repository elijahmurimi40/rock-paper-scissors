const choices = {
  rock: 0,
  paper: 1,
  scissors: 2,
};

export const readable = ['Rock', 'Paper', 'Scissors'];

/**
  * 0 -> rock, 1 -> paper, 2 -> scissors
  * 0 is beaten by 1
  * 1 is beaten by 2
  * 2 is beaten by 0
  */
export const order = [0, 1, 2, 0];

export default choices;
