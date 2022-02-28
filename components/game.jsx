const { useState, useEffect } = React;

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const commands = ["enter", "backspace"];
const allowedKeys = [...alphabet, ...commands];

function getWordMap(word) {
  const wordMap = {};
  Array.from(word).forEach((char) => {
    if (!wordMap[char]) {
      wordMap[char] = 1;
    } else {
      wordMap[char]++;
    }
  });
  return wordMap;
}

function Game({ word }) {
  const [gameOver, setGameOver] = useState(false);
  const [currAttempt, setCurrAttempt] = useState(0);
  const [currKey, setCurrKey] = useState("");
  const [letters, setLetters] = useState(["", "", "", "", "", ""]);
  const [evaluations, setEvaluations] = useState([[], [], [], [], [], []]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onKeydown = (e) => {
      // Do not trigger with modifiers other than shift
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const keyLower = e.key.toLowerCase();
      if (allowedKeys.includes(keyLower)) {
        setCurrKey(keyLower);
      }
    };

    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  // TODO
  function onEnter() {}

  function onBackspace() {
    const newLetters = [...letters];
    newLetters[currAttempt] = letters[currAttempt].slice(
      0,
      letters[currAttempt].length - 1
    );
    setLetters(newLetters);
  }

  function onLetter() {
    if (letters[currAttempt].length === 5) return;

    const newLetters = [...letters];
    newLetters[currAttempt] += currKey;
    setLetters(newLetters);
  }

  useEffect(() => {
    if (!currKey || gameOver) {
      return;
    }

    // reset message shown to user
    setMessage("");

    // handle key
    if (currKey === "enter") onEnter();
    else if (currKey === "backspace") onBackspace();
    else if (alphabet.includes(currKey)) onLetter();

    // Reset currKey so you can enter the same consecutive letter i.e. "a", "a"
    setCurrKey(undefined);
  }, [currKey]);

  let gameRows = [];
  for (let i = 0; i < 6; i++) {
    const rowLetters = letters[i];
    const rowEvaluations = evaluations[i];
    gameRows.push(
      <GameRow key={i} letters={rowLetters} evaluations={rowEvaluations} />
    );
  }

  return (
    <div className="game-container">
      <div className="gameboard">{gameRows}</div>
      {message ? <div className="message">{message}</div> : null}
    </div>
  );
}
