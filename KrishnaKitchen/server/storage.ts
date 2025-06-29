import {
  users,
  menuCategories,
  menuItems,
  inventoryItems,
  orders,
  orderItems,
  expenses,
  staff,
  staffAttendance,
  qrTables,
  type User,
  type UpsertUser,
  type MenuCategory,
  type InsertMenuCategory,
  type MenuItem,
  type InsertMenuItem,
  type InventoryItem,
  type InsertInventoryItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type Expense,
  type InsertExpense,
  type Staff,
  type InsertStaff,
  type StaffAttendance,
  type InsertStaffAttendance,
  type QrTable,
  type InsertQrTable,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Menu operations
  getMenuCategories(): Promise<MenuCategory[]>;
  createMenuCategory(category: InsertMenuCategory): Promise<MenuCategory>;
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItemStock(id: number, stock: number): Promise<void>;

  // Inventory operations
  getInventoryItems(): Promise<InventoryItem[]>;
  createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem>;
  updateInventoryStock(id: number, stock: number): Promise<void>;
  getLowStockItems(): Promise<InventoryItem[]>;

  // Order operations
  getOrders(limit?: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItems(items: InsertOrderItem[]): Promise<OrderItem[]>;
  getTodaysOrders(): Promise<Order[]>;
  getOrdersWithItems(orderId: number): Promise<(Order & { orderItems: (OrderItem & { menuItem: MenuItem })[] })[]>;

  // Expense operations
  getExpenses(limit?: number): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  getExpensesByCategory(category: string): Promise<Expense[]>;
  getTodaysExpenses(): Promise<Expense[]>;
  getMonthlyExpenses(year: number, month: number): Promise<Expense[]>;

  // Staff operations
  getStaff(): Promise<Staff[]>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, updates: Partial<InsertStaff>): Promise<Staff>;
  getTodaysAttendance(): Promise<(StaffAttendance & { staff: Staff })[]>;
  markAttendance(attendance: InsertStaffAttendance): Promise<StaffAttendance>;

  // QR Table operations
  getQrTables(): Promise<QrTable[]>;
  createQrTable(table: InsertQrTable): Promise<QrTable>;

  // Analytics
  getSalesAnalytics(startDate: Date, endDate: Date): Promise<{
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
    topSellingItems: { name: string; quantity: number; revenue: number }[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Menu operations
  async getMenuCategories(): Promise<MenuCategory[]> {
    return await db.select().from(menuCategories).where(eq(menuCategories.isActive, true));
  }

  async createMenuCategory(category: InsertMenuCategory): Promise<MenuCategory> {
    const [newCategory] = await db.insert(menuCategories).values(category).returning();
    return newCategory;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.isActive, true));
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return await db
      .select()
      .from(menuItems)
      .where(and(eq(menuItems.categoryId, categoryId), eq(menuItems.isActive, true)));
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async updateMenuItemStock(id: number, stock: number): Promise<void> {
    await db.update(menuItems).set({ currentStock: stock }).where(eq(menuItems.id, id));
  }

  // Inventory operations
  async getInventoryItems(): Promise<InventoryItem[]> {
    return await db.select().from(inventoryItems);
  }

  async createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem> {
    const [newItem] = await db.insert(inventoryItems).values(item).returning();
    return newItem;
  }

  async updateInventoryStock(id: number, stock: number): Promise<void> {
    await db.update(inventoryItems).set({ currentStock: stock.toString() }).where(eq(inventoryItems.id, id));
  }

  async getLowStockItems(): Promise<InventoryItem[]> {
    return await db
      .select()
      .from(inventoryItems)
      .where(sql`${inventoryItems.currentStock} <= ${inventoryItems.minLevel}`);
  }

  // Order operations
  async getOrders(limit = 50): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async createOrderItems(items: InsertOrderItem[]): Promise<OrderItem[]> {
    return await db.insert(orderItems).values(items).returning();
  }

  async getTodaysOrders(): Promise<Order[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await db
      .select()
      .from(orders)
      .where(and(gte(orders.createdAt, today), lte(orders.createdAt, tomorrow)));
  }

  async getOrdersWithItems(orderId: number): Promise<(Order & { orderItems: (OrderItem & { menuItem: MenuItem })[] })[]> {
    const result = await db
      .select()
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
      .where(eq(orders.id, orderId));

    // Group the results
    const orderMap = new Map();
    result.forEach((row) => {
      const order = row.orders;
      if (!orderMap.has(order.id)) {
        orderMap.set(order.id, { ...order, orderItems: [] });
      }
      if (row.order_items && row.menu_items) {
        orderMap.get(order.id).orderItems.push({
          ...row.order_items,
          menuItem: row.menu_items,
        });
      }
    });

    return Array.from(orderMap.values());
  }

  // Expense operations
  async getExpenses(limit = 50): Promise<Expense[]> {
    return await db.select().from(expenses).orderBy(desc(expenses.date)).limit(limit);
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const [newExpense] = await db.insert(expenses).values(expense).returning();
    return newExpense;
  }

  async getExpensesByCategory(category: string): Promise<Expense[]> {
    return await db.select().from(expenses).where(eq(expenses.category, category));
  }

  async getTodaysExpenses(): Promise<Expense[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await db
      .select()
      .from(expenses)
      .where(and(gte(expenses.date, today), lte(expenses.date, tomorrow)));
  }

  async getMonthlyExpenses(year: number, month: number): Promise<Expense[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return await db
      .select()
      .from(expenses)
      .where(and(gte(expenses.date, startDate), lte(expenses.date, endDate)));
  }

  // Staff operations
  async getStaff(): Promise<Staff[]> {
    return await db.select().from(staff).where(eq(staff.isActive, true));
  }

  async createStaff(staffData: InsertStaff): Promise<Staff> {
    const [newStaff] = await db.insert(staff).values(staffData).returning();
    return newStaff;
  }

  async updateStaff(id: number, updates: Partial<InsertStaff>): Promise<Staff> {
    const [updatedStaff] = await db.update(staff).set(updates).where(eq(staff.id, id)).returning();
    return updatedStaff;
  }

  async getTodaysAttendance(): Promise<(StaffAttendance & { staff: Staff })[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await db
      .select()
      .from(staffAttendance)
      .leftJoin(staff, eq(staffAttendance.staffId, staff.id))
      .where(and(gte(staffAttendance.date, today), lte(staffAttendance.date, tomorrow)));

    return result.map((row) => ({
      ...row.staff_attendance,
      staff: row.staff!,
    }));
  }

  async markAttendance(attendance: InsertStaffAttendance): Promise<StaffAttendance> {
    const [newAttendance] = await db.insert(staffAttendance).values(attendance).returning();
    return newAttendance;
  }

  // QR Table operations
  async getQrTables(): Promise<QrTable[]> {
    return await db.select().from(qrTables).where(eq(qrTables.isActive, true));
  }

  async createQrTable(table: InsertQrTable): Promise<QrTable> {
    const [newTable] = await db.insert(qrTables).values(table).returning();
    return newTable;
  }

  // Analytics
  async getSalesAnalytics(startDate: Date, endDate: Date): Promise<{
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
    topSellingItems: { name: string; quantity: number; revenue: number }[];
  }> {
    // Get total sales and orders
    const salesResult = await db
      .select({
        totalSales: sql<number>`SUM(${orders.totalAmount})`,
        totalOrders: sql<number>`COUNT(*)`,
      })
      .from(orders)
      .where(and(gte(orders.createdAt, startDate), lte(orders.createdAt, endDate)));

    const { totalSales = 0, totalOrders = 0 } = salesResult[0] || {};
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Get top selling items
    const topSellingResult = await db
      .select({
        name: menuItems.name,
        quantity: sql<number>`SUM(${orderItems.quantity})`,
        revenue: sql<number>`SUM(${orderItems.totalPrice})`,
      })
      .from(orderItems)
      .leftJoin(orders, eq(orderItems.orderId, orders.id))
      .leftJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
      .where(and(gte(orders.createdAt, startDate), lte(orders.createdAt, endDate)))
      .groupBy(menuItems.id, menuItems.name)
      .orderBy(desc(sql`SUM(${orderItems.quantity})`))
      .limit(10);

    return {
      totalSales,
      totalOrders,
      avgOrderValue,
      topSellingItems: topSellingResult.map(item => ({
        name: item.name || "Unknown Item",
        quantity: item.quantity,
        revenue: item.revenue,
      })),
    };
  }
}

export const storage = new DatabaseStorage();
