const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Auth Routes (Placeholder)
app.post('/api/v1/auth/register', async (req, res) => {
    try {
        const { email, username, password, full_name, store_name, location, id_number, id_type } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).send("User with that email already exists");
        }

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password, // In a real app, hash this!
                fullName: full_name,
                storeName: store_name,
                location,
                idNumber: id_number,
                idType: id_type
            }
        });

        res.send(`User has been registered: ${user.fullName}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/v1/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).send("Password is incorrect");
        }

        res.send("Logged in successfully");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Products Routes
app.get('/api/v1/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { supplier: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/v1/products/sponsored', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { isSponsored: true },
            include: { supplier: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/v1/products/supplier/:supplierId', async (req, res) => {
    try {
        const { supplierId } = req.params;
        const products = await prisma.product.findMany({
            where: { supplierId },
            include: { supplier: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/v1/products/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await prisma.product.findMany({
            where: { category },
            include: { supplier: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Suppliers Routes
app.get('/api/v1/suppliers', async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inventory (Placeholder)
app.get('/api/v1/inventory/groceries', async (req, res) => {
    // Return dummy data for now to match frontend expectation
    res.json([
        { "id": 10, "product_name": "Milk", "brand": "DairyFresh", "price": 15.0 },
        { "id": 5, "product_name": "Bread", "brand": "BakeryPlus", "price": 12.0 }
    ]);
});

// Export for Vercel serverless, listen locally in dev
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
