import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Printer } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { MenuItem, MenuCategory } from "@shared/schema";

interface OrderItem {
  id: number;
  name: string;
  nameTamil?: string;
  price: number;
  quantity: number;
}

export function PosSection() {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu/items"],
  });

  const { data: categories = [] } = useQuery<MenuCategory[]>({
    queryKey: ["/api/menu/categories"],
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({
        title: t("Success", "வெற்றி"),
        description: t("Order created successfully", "ஆர்டர் வெற்றிகரமாக உருவாக்கப்பட்டது"),
      });
      setCurrentOrder([]);
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: (error) => {
      toast({
        title: t("Error", "பிழை"),
        description: t("Failed to create order", "ஆர்டர் உருவாக்க முடியவில்லை"),
        variant: "destructive",
      });
    },
  });

  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.categoryId === selectedCategory)
    : menuItems;

  const addToOrder = (item: MenuItem) => {
    const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      setCurrentOrder(currentOrder.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      setCurrentOrder([...currentOrder, {
        id: item.id,
        name: item.name,
        nameTamil: item.nameTamil,
        price: parseFloat(item.price),
        quantity: 1,
      }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCurrentOrder(currentOrder.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromOrder = (id: number) => {
    setCurrentOrder(currentOrder.filter(item => item.id !== id));
  };

  const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePrintBill = () => {
    if (currentOrder.length === 0) {
      toast({
        title: t("Error", "பிழை"),
        description: t("No items in order", "ஆர்டரில் பொருள்கள் இல்லை"),
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      order: {
        subtotal: subtotal.toString(),
        taxAmount: tax.toString(),
        totalAmount: total.toString(),
        paymentMethod: "cash",
        orderType: "dine-in",
        status: "completed",
      },
      orderItems: currentOrder.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        unitPrice: item.price.toString(),
        totalPrice: (item.price * item.quantity).toString(),
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  const clearOrder = () => {
    setCurrentOrder([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("POS Billing", "பில்லிங் அமைப்பு")}
        </h2>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="mr-2" size={16} />
          {t("New Order", "புதிய ஆர்டர்")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Categories & Items */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-2 flex-wrap">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t("All", "அனைத்தும்")}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {t(category.name, category.nameTamil)}
                  </Button>
                ))}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="menu-item-card"
                    onClick={() => addToOrder(item)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                        {item.emoji || "🍽️"}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">
                        {t(item.name, item.nameTamil)}
                      </h3>
                      <p className="text-primary font-semibold">₹{item.price}</p>
                      <p className="text-xs text-gray-500">
                        {t("In Stock", "கையிருப்பு")}: {item.currentStock || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("Current Order", "தற்போதைய ஆர்டர்")}
              </h3>
              
              <div className="space-y-3 mb-4">
                {currentOrder.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{t(item.name, item.nameTamil)}</p>
                      <p className="text-xs text-gray-500">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 p-0"
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 p-0"
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromOrder(item.id)}
                        className="w-6 h-6 p-0 text-red-600"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t("Subtotal", "மொத்தம்")}</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("Tax (5%)", "வரி (5%)")}</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t("Total", "மொத்த தொகை")}</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90"
                  onClick={handlePrintBill}
                  disabled={createOrderMutation.isPending}
                >
                  <Printer className="mr-2" size={16} />
                  {t("Print Bill", "பில் அச்சிடு")}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearOrder}
                >
                  <Trash2 className="mr-2" size={16} />
                  {t("Clear Order", "ஆர்டர் அழி")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
