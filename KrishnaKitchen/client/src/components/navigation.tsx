import { 
  ScanBarcode, 
  Package, 
  Receipt, 
  QrCode, 
  Users, 
  BarChart3, 
  Bot 
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: "pos", icon: ScanBarcode, label: "POS Billing", labelTamil: "பில்லிங்" },
    { id: "inventory", icon: Package, label: "Inventory", labelTamil: "சரக்கு" },
    { id: "expenses", icon: Receipt, label: "Expenses", labelTamil: "செலவுகள்" },
    { id: "qr-menu", icon: QrCode, label: "QR Menu", labelTamil: "QR மெனு" },
    { id: "staff", icon: Users, label: "Staff", labelTamil: "ஊழியர்கள்" },
    { id: "reports", icon: BarChart3, label: "Reports", labelTamil: "அறிக்கைகள்" },
    { id: "ai-assistant", icon: Bot, label: "AI Assistant", labelTamil: "AI உதவியாளர்" },
  ];

  return (
    <nav className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`nav-item w-full ${
                    isActive 
                      ? "text-primary bg-blue-50" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <Icon className="mr-3" size={20} />
                  <span>{t(item.label, item.labelTamil)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
