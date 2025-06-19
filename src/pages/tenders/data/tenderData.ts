
export interface Tender {
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

export const mockTenders: Tender[] = [
  {
    id: "1",
    title: "HVAC System Maintenance Contract",
    category: "Property Maintenance",
    status: "Active",
    deadline: "2024-01-15",
    publishDate: "2023-12-01",
    value: "$50,000",
    bids: 12,
    views: 156,
    location: "Downtown Office Complex",
    priority: "High",
    evaluationScore: 85
  },
  {
    id: "2", 
    title: "Security Services for Commercial Buildings",
    category: "Security Services",
    status: "Draft",
    deadline: "2024-01-20",
    publishDate: "2023-12-05",
    value: "$75,000",
    bids: 0,
    views: 45,
    location: "Business District",
    priority: "Medium",
    evaluationScore: null
  },
  {
    id: "3",
    title: "Landscaping and Groundskeeping Services",
    category: "Landscaping",
    status: "Closed",
    deadline: "2023-12-30",
    publishDate: "2023-11-15",
    value: "$30,000",
    bids: 18,
    views: 234,
    location: "Corporate Campus",
    priority: "Low",
    evaluationScore: 92
  },
  {
    id: "4",
    title: "Electrical Infrastructure Upgrade",
    category: "Construction",
    status: "Evaluation",
    deadline: "2024-01-10",
    publishDate: "2023-11-20",
    value: "$120,000",
    bids: 8,
    views: 189,
    location: "Industrial Complex",
    priority: "High",
    evaluationScore: 78
  },
  {
    id: "5",
    title: "Cleaning Services Contract",
    category: "Cleaning Services", 
    status: "Active",
    deadline: "2024-02-01",
    publishDate: "2023-12-10",
    value: "$25,000",
    bids: 15,
    views: 167,
    location: "Office Building",
    priority: "Medium",
    evaluationScore: null
  },
  {
    id: "6",
    title: "IT Infrastructure Services",
    category: "Technology Services",
    status: "Awarded",
    deadline: "2023-12-20",
    publishDate: "2023-10-15",
    value: "$95,000",
    bids: 6,
    views: 123,
    location: "Tech Hub",
    priority: "High",
    evaluationScore: 94
  }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800 border-green-200";
    case "Draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Closed": return "bg-gray-100 text-gray-800 border-gray-200";
    case "Evaluation": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Awarded": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800";
    case "Medium": return "bg-yellow-100 text-yellow-800";
    case "Low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};
