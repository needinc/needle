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

function Game({ word }) {
  // When true, no further actions can be taken
  const [gameOver, setGameOver] = useState(false);

  // The user's current attempt starting from 0 and ending at 5 for a
  // total of 6 attempts.
  const [currAttempt, setCurrAttempt] = useState(0);

  // The current key that the user has entered
  // i.e. "d", "a", "enter", "backspace"
  const [currKey, setCurrKey] = useState("");

  // The letters for each attempt. For example, after 2 attempts, letters may
  // look like ["other", "snail", "", "", "", ""]
  const [letters, setLetters] = useState(["", "", "", "", "", ""]);

  // Evaluations for each letter of each attempt. An evaluation can be 1 of 3 options:
  // "correct" => the letter is in the word and in the correct spot
  // "present" => the letter is in the word but in the wrong spot
  // "absent" => the letter is not in the word in any spot
  //
  // For example if the word is "share",
  // evaulations for ["other", "snail", "", "", "", ""] would look like
  // [
  //        o         t         h          e          r
  //   ["absent", "absent", "present", "present", "present"],
  //
  //        s          n         a          i         l
  //   ["correct", "absent", "correct", "absent", "absent],
  //
  //   [], [], [], []]
  const [evaluations, setEvaluations] = useState([[], [], [], [], [], []]);

  // Show a message to the user
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
