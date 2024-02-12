import { getBorderCharacters, table } from 'table';
import { tableGen } from './game-table.js';
import { computerMover } from './computer-mover.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();
const config = {
  border: getBorderCharacters(`ramac`),
};
let gameState = true;
const results = [];
function game(arr) {
  if (!arr[0])
    return 'you must enter some odd quantity of arguments';
  if (arr.length < 3)
    return 'you must enter min 3 arguments';
  if (arr.length % 2 === 0)
    return 'you must enter odd quantity of arguments';
  const filteredArr = arr.filter((el, index, array) => {
    return array.indexOf(el) === index;
  });
  if (arr.length !== filteredArr.length)
    return 'arguments must be unique';
  let gameArr = tableGen(arr);
  console.log(`\ngame has started`);
  let correct = false;
  let playerMove;
  let computerMove = computerMover.move(gameArr);
  let computerHMAC =
    computerMover.encryptMove(computerMove);
  while (!correct) {
    console.log(
      `computer move - ${computerHMAC[0]}\navailable moves: \n0 - help`
    );
    for (let i = 0; i < arr.length; i++) {
      console.log(`${arr.indexOf(arr[i]) + 1} - ${arr[i]}`);
    }
    console.log(`x - exit\n`);
    playerMove = prompt('your turn ').trim();
    if (playerMove === `0`) {
      console.log(
        `\n\nRules for your game: \n ${table(gameArr, config)}`
      );
    }
    if (playerMove === `x`) return `game aborted`;
    if (
      playerMove <= -1 ||
      playerMove >= gameArr.length ||
      isNaN(+playerMove)
    ) {
      console.log(
        'incorrect input \nyou must enter number from list'
      );
    } else if (playerMove != 0) {
      correct = true;
    }
  }
  console.log(
    `your move is - ${gameArr[0][playerMove]}\ncomputer move is - ${gameArr[computerMove][0]}\nkey is - ${computerHMAC[1]}\n`
  );

  return gameArr[computerMove][playerMove];
}
console.log(game(process.argv.slice(2)));
