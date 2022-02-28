function GameRow(props) {
  const letters = props.letters || "";

  let gameTiles = [];
  for (let i = 0; i < 5; i++) {
    gameTiles.push(
      <GameTile key={i} letter={letters[i]} evaluation={props.evaluations[i]} />
    );
  }

  return <div className="game-row">{gameTiles}</div>;
}
