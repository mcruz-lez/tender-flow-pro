
import { Card, CardContent } from "@/components/ui/card";

interface TenderStatsProps {
  stats: {
    total: number;
    active: number;
    evaluation: number;
    draft: number;
    totalValue: number;
    avgBids: number;
  };
}

const TenderStats = ({ stats }: TenderStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-white/60">Total Tenders</div>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.active}</div>
          <div className="text-sm text-white/60">Active</div>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.evaluation}</div>
          <div className="text-sm text-white/60">In Evaluation</div>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.draft}</div>
          <div className="text-sm text-white/60">Draft</div>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-white">${(stats.totalValue / 1000).toFixed(0)}K</div>
          <div className="text-sm text-white/60">Total Value</div>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.avgBids}</div>
          <div className="text-sm text-white/60">Avg Bids</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenderStats;
