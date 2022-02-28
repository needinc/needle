function GameTile(props) {
  // dataState can be one of "empty" | "tbd" | "absent" | "present" | "correct"
  let dataState = "empty";
  if (props.letter) dataState = "tbd";
  if (props.evaluation) dataState = props.evaluation;

  return (
    <div className="tile" data-state={dataState}>
      {props.letter}
    </div>
  );
}
