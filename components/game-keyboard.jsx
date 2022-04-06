const qwertyKeyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["backspace", "z", "x", "c", "v", "b", "n", "m", "enter"],
];

function Keyboard({ setCurrKey }) {
  return (
    <div className="keyboard">
      {qwertyKeyboard.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((char) => (
            <Key key={char} char={char} setCurrKey={setCurrKey} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Key({ char, setCurrKey }) {
  const handleClick = () => setCurrKey(char);
  return (
    <div className="keyboard-key" onClick={handleClick}>
      {char}
    </div>
  );
}
