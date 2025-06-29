import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { PosSection } from "@/components/pos-section";
import { InventorySection } from "@/components/inventory-section";
import { ExpensesSection } from "@/components/expenses-section";
import { QrMenuSection } from "@/components/qr-menu-section";
import { StaffSection } from "@/components/staff-section";
import { ReportsSection } from "@/components/reports-section";
import { AiAssistantSection } from "@/components/ai-assistant-section";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Calendar, Languages, LogOut, Utensils } from "lucide-react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string>("pos");
  const { user } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const renderSection = () => {
    switch (activeSection) {
      case "pos":
        return <PosSection />;
      case "inventory":
        return <InventorySection />;
      case "expenses":
        return <ExpensesSection />;
      case "qr-menu":
        return <QrMenuSection />;
      case "staff":
        return <StaffSection />;
      case "reports":
        return <ReportsSection />;
      case "ai-assistant":
        return <AiAssistantSection />;
      default:
        return <PosSection />;
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Utensils className="text-white text-sm" size={16} />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">Sri Krishna Bhavan</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{currentDate}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                <Languages size={16} />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} ({user?.role === 'owner' ? 'Owner' : 'Staff'})
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
