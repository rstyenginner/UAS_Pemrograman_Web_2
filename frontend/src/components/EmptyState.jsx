import { SearchX } from 'lucide-react';
export default function EmptyState({
  title = 'Data belum tersedia',
  description = 'Coba muat ulang halaman atau tambahkan data baru.',
}) {
  return (
    <div className="empty-state">
      <SearchX size={42} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
