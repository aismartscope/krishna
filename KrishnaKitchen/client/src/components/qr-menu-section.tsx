import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { QrTable, MenuItem, MenuCategory } from "@shared/schema";

export function QrMenuSection() {
  const { t } = useLanguage();

  const { data: qrTables = [] } = useQuery<QrTable[]>({
    queryKey: ["/api/qr-tables"],
  });

  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu/items"],
  });

  const { data: categories = [] } = useQuery<MenuCategory[]>({
    queryKey: ["/api/menu/categories"],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("QR Menu System", "QR மெனு அமைப்பு")}
        </h2>
        <div className="flex space-x-3">
          <Button className="bg-primary hover:bg-primary/90">
            <Printer className="mr-2" size={16} />
            {t("Print QR Codes", "QR குறியீடுகள் அச்சிடு")}
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            <Download className="mr-2" size={16} />
            {t("Download Menu", "மெனு பதிவிறக்கம்")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("QR Code", "QR குறியீடு")}
              </h3>
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  {/* Mock QR Code */}
                  <div className="w-40 h-40 bg-black grid grid-cols-8 gap-1 p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-full h-full ${
                          Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {t(
                    "Scan to view menu and place orders",
                    "மெனு பார்க்க மற்றும் ஆர்டர் செய்ய ஸ்கேன் செய்யவும்"
                  )}
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Printer className="mr-2" size={16} />
                    {t("Print for Table 1", "மேசை 1க்கு அச்சிடு")}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2" size={16} />
                    {t("Edit Table", "மேசை திருத்து")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("Customer Menu Preview", "வாடிக்கையாளர் மெனு முன்னோட்டம்")}
              </h3>
            </div>
            <CardContent className="p-4">
              {/* Mock mobile menu interface */}
              <div className="max-w-xs mx-auto bg-gray-900 rounded-3xl p-2">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white text-center">
                    <h2 className="text-lg font-bold">Sri Krishna Bhavan</h2>
                    <p className="text-sm opacity-90">{t("Digital Menu", "டிஜிட்டல் மெனு")}</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex space-x-2 mb-4 text-xs">
                      <button className="px-3 py-1 bg-primary text-white rounded-full">
                        {t("All", "அனைத்தும்")}
                      </button>
                      <button className="px-3 py-1 text-gray-600 bg-gray-100 rounded-full">
                        {t("South Indian", "தமிழ்")}
                      </button>
                      <button className="px-3 py-1 text-gray-600 bg-gray-100 rounded-full">
                        {t("Beverages", "பானம்")}
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {menuItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">
                              {t(item.name, item.nameTamil)}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {t(item.description || "Delicious item", item.descriptionTamil || "சுவையான உணவு")}
                            </p>
                            <p className="font-semibold text-primary text-sm">₹{item.price}</p>
                          </div>
                          <button className="px-2 py-1 bg-secondary text-white rounded text-xs">
                            {t("Add", "சேர்")}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <button className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                        {t("View Cart (0)", "கார்ட் பார் (0)")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
