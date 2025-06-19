
import TenderCard from "./TenderCard";

interface Tender {
  id: string;
  title: string;
  category: string;
  status: string;
  deadline: string;
  publishDate: string;
  value: string;
  bids: number;
  views: number;
  location: string;
  priority: string;
  evaluationScore: number | null;
}

interface TenderGridProps {
  tenders: Tender[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TenderGrid = ({ tenders, getStatusColor, getPriorityColor }: TenderGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tenders.map((tender) => (
        <TenderCard
          key={tender.id}
          tender={tender}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
      ))}
    </div>
  );
};

export default TenderGrid;
