import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, DollarSign, ShoppingCart, TrendingUp, PieChart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Order } from "@shared/schema";

interface SalesAnalytics {
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  topSellingItems: { name: string; quantity: number; revenue: number }[];
}

export function ReportsSection() {
  const { t } = useLanguage();

  const { data: todaysOrders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders/today"],
  });

  const { data: analytics } = useQuery<SalesAnalytics>({
    queryKey: ["/api/analytics/sales", { 
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }],
  });

  const todaysSales = todaysOrders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
  const ordersCount = todaysOrders.length;
  const avgOrderValue = ordersCount > 0 ? todaysSales / ordersCount : 0;
  const profitMargin = 68; // Mock percentage

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("Sales Reports & Analytics", "விற்பனை அறிக்கைகள் மற்றும் பகுப்பாய்வு")}
        </h2>
        <div className="flex space-x-3">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("Today", "இன்று")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t("Today", "இன்று")}</SelectItem>
              <SelectItem value="week">{t("This Week", "இந்த வாரம்")}</SelectItem>
              <SelectItem value="month">{t("This Month", "இந்த மாதம்")}</SelectItem>
              <SelectItem value="custom">{t("Custom Range", "தனிப்பயன் வரம்பு")}</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2" size={16} />
            {t("Export Report", "அறிக்கை ஏற்றுமதி")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">₹{todaysSales.toLocaleString()}</h3>
                <p className="text-sm text-gray-500">{t("Today's Sales", "இன்றைய விற்பனை")}</p>
                <p className="text-xs text-green-600">+12% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{ordersCount}</h3>
                <p className="text-sm text-gray-500">{t("Orders Today", "இன்றைய ஆர்டர்கள்")}</p>
                <p className="text-xs text-blue-600">+8% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">₹{Math.round(avgOrderValue)}</h3>
                <p className="text-sm text-gray-500">{t("Avg Order Value", "சராசரி ஆர்டர் மதிப்பு")}</p>
                <p className="text-xs text-yellow-600">+5% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <PieChart className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{profitMargin}%</h3>
                <p className="text-sm text-gray-500">{t("Profit Margin", "லாப விகிதம்")}</p>
                <p className="text-xs text-purple-600">+2% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("Top Selling Items", "அதிக விற்பனையான உணவுகள்")}
            </h3>
            <div className="space-y-4">
              {analytics?.topSellingItems.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm">🍽️</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {t("orders", "ஆர்டர்கள்")}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">₹{item.revenue.toLocaleString()}</span>
                </div>
              )) || (
                // Fallback when no analytics data
                <div className="text-center text-gray-500 py-8">
                  {t("No data available", "தரவு கிடைக்கவில்லை")}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("Recent Transactions", "சமீபத்திய பரிவர்த்தனைகள்")}
            </h3>
            <div className="space-y-4">
              {todaysOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt!).toLocaleTimeString()} - 
                      {order.tableNumber ? ` Table ${order.tableNumber}` : " QR Order"}
                    </p>
                  </div>
                  <span className="font-semibold text-green-600">₹{parseFloat(order.totalAmount).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
