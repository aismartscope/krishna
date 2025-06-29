import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  AlertCircle,
  Clock
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { InventoryItem } from "@shared/schema";

interface ChatMessage {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

export function AiAssistantSection() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: t("ai_welcome", "வணக்கம்! நான் உங்கள் உணவக AI உதவியாளர். சரக்கு எச்சரிக்கைகள், விற்பனை பகுப்பாய்வு, ஊழியர் மேலாண்மை மற்றும் உங்கள் உணவக செயல்பாடுகள் பற்றிய கேள்விகளுக்கு நான் உதவ முடியும். நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?"),
      isAi: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const { data: lowStockItems = [] } = useQuery<InventoryItem[]>({
    queryKey: ["/api/inventory/low-stock"],
  });

  const { data: todaysOrders = [] } = useQuery({
    queryKey: ["/api/orders/today"],
  });

  const { data: todaysAttendance = [] } = useQuery({
    queryKey: ["/api/staff/attendance/today"],
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isAi: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on message content
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes("stock") || lowerInput.includes("inventory") || lowerInput.includes("சரக்கு")) {
        const outOfStockCount = lowStockItems.filter(item => parseFloat(item.currentStock) === 0).length;
        const lowStockCount = lowStockItems.filter(item => parseFloat(item.currentStock) > 0 && parseFloat(item.currentStock) <= parseFloat(item.minLevel)).length;
        
        aiResponse = language === 'ta' 
          ? `தற்போது ${outOfStockCount} பொருள்கள் முற்றிலும் தீர்ந்துவிட்டன மற்றும் ${lowStockCount} பொருள்கள் குறைந்த அளவில் உள்ளன. உடனடியாக மீண்டும் ஸ்டாக் செய்ய வேண்டிய பொருள்கள்: ${lowStockItems.slice(0, 3).map(item => item.name).join(', ')}`
          : `Currently ${outOfStockCount} items are out of stock and ${lowStockCount} items are running low. Items that need immediate restocking: ${lowStockItems.slice(0, 3).map(item => item.name).join(', ')}`;
      } else if (lowerInput.includes("sales") || lowerInput.includes("revenue") || lowerInput.includes("விற்பனை")) {
        const totalSales = todaysOrders.reduce((sum: number, order: any) => sum + parseFloat(order.totalAmount), 0);
        const orderCount = todaysOrders.length;
        
        aiResponse = language === 'ta'
          ? `இன்று மொத்தம் ${orderCount} ஆர்டர்கள் மூலம் ₹${totalSales.toLocaleString()} விற்பனை ஆனது. சராசரி ஆர்டர் மதிப்பு ₹${orderCount > 0 ? Math.round(totalSales / orderCount) : 0} ஆகும். கடந்த வாரத்துடன் ஒப்பிடும்போது 12% அதிகரிப்பு உள்ளது.`
          : `Today's sales total ₹${totalSales.toLocaleString()} from ${orderCount} orders. Average order value is ₹${orderCount > 0 ? Math.round(totalSales / orderCount) : 0}. This represents a 12% increase compared to last week.`;
      } else if (lowerInput.includes("staff") || lowerInput.includes("attendance") || lowerInput.includes("ஊழியர்")) {
        const presentCount = todaysAttendance.filter((a: any) => a.status === "present").length;
        const totalStaff = 8; // Based on the mock data
        
        aiResponse = language === 'ta'
          ? `இன்று ${totalStaff} ஊழியர்களில் ${presentCount} பேர் வந்துள்ளனர். ${totalStaff - presentCount} பேர் வரவில்லை. தற்போது ${presentCount} பேர் பணியில் உள்ளனர். அனைவரும் நேரக்கட்டுப்பாட்டுடன் வேலை செய்து வருகின்றனர்.`
          : `Today ${presentCount} out of ${totalStaff} staff members are present. ${totalStaff - presentCount} are absent. Currently ${presentCount} staff are on duty. Everyone is working within their scheduled hours.`;
      } else {
        aiResponse = language === 'ta'
          ? "நான் உங்களுக்கு சரக்கு நிலை, விற்பனை அறிக்கைகள், ஊழியர் மேலாண்மை மற்றும் உணவக செயல்பாடுகள் குறித்து உதவ முடியும். தயவுசெய்து குறிப்பிட்ட கேள்வி கேளுங்கள்."
          : "I can help you with inventory status, sales reports, staff management, and restaurant operations. Please ask me a specific question about these topics.";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isAi: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    
    switch (action) {
      case "low-stock":
        message = language === 'ta' ? "குறைந்த சரக்கு உள்ள பொருள்களை காட்டு" : "Show me items with low stock";
        break;
      case "sales-analysis":
        message = language === 'ta' ? "இன்றைய விற்பனை பகுப்பாய்வு தரவும்" : "Give me today's sales analysis";
        break;
      case "staff-summary":
        message = language === 'ta' ? "ஊழியர் வருகை சுருக்கம் தரவும்" : "Give me staff attendance summary";
        break;
    }
    
    setInputMessage(message);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("AI Assistant", "AI உதவியாளர்")}
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{t("Online", "ஆன்லைன்")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-96 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("Chat with AI Assistant", "AI உதவியாளருடன் அரட்டை")}
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  {message.isAi && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="text-white" size={16} />
                    </div>
                  )}
                  <div className={`flex-1 ${message.isAi ? 'bg-gray-100' : 'bg-primary text-white ml-auto'} rounded-lg p-3 max-w-[80%] ${!message.isAi ? 'ml-auto' : ''}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isAi ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {!message.isAi && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t("Type your message...", "உங்கள் செய்தியை தட்டச்சு செய்யவும்...")}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("Quick Actions", "விரைவு செயல்கள்")}
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleQuickAction("low-stock")}
                  className="w-full text-left p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <div className="flex items-center">
                    <AlertTriangle className="text-yellow-600 mr-3" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {t("Check Low Stock", "குறைந்த சரக்கு பார்")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("3 items need attention", "3 பொருள்கள் கவனம் தேவை")}
                      </p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleQuickAction("sales-analysis")}
                  className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <BarChart3 className="text-blue-600 mr-3" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {t("Sales Analysis", "விற்பனை பகுப்பாய்வு")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("Get insights on today's performance", "இன்றைய செயல்திறன் குறித்த நுண்ணறிவு")}
                      </p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleQuickAction("staff-summary")}
                  className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Users className="text-green-600 mr-3" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {t("Staff Summary", "ஊழியர் சுருக்கம்")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("Check attendance and schedules", "வருகை மற்றும் அட்டவணைகளை சரிபார்க்கவும்")}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("Recent Alerts", "சமீபத்திய எச்சரிக்கைகள்")}
              </h3>
              <div className="space-y-3">
                {lowStockItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="text-red-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <p className="text-sm font-medium text-red-900">
                          {parseFloat(item.currentStock) === 0 
                            ? `${t(item.name, item.nameTamil)} ${t("out of stock", "சரக்கு இல்லை")}`
                            : `${t(item.name, item.nameTamil)} ${t("running low", "குறைந்து வருகிறது")}`
                          }
                        </p>
                        <p className="text-xs text-red-700 flex items-center mt-1">
                          <Clock size={12} className="mr-1" />
                          {t("5 mins ago", "5 நிமிடங்களுக்கு முன்")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {lowStockItems.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <p className="text-sm">{t("No recent alerts", "சமீபத்திய எச்சரிக்கைகள் இல்லை")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
