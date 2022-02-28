function App() {
  // Pick a word at random from the list
  const word = words[Math.floor(Math.random() * words.length)];

  return (
    <div className="app-container">
      <Header />
      <Game word={word} />
    </div>
  );
}
