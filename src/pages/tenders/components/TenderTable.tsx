import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Star } from "lucide-react";

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

interface TenderTableProps {
  tenders: Tender[];
  getStatusColor: (status: string) => string;
}

const TenderTable = ({ tenders, getStatusColor }: TenderTableProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="border-white/20">
            <TableHead className="text-white/80">Title</TableHead>
            <TableHead className="text-white/80">Category</TableHead>
            <TableHead className="text-white/80">Status</TableHead>
            <TableHead className="text-white/80">Value</TableHead>
            <TableHead className="text-white/80">Bids</TableHead>
            <TableHead className="text-white/80">Deadline</TableHead>
            <TableHead className="text-white/80">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenders.map((tender) => (
            <TableRow
              key={tender.id}
              className="border-white/10 hover:bg-white/5"
            >
              <TableCell>
                <div>
                  <p className="font-medium text-white">{tender.title}</p>
                  <p className="text-sm text-white/60">{tender.location}</p>
                </div>
              </TableCell>
              <TableCell className="text-white">{tender.category}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(tender.status)}>
                  {tender.status}
                </Badge>
              </TableCell>
              <TableCell className="text-white font-medium">
                {tender.value}
              </TableCell>
              <TableCell className="text-white">{tender.bids}</TableCell>
              <TableCell className="text-white">{tender.deadline}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Link to={`/tenders/tender/${tender.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  {tender.status === "Active" && tender.bids > 0 && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Link to={`/evaluation/panel/${tender.id}`}>
                        <Star className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TenderTable;
