import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Building2, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
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

interface ProposalModalProps {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (proposalId: number, newStatus: string) => void;
}

export default function ProposalModal({ proposal, isOpen, onClose, onStatusUpdate }: ProposalModalProps) {
  if (!proposal) return null;

  const handleAction = (action: string) => {
    onStatusUpdate(proposal.id, action);
    toast.success(`Proposal ${action.toLowerCase()} successfully!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {proposal.title}
          </DialogTitle>
          <div className="flex items-center gap-2 pt-2">
            <StatusBadge status={proposal.status} />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Proposal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Proposal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submitted By</p>
                    <p className="text-sm text-gray-600">{proposal.submittedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Department</p>
                    <p className="text-sm text-gray-600">{proposal.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Date</p>
                    <p className="text-sm text-gray-600">
                      {new Date(proposal.dateSubmitted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposal Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Proposal Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {proposal.content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apex Committee Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleAction("Approved")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleAction("Rejected")}
                  variant="destructive"
                  size="lg"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleAction("Revision Requested")}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Request Revision
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
