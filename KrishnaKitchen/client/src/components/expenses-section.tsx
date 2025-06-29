import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Home, Fuel, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Expense } from "@shared/schema";

export function ExpensesSection() {
  const { t } = useLanguage();

  const { data: expenses = [] } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: monthlyExpenses = [] } = useQuery<Expense[]>({
    queryKey: ["/api/expenses/monthly", currentYear, currentMonth],
  });

  const getCategoryTotal = (category: string) => {
    return monthlyExpenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  };

  const rentTotal = getCategoryTotal("rent");
  const gasTotal = getCategoryTotal("gas") + getCategoryTotal("fuel");
  const salaryTotal = getCategoryTotal("salary");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("Expense Management", "செலவு மேலாண்மை")}
        </h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2" size={16} />
          {t("Add Expense", "செலவு சேர்")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Home className="text-red-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("Rent", "வாடகை")}
                </h3>
                <p className="text-2xl font-bold text-red-600">₹{rentTotal.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{t("This Month", "இந்த மாதம்")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Fuel className="text-orange-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("Gas/Fuel", "எரிவாயு/எரிபொருள்")}
                </h3>
                <p className="text-2xl font-bold text-orange-600">₹{gasTotal.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{t("This Month", "இந்த மாதம்")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("Staff Salary", "ஊழியர் சம்பளம்")}
                </h3>
                <p className="text-2xl font-bold text-green-600">₹{salaryTotal.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{t("This Month", "இந்த மாதம்")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("Recent Expenses", "சமீபத்திய செலவுகள்")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Date", "தேதி")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Description", "விவரம்")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Category", "வகை")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Amount", "தொகை")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Payment Method", "பணம் செலுத்தும் முறை")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {t(expense.description, expense.descriptionTamil)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`${
                      expense.category === 'rent' ? 'text-red-600' :
                      expense.category === 'gas' || expense.category === 'fuel' ? 'text-orange-600' :
                      expense.category === 'salary' ? 'text-green-600' :
                      'text-blue-600'
                    }`}>
                      ₹{parseFloat(expense.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
