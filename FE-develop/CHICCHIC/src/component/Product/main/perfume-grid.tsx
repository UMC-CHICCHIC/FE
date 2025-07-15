import { perfumes } from '../../../data/perfumes';
import { PerfumeCard } from './perfume-card';

export function PerfumeGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {perfumes.slice(0, 4).map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
}