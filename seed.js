const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.product.deleteMany({});
    await prisma.supplier.deleteMany({});

    // 1. Create Suppliers
    const suppliers = {
        albany: await prisma.supplier.create({
            data: {
                id: 'supplier-albany',
                name: 'Albany',
                logoUrl: 'assets/suppliers/albany.png',
                status: 'Pending',
                type: 'MerchantEyes Managed',
                accountId: 'ALB-2024-001',
                description: 'Leading bakery product manufacturer in South Africa.'
            }
        }),
        tiger: await prisma.supplier.create({
            data: {
                id: 'supplier-tiger',
                name: 'Tiger Brands',
                logoUrl: 'assets/suppliers/tiger_brands.png',
                status: 'Active',
                type: 'External Account',
                accountId: 'TGB-2024-002',
                externalUrl: 'https://tigerbrands.com/register',
                description: 'A top African manufacturer of fast-moving consumer goods.'
            }
        }),
        unilever: await prisma.supplier.create({
            data: {
                id: 'supplier-unilever',
                name: 'Unilever',
                logoUrl: 'assets/suppliers/unilever.png',
                status: 'Active',
                type: 'MerchantEyes Managed',
                accountId: 'UNL-2024-003',
                description: 'Global supplier of food, home and personal care products.'
            }
        }),
        apparel: await prisma.supplier.create({
            data: {
                id: 'supplier-apparel',
                name: 'Apparel Co',
                logoUrl: 'assets/suppliers/apparel_logo.png',
                status: 'Active',
                type: 'External Account',
                accountId: 'APS-2024-005',
                externalUrl: 'https://apparelsolutions.co.za/register',
                description: 'Quality blank apparel and fashion garments.'
            }
        }),
        dagama: await prisma.supplier.create({
            data: {
                id: 'supplier-dagama',
                name: 'Da Gama Textiles',
                logoUrl: 'assets/suppliers/dagama_logo.png',
                status: 'Not Active',
                type: 'MerchantEyes Managed',
                accountId: 'DGT-2024-004',
                description: 'Premium textile and fabric manufacturer.'
            }
        }),
        printpro: await prisma.supplier.create({
            data: {
                id: 'supplier-printpro',
                name: 'Print Pro',
                logoUrl: 'assets/suppliers/printpro_logo.png',
                status: 'Not Active',
                type: 'MerchantEyes Managed',
                accountId: 'PPS-2024-006',
                description: 'Comprehensive printing material supplier.'
            }
        })
    };

    // 2. Create Products
    const productData = [
        // Albany Products
        { name: 'Albany Bread', price: 18.5, category: 'Bakery', description: 'Freshly baked Albany superior white bread.', supplierId: suppliers.albany.id, isSponsored: true, discount: 0.10, imageUrl: 'assets/products/albany_bread.png' },
        { name: 'Sasko Bread', price: 17.5, category: 'Bakery', description: 'Freshly baked Sasko flour bread.', supplierId: suppliers.albany.id, imageUrl: 'assets/products/sasko_bread.png' },
        { name: 'Blue Ribbon Bread', price: 17.0, category: 'Bakery', description: 'Blue Ribbon classic white bread.', supplierId: suppliers.albany.id, imageUrl: 'assets/products/blue_ribbon_bread.png' },

        // Tiger Brands Products
        { name: 'All Gold Sauce', price: 35.0, category: 'Groceries', description: 'Crammed full of tomatoes - All Gold tomato sauce.', supplierId: suppliers.tiger.id, isSponsored: true, discount: 0.15, imageUrl: 'assets/products/all_gold_sauce.png' },
        { name: 'Koo Baked Beans', price: 15.0, category: 'Groceries', description: 'Koo baked beans in tomato sauce.', supplierId: suppliers.tiger.id, imageUrl: 'assets/products/koo_baked_beans.png' },
        { name: 'Tastic Rice', price: 45.0, category: 'Groceries', description: 'Tastic parboiled long grain rice.', supplierId: suppliers.tiger.id, discount: 0.05, imageUrl: 'assets/products/tastic_rice.png' },

        // Unilever Products
        { name: 'Dove Soap', price: 22.0, category: 'Personal Care', description: 'Dove beauty cream bar for soft skin.', supplierId: suppliers.unilever.id, isSponsored: true, imageUrl: 'assets/products/dove_soap.png' },
        { name: 'Joko Tea', price: 28.0, category: 'Groceries', description: 'The tea you can trust - Joko tea bags.', supplierId: suppliers.unilever.id, discount: 0.20, imageUrl: 'assets/products/joko_tea.png' },
        { name: 'Lipton Ice Tea', price: 20.0, category: 'Beverages', description: 'Refreshing Lipton peach ice tea.', supplierId: suppliers.unilever.id, imageUrl: 'assets/products/lipton_ice_tea.png' },
        { name: 'Omo Powder', price: 55.0, category: 'Personal Care', description: 'Omo auto washing powder.', supplierId: suppliers.unilever.id, imageUrl: 'assets/products/omo_powder.png' },
        { name: 'Sunlight Powder', price: 48.0, category: 'Personal Care', description: 'Sunlight 2-in-1 tropical wash powder.', supplierId: suppliers.unilever.id, imageUrl: 'assets/products/sunlight_powder.png' },

        // Apparel Co Products
        { name: 'Blank Hoodies', price: 250.0, category: 'Blank Apparel', description: 'High quality cotton blank hoodies.', supplierId: suppliers.apparel.id, isSponsored: true, discount: 0.25, imageUrl: 'assets/products/blank_hoodies.png' },
        { name: 'Blank T-shirts', price: 85.0, category: 'Blank Apparel', description: 'Premium cotton blank t-shirts.', supplierId: suppliers.apparel.id, imageUrl: 'assets/products/blank_tshirts.png' },
        { name: 'Kids T-shirts', price: 65.0, category: 'Blank Apparel', description: 'Soft cotton t-shirts for kids.', supplierId: suppliers.apparel.id, imageUrl: 'assets/products/kids_tshirts.png' },
        { name: 'Polo Shirts', price: 150.0, category: 'Blank Apparel', description: 'Classic fit cotton polo shirts.', supplierId: suppliers.apparel.id, imageUrl: 'assets/products/polo_shirts.png' },
        { name: 'Premium T-shirts', price: 120.0, category: 'Blank Apparel', description: 'Ultra-soft heavy cotton t-shirts.', supplierId: suppliers.apparel.id, imageUrl: 'assets/products/premium_tshirts.png' },

        // Da Gama Textiles Products
        { name: 'Cotton Fabric', price: 45.0, category: 'Fashion Fabrics', description: '100% natural cotton fabric material.', supplierId: suppliers.dagama.id, isSponsored: true, imageUrl: 'assets/products/cotton_fabric.png' },
        { name: 'Cotton Jersey', price: 55.0, category: 'Fashion Fabrics', description: 'Interlock cotton jersey fabric.', supplierId: suppliers.dagama.id, imageUrl: 'assets/products/cotton_jersey.png' },
        { name: 'Denim Fabric', price: 75.0, category: 'Fashion Fabrics', description: 'Durable blue denim textile.', supplierId: suppliers.dagama.id, imageUrl: 'assets/products/denim_fabric.png' },
        { name: 'Polyester Blend', price: 40.0, category: 'Fashion Fabrics', description: 'Smooth polyester cotton blend.', supplierId: suppliers.dagama.id, imageUrl: 'assets/products/polyester_blend.png' },
        { name: 'Stretch Fabric', price: 60.0, category: 'Fashion Fabrics', description: 'Elastic stretch fabric for apparel.', supplierId: suppliers.dagama.id, imageUrl: 'assets/products/stretch_fabric.png' },

        // Print Pro Products
        { name: 'Printing Kit', price: 1500.0, category: 'Printing Materials', description: 'Complete screen printing starter kit.', supplierId: suppliers.printpro.id, isSponsored: true, imageUrl: 'assets/products/printing_kit.png' },
        { name: 'Sublimation Paper', price: 120.0, category: 'Printing Materials', description: 'High transfer rate sublimation paper.', supplierId: suppliers.printpro.id, imageUrl: 'assets/products/sublimation_paper.png' },
        { name: 'Transfer Paper', price: 95.0, category: 'Printing Materials', description: 'Heat transfer paper for t-shirts.', supplierId: suppliers.printpro.id, imageUrl: 'assets/products/transfer_paper.png' },
        { name: 'Vinyl Sheets', price: 110.0, category: 'Printing Materials', description: 'Adhesive vinyl sheets for designs.', supplierId: suppliers.printpro.id, imageUrl: 'assets/products/vinyl_sheets.png' }
    ];

    await prisma.product.createMany({
        data: productData
    });

    console.log('Seeding completed! Created 6 suppliers and 25 products with extended info.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
