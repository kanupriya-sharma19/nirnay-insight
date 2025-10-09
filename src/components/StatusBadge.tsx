import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Accepted by NACCER":
        return {
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
          text: "Accepted by NACCER"
        };
      case "Under Review":
        return {
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          text: "Under Review"
        };
      case "Approved":
        return {
          className: "bg-green-100 text-green-800 hover:bg-green-100",
          text: "Approved"
        };
      case "Rejected":
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-100",
          text: "Rejected"
        };
      case "Revision Requested":
        return {
          className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
          text: "Revision Requested"
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
          text: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={config.className}>
      {config.text}
    </Badge>
  );
}
