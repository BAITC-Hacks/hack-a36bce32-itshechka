import { useOutletContext } from 'react-router-dom';
import KeyPointsView from '../features/materials/components/KeyPointsView';

export default function KeyPointsPage() {
  const { materials } = useOutletContext();
  return <KeyPointsView points={materials.keyPoints} />;
}
