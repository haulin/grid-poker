import { Card } from './Card';

export function Deck({ deck }: { deck: string[] }): JSX.Element {
  return (
    <>
      <p>Cards left in deck</p>
      <ul className="deck">
        {deck.map((card, index) => (
          <li key={index}>
            <Card card={card} />
          </li>
        ))}
      </ul>
    </>
  );
}
