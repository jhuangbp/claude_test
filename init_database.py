#!/usr/bin/env python3
"""
初始化範例 SQLite 數據庫
"""
import sqlite3
from datetime import datetime

def init_database():
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()

    # 創建產品表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # 創建訂單表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        customer_name TEXT NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
    )
    ''')

    # 插入範例產品數據
    products = [
        ('筆記型電腦', '電子產品', 25000, 15),
        ('無線滑鼠', '電子產品', 599, 50),
        ('機械鍵盤', '電子產品', 2500, 30),
        ('辦公椅', '家具', 8900, 10),
        ('書桌', '家具', 12000, 8),
        ('USB-C 充電器', '配件', 890, 100),
        ('螢幕架', '配件', 1200, 25),
        ('藍牙耳機', '電子產品', 3500, 40),
    ]

    cursor.executemany(
        'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
        products
    )

    # 插入範例訂單數據
    orders = [
        (1, 2, '張三'),
        (2, 5, '李四'),
        (3, 1, '王五'),
        (1, 1, '趙六'),
        (5, 1, '錢七'),
        (8, 3, '孫八'),
        (6, 10, '周九'),
    ]

    cursor.executemany(
        'INSERT INTO orders (product_id, quantity, customer_name) VALUES (?, ?, ?)',
        orders
    )

    conn.commit()
    conn.close()
    print("✓ 數據庫初始化完成！")
    print("✓ 創建了 example.db，包含產品和訂單數據")

if __name__ == '__main__':
    init_database()
