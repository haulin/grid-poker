import { useRef, useState } from 'react';
import { Board, Card, Deck, UndoRef } from '.';
import { ReactComponent as Undo } from './assets/action-undo.svg';

import './styles.css';
import { generateDeck, shuffleDeck } from './utils';

function App() {
  const [deck, setDeck] = useState(shuffleDeck(generateDeck()));
  const [mode, setMode] = useState('main');
  const [seed, setSeed] = useState(Math.random().toString(36).slice(2));
  const undoRef = useRef<UndoRef>({ undo: () => '', lastIndex: NaN });

  function handleNewGame() {
    setDeck(shuffleDeck(generateDeck()));
    setSeed(Math.random().toString(36).slice(2));
  }

  function handleTileClick(board: string[], index: number) {
    const newBoard = [...board];
    const newDeck = [...deck];
    newBoard[index] = newDeck.shift() || '';
    undoRef.current.lastIndex = index;
    setDeck(newDeck);
    return newBoard;
  }

  function handleUndo() {
    const newDeck = [...deck];
    const card = undoRef.current.undo();
    if (card) {
      newDeck.unshift(card);
      setDeck(newDeck);
    }
  }

  return (
    <>
      <header>
        <button onClick={() => setMode('main')}>Home</button>
        <button onClick={handleNewGame}>New Game</button>
      </header>
      <div className="table" hidden={mode !== 'main'}>
        <div className="sidebar">
          Next card
          <Card card={deck[0]} />
          <button
            className="action-button"
            onClick={handleUndo}
            title="Undo move"
          >
            <Undo />
          </button>
          <button className="card card--deck" onClick={() => setMode('deck')}>
            See deck
          </button>
        </div>
        <Board key={seed} onClick={handleTileClick} undoRef={undoRef} />
      </div>
      <div hidden={mode !== 'deck'}>
        <Deck deck={deck} />
      </div>
    </>
  );
}

export default App;
