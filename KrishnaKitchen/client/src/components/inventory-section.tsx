import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { InventoryItem } from "@shared/schema";

export function InventorySection() {
  const { t } = useLanguage();

  const { data: inventoryItems = [] } = useQuery<InventoryItem[]>({
    queryKey: ["/api/inventory"],
  });

  const getStockStatus = (currentStock: number, minLevel: number) => {
    if (currentStock === 0) return "out-of-stock";
    if (currentStock <= minLevel) return "low-stock";
    return "in-stock";
  };

  const getStockStatusLabel = (status: string) => {
    switch (status) {
      case "in-stock":
        return { label: t("In Stock", "கையிருப்பில்"), variant: "in-stock" };
      case "low-stock":
        return { label: t("Low Stock", "குறைந்த சரக்கு"), variant: "low-stock" };
      case "out-of-stock":
        return { label: t("Out of Stock", "சரக்கு இல்லை"), variant: "out-of-stock" };
      default:
        return { label: "", variant: "in-stock" };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("Inventory Management", "சரக்கு மேலாண்மை")}
        </h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2" size={16} />
          {t("Add Item", "பொருள் சேர்")}
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("All Categories", "அனைத்து வகைகள்")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Categories", "அனைத்து வகைகள்")}</SelectItem>
                  <SelectItem value="raw-materials">{t("Raw Materials", "மூலப்பொருள்")}</SelectItem>
                  <SelectItem value="finished-items">{t("Finished Items", "முடிக்கப்பட்ட உணவுகள்")}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder={t("All Stock", "அனைத்து சரக்கு")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Stock", "அனைத்து சரக்கு")}</SelectItem>
                  <SelectItem value="low">{t("Low Stock", "குறைந்த சரக்கு")}</SelectItem>
                  <SelectItem value="out">{t("Out of Stock", "சரக்கு இல்லை")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder={t("Search items...", "பொருள்களை தேடவும்...")}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Item Name", "பொருளின் பெயர்")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Category", "வகை")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Current Stock", "தற்போதைய சரக்கு")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Min Level", "குறைந்த அளவு")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Unit Price", "ஒரு அலகு விலை")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Status", "நிலை")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Actions", "செயல்கள்")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryItems.map((item) => {
                const currentStock = parseFloat(item.currentStock);
                const minLevel = parseFloat(item.minLevel);
                const status = getStockStatus(currentStock, minLevel);
                const statusInfo = getStockStatusLabel(status);
                
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {t(item.name, item.nameTamil)}
                      </div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currentStock} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {minLevel} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.unitPrice}/{item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`status-badge ${statusInfo.variant}`}>
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700 mr-3">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-red-700">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
