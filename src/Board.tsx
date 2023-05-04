import { useState } from 'react';
import { Card } from '.';
import { getHandByIndex, getScore } from './utils';

export type UndoRef = {
  undo: () => string;
  lastIndex: number;
};

export function Board({
  onClick,
  undoRef,
}: {
  onClick: (board: string[], index: number) => string[];
  undoRef: React.MutableRefObject<UndoRef>;
}) {
  const [board, setBoard] = useState(() => {
    const board: string[] = [];
    for (let i = 0; i < 25; i++) {
      board.push('');
    }
    return board;
  });

  function handleUndo() {
    if (!Number.isNaN(undoRef.current.lastIndex)) {
      const newBoard = [...board];
      const card = newBoard[undoRef.current.lastIndex];
      newBoard[undoRef.current.lastIndex] = '';
      undoRef.current.lastIndex = NaN;
      setBoard(newBoard);
      return card;
    }
    return '';
  }

  undoRef.current.undo = handleUndo;

  return (
    <div className="board-wrap">
      <div className="board__header"></div>
      {Array.from(Array(12)).map((_, index) => {
        const hand = getHandByIndex(board, index);
        const score = getScore(hand);
        return (
          <div className="board__score" key={index}>
            <span style={{ fontSize: '2em' }} title={hand}>
              {score || ''}
            </span>
          </div>
        );
      })}
      <ul className="board">
        {board.map((tile, index) => {
          return (
            <li
              className="board__tile"
              key={index}
              onClick={() => {
                if (!tile) setBoard(onClick(board, index));
              }}
            >
              {!!tile && <Card card={tile} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
