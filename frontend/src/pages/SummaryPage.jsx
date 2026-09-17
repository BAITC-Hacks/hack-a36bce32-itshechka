import { useOutletContext } from 'react-router-dom';
import SummaryView from '../features/materials/components/SummaryView';

export default function SummaryPage() {
  const { materials } = useOutletContext();
  return <SummaryView sections={materials.summary} />;
}
