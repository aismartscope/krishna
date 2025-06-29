export interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

export const translations: Translations = {
  // Common
  "All": { en: "All", ta: "அனைத்தும்" },
  "Add": { en: "Add", ta: "சேர்" },
  "Edit": { en: "Edit", ta: "திருத்து" },
  "Delete": { en: "Delete", ta: "அழி" },
  "Save": { en: "Save", ta: "சேமி" },
  "Cancel": { en: "Cancel", ta: "ரத்து" },
  "Search": { en: "Search", ta: "தேடு" },
  "Loading": { en: "Loading", ta: "ஏற்றுகிறது" },
  "Error": { en: "Error", ta: "பிழை" },
  "Success": { en: "Success", ta: "வெற்றி" },
  "Today": { en: "Today", ta: "இன்று" },
  "This Week": { en: "This Week", ta: "இந்த வாரம்" },
  "This Month": { en: "This Month", ta: "இந்த மாதம்" },
  "Total": { en: "Total", ta: "மொத்த தொகை" },
  "Status": { en: "Status", ta: "நிலை" },
  "Actions": { en: "Actions", ta: "செயல்கள்" },
  "Date": { en: "Date", ta: "தேதி" },
  "Amount": { en: "Amount", ta: "தொகை" },
  "Description": { en: "Description", ta: "விவரம்" },
  "Category": { en: "Category", ta: "வகை" },
  "Name": { en: "Name", ta: "பெயர்" },
  "Phone": { en: "Phone", ta: "தொலைபேசி" },
  "Price": { en: "Price", ta: "விலை" },
  "Quantity": { en: "Quantity", ta: "அளவு" },

  // Login & Auth
  "Restaurant Management System": { en: "Restaurant Management System", ta: "உணவகம் மேலாண்மை அமைப்பு" },
  "Username": { en: "Username", ta: "பயனர் பெயர்" },
  "Password": { en: "Password", ta: "கடவுச்சொல்" },
  "Enter username": { en: "Enter username", ta: "பயனர் பெயர் உள்ளிடவும்" },
  "Enter password": { en: "Enter password", ta: "கடவுச்சொல் உள்ளிடவும்" },
  "Owner Login": { en: "Owner Login", ta: "உரிமையாளர் நுழைவு" },
  "Staff Login": { en: "Staff Login", ta: "ஊழியர் நுழைவு" },

  // Navigation
  "POS Billing": { en: "POS Billing", ta: "பில்லிங்" },
  "Inventory": { en: "Inventory", ta: "சரக்கு" },
  "Expenses": { en: "Expenses", ta: "செலவுகள்" },
  "QR Menu": { en: "QR Menu", ta: "QR மெனு" },
  "Staff": { en: "Staff", ta: "ஊழியர்கள்" },
  "Reports": { en: "Reports", ta: "அறிக்கைகள்" },
  "AI Assistant": { en: "AI Assistant", ta: "AI உதவியாளர்" },

  // POS Section
  "POS Billing System": { en: "POS Billing System", ta: "பில்லிங் அமைப்பு" },
  "New Order": { en: "New Order", ta: "புதிய ஆர்டர்" },
  "Current Order": { en: "Current Order", ta: "தற்போதைய ஆர்டர்" },
  "Subtotal": { en: "Subtotal", ta: "மொத்தம்" },
  "Tax (5%)": { en: "Tax (5%)", ta: "வரி (5%)" },
  "Print Bill": { en: "Print Bill", ta: "பில் அச்சிடு" },
  "Clear Order": { en: "Clear Order", ta: "ஆர்டர் அழி" },
  "In Stock": { en: "In Stock", ta: "கையிருப்பு" },
  "South Indian": { en: "South Indian", ta: "தென் இந்திய" },
  "North Indian": { en: "North Indian", ta: "வட இந்திய" },
  "Beverages": { en: "Beverages", ta: "பானங்கள்" },
  "Desserts": { en: "Desserts", ta: "இனிப்புகள்" },

  // Inventory Section
  "Inventory Management": { en: "Inventory Management", ta: "சரக்கு மேலாண்மை" },
  "Add Item": { en: "Add Item", ta: "பொருள் சேர்" },
  "Item Name": { en: "Item Name", ta: "பொருளின் பெயர்" },
  "Current Stock": { en: "Current Stock", ta: "தற்போதைய சரக்கு" },
  "Min Level": { en: "Min Level", ta: "குறைந்த அளவு" },
  "Unit Price": { en: "Unit Price", ta: "ஒரு அலகு விலை" },
  "All Categories": { en: "All Categories", ta: "அனைத்து வகைகள்" },
  "Raw Materials": { en: "Raw Materials", ta: "மூலப்பொருள்" },
  "Finished Items": { en: "Finished Items", ta: "முடிக்கப்பட்ட உணவுகள்" },
  "All Stock": { en: "All Stock", ta: "அனைத்து சரக்கு" },
  "Low Stock": { en: "Low Stock", ta: "குறைந்த சரக்கு" },
  "Out of Stock": { en: "Out of Stock", ta: "சரக்கு இல்லை" },
  "In Stock Available": { en: "In Stock", ta: "கையிருப்பில்" },
  "Search items...": { en: "Search items...", ta: "பொருள்களை தேடவும்..." },

  // Expenses Section
  "Expense Management": { en: "Expense Management", ta: "செலவு மேலாண்மை" },
  "Add Expense": { en: "Add Expense", ta: "செலவு சேர்" },
  "Rent": { en: "Rent", ta: "வாடகை" },
  "Gas/Fuel": { en: "Gas/Fuel", ta: "எரிவாயு/எரிபொருள்" },
  "Staff Salary": { en: "Staff Salary", ta: "ஊழியர் சம்பளம்" },
  "Recent Expenses": { en: "Recent Expenses", ta: "சமீபத்திய செலவுகள்" },
  "Payment Method": { en: "Payment Method", ta: "பணம் செலுத்தும் முறை" },

  // QR Menu Section
  "QR Menu System": { en: "QR Menu System", ta: "QR மெனு அமைப்பு" },
  "Print QR Codes": { en: "Print QR Codes", ta: "QR குறியீடுகள் அச்சிடு" },
  "Download Menu": { en: "Download Menu", ta: "மெனு பதிவிறக்கம்" },
  "QR Code": { en: "QR Code", ta: "QR குறியீடு" },
  "Scan to view menu and place orders": { en: "Scan to view menu and place orders", ta: "மெனு பார்க்க மற்றும் ஆர்டர் செய்ய ஸ்கேன் செய்யவும்" },
  "Print for Table 1": { en: "Print for Table 1", ta: "மேசை 1க்கு அச்சிடு" },
  "Edit Table": { en: "Edit Table", ta: "மேசை திருத்து" },
  "Customer Menu Preview": { en: "Customer Menu Preview", ta: "வாடிக்கையாளர் மெனு முன்னோட்டம்" },
  "Digital Menu": { en: "Digital Menu", ta: "டிஜிட்டல் மெனு" },
  "View Cart (0)": { en: "View Cart (0)", ta: "கார்ட் பார் (0)" },

  // Staff Section
  "Staff Management": { en: "Staff Management", ta: "ஊழியர் மேலாண்மை" },
  "Add Staff": { en: "Add Staff", ta: "ஊழியர் சேர்" },
  "Total Staff": { en: "Total Staff", ta: "மொத்த ஊழியர்கள்" },
  "Present Today": { en: "Present Today", ta: "இன்று வந்தவர்கள்" },
  "Absent Today": { en: "Absent Today", ta: "இன்று வராதவர்கள்" },
  "On Duty": { en: "On Duty", ta: "பணியில்" },
  "Staff Details": { en: "Staff Details", ta: "ஊழியர் விவரங்கள்" },
  "Role": { en: "Role", ta: "பதவி" },
  "Shift": { en: "Shift", ta: "ஷிப்ட்" },
  "Salary": { en: "Salary", ta: "சம்பளம்" },
  "Present": { en: "Present", ta: "வந்துள்ளார்" },
  "Absent": { en: "Absent", ta: "வரவில்லை" },

  // Reports Section
  "Sales Reports & Analytics": { en: "Sales Reports & Analytics", ta: "விற்பனை அறிக்கைகள் மற்றும் பகுப்பாய்வு" },
  "Export Report": { en: "Export Report", ta: "அறிக்கை ஏற்றுமதி" },
  "Custom Range": { en: "Custom Range", ta: "தனிப்பயன் வரம்பு" },
  "Today's Sales": { en: "Today's Sales", ta: "இன்றைய விற்பனை" },
  "Orders Today": { en: "Orders Today", ta: "இன்றைய ஆர்டர்கள்" },
  "Avg Order Value": { en: "Avg Order Value", ta: "சராசரி ஆர்டர் மதிப்பு" },
  "Profit Margin": { en: "Profit Margin", ta: "லாப விகிதம்" },
  "Top Selling Items": { en: "Top Selling Items", ta: "அதிக விற்பனையான உணவுகள்" },
  "Recent Transactions": { en: "Recent Transactions", ta: "சமீபத்திய பரிவர்த்தனைகள்" },
  "orders": { en: "orders", ta: "ஆர்டர்கள்" },
  "No data available": { en: "No data available", ta: "தரவு கிடைக்கவில்லை" },

  // AI Assistant Section
  "Chat with AI Assistant": { en: "Chat with AI Assistant", ta: "AI உதவியாளருடன் அரட்டை" },
  "Online": { en: "Online", ta: "ஆன்லைன்" },
  "Quick Actions": { en: "Quick Actions", ta: "விரைவு செயல்கள்" },
  "Check Low Stock": { en: "Check Low Stock", ta: "குறைந்த சரக்கு பார்" },
  "3 items need attention": { en: "3 items need attention", ta: "3 பொருள்கள் கவனம் தேவை" },
  "Sales Analysis": { en: "Sales Analysis", ta: "விற்பனை பகுப்பாய்வு" },
  "Get insights on today's performance": { en: "Get insights on today's performance", ta: "இன்றைய செயல்திறன் குறித்த நுண்ணறிவு" },
  "Staff Summary": { en: "Staff Summary", ta: "ஊழியர் சுருக்கம்" },
  "Check attendance and schedules": { en: "Check attendance and schedules", ta: "வருகை மற்றும் அட்டவணைகளை சரிபார்க்கவும்" },
  "Recent Alerts": { en: "Recent Alerts", ta: "சமீபத்திய எச்சரிக்கைகள்" },
  "Type your message...": { en: "Type your message...", ta: "உங்கள் செய்தியை தட்டச்சு செய்யவும்..." },

  // Messages and Notifications
  "Order created successfully": { en: "Order created successfully", ta: "ஆர்டர் வெற்றிகரமாக உருவாக்கப்பட்டது" },
  "Failed to create order": { en: "Failed to create order", ta: "ஆர்டர் உருவாக்க முடியவில்லை" },
  "No items in order": { en: "No items in order", ta: "ஆர்டரில் பொருள்கள் இல்லை" },

  // AI Assistant Welcome Message
  "ai_welcome": {
    en: "Hello! I'm your restaurant AI assistant. I can help you with inventory alerts, sales analysis, staff management, and answer any questions about your restaurant operations. What would you like to know?",
    ta: "வணக்கம்! நான் உங்கள் உணவக AI உதவியாளர். சரக்கு எச்சரிக்கைகள், விற்பனை பகுப்பாய்வு, ஊழியர் மேலாண்மை மற்றும் உங்கள் உணவக செயல்பாடுகள் பற்றிய கேள்விகளுக்கு நான் உதவ முடியும். நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?"
  }
};

export function getTranslation(key: string, language: 'en' | 'ta'): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[language] || translation.en || key;
}
