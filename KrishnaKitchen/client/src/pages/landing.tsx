import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Utensils, Crown, User, Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Landing() {
  const { language, toggleLanguage, t } = useLanguage();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Utensils className="text-white text-2xl" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sri Krishna Bhavan
              </h1>
              <p className="text-gray-600">
                {t("Restaurant Management System", "உணவகம் மேலாண்மை அமைப்பு")}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Username", "பயனர் பெயர்")}
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t("Enter username", "பயனர் பெயர் உள்ளிடவும்")}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Password", "கடவுச்சொல்")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("Enter password", "கடவுச்சொல் உள்ளிடவும்")}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90">
                <Crown className="mr-2" size={16} />
                {t("Owner Login", "உரிமையாளர் நுழைவு")}
              </Button>
              <Button onClick={handleLogin} className="bg-secondary hover:bg-secondary/90">
                <User className="mr-2" size={16} />
                {t("Staff Login", "ஊழியர் நுழைவு")}
              </Button>
            </div>

            <div className="flex justify-center">
              <Button variant="ghost" onClick={toggleLanguage} className="text-sm text-gray-500 hover:text-primary">
                <Languages className="mr-1" size={16} />
                {language === 'en' ? 'தமிழ் / English' : 'English / தமிழ்'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
