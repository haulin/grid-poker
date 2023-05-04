import { ReactComponent as Club } from './assets/suit-club.svg';
import { ReactComponent as Diamond } from './assets/suit-diamond.svg';
import { ReactComponent as Heart } from './assets/suit-heart.svg';
import { ReactComponent as Spade } from './assets/suit-spade.svg';

type Suit = 'C' | 'D' | 'H' | 'S';

export function Card({ card }: { card: string }): JSX.Element {
  const color = 'CS'.indexOf(card.charAt(1)) === -1 ? 'red' : 'black';
  const symbols = {
    C: Club,
    D: Diamond,
    H: Heart,
    S: Spade,
  };
  const face = card.charAt(0).replace('T', '10');
  const Suit = symbols[card.charAt(1) as Suit];
  return (
    <div className={`card card--${color}`}>
      <span className="card__face">{face}</span>
      <span className="card__suit">
        <Suit />
        <span className="card__suit--shine">
          <Suit />
        </span>
      </span>
    </div>
  );
}
