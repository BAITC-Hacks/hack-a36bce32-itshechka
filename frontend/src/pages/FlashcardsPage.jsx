import { useOutletContext } from 'react-router-dom';
import FlashcardDeck from '../features/flashcards/components/FlashcardDeck';

export default function FlashcardsPage() {
  const { materials } = useOutletContext();
  return <FlashcardDeck cards={materials.flashcards} />;
}
