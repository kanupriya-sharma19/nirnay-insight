import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Building2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface Proposal {
  id: number;
  title: string;
  submittedBy: string;
  department: string;
  status: string;
  dateSubmitted: string;
  content: string;
}

interface ProposalCardProps {
  proposal: Proposal;
  onViewDetails: (proposal: Proposal) => void;
}

export default function ProposalCard({ proposal, onViewDetails }: ProposalCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
            {proposal.title}
          </CardTitle>
          <StatusBadge status={proposal.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{proposal.submittedBy}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4" />
            <span>{proposal.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(proposal.dateSubmitted).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="pt-2">
          <Button 
            onClick={() => onViewDetails(proposal)}
            className="w-full"
            variant="outline"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
