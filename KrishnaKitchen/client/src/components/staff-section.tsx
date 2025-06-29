import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, UserCheck, UserX, Clock, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Staff, StaffAttendance } from "@shared/schema";

export function StaffSection() {
  const { t } = useLanguage();

  const { data: staffList = [] } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const { data: todaysAttendance = [] } = useQuery<(StaffAttendance & { staff: Staff })[]>({
    queryKey: ["/api/staff/attendance/today"],
  });

  const totalStaff = staffList.length;
  const presentToday = todaysAttendance.filter(a => a.status === "present").length;
  const absentToday = totalStaff - presentToday;
  const onDuty = todaysAttendance.filter(a => a.status === "present" && a.checkInTime && !a.checkOutTime).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("Staff Management", "ஊழியர் மேலாண்மை")}
        </h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2" size={16} />
          {t("Add Staff", "ஊழியர் சேர்")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalStaff}</h3>
              <p className="text-sm text-gray-500">{t("Total Staff", "மொத்த ஊழியர்கள்")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <UserCheck className="text-green-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-green-600">{presentToday}</h3>
              <p className="text-sm text-gray-500">{t("Present Today", "இன்று வந்தவர்கள்")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <UserX className="text-red-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-red-600">{absentToday}</h3>
              <p className="text-sm text-gray-500">{t("Absent Today", "இன்று வராதவர்கள்")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-yellow-600">{onDuty}</h3>
              <p className="text-sm text-gray-500">{t("On Duty", "பணியில்")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("Staff Details", "ஊழியர் விவரங்கள்")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Name", "பெயர்")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Role", "பதவி")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Shift", "ஷிப்ட்")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Phone", "தொலைபேசி")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("Salary", "சம்பளம்")}
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
              {staffList.map((staff) => {
                const attendance = todaysAttendance.find(a => a.staffId === staff.id);
                const isPresent = attendance?.status === "present";
                
                return (
                  <tr key={staff.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-500">{staff.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t(staff.role, staff.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staff.shift || "Full Day"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staff.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{parseFloat(staff.salary).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`status-badge ${isPresent ? "present" : "absent"}`}>
                        {isPresent ? t("Present", "வந்துள்ளார்") : t("Absent", "வரவில்லை")}
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
