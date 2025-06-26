
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@dooonda.com' },
    update: {},
    create: {
      email: 'demo@dooonda.com',
      name: 'John Kariuki',
      phone: '+254712345678',
      password: hashedPassword,
      role: 'USER',
    },
  })

  console.log('👤 Created demo user:', user.email)

  // Create wallet for user
  await prisma.wallet.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      balance: 46250.75,
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        image: 'https://i.pinimg.com/736x/ac/54/1e/ac541e0b540d469a64ec5e9c13c43f48.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fashion' },
      update: {},
      create: {
        name: 'Fashion',
        slug: 'fashion',
        image: 'https://i.pinimg.com/736x/fc/a6/54/fca6549c9f74373ae03d9df78c8317a2.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-kitchen' },
      update: {},
      create: {
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        image: 'https://i.pinimg.com/originals/ca/07/2e/ca072e417cc78434cbc564d1dfca3ff1.jpg',
      },
    }),
  ])

  console.log('📂 Created categories:', categories.length)

  // Create demo stores
  const stores = await Promise.all([
    prisma.store.upsert({
      where: { slug: 'tech-hub-nairobi' },
      update: {},
      create: {
        name: 'Tech Hub Nairobi',
        slug: 'tech-hub-nairobi',
        description: 'Kenya\'s premier electronics and gadgets store',
        logo: 'https://i.pinimg.com/originals/bc/56/f3/bc56f3856f7cc17e6c151f358d35acd0.jpg',
        banner: 'https://c8.alamy.com/comp/G0TDEW/electronics-store-banner-with-mobile-phones-laptops-tv-and-audio-equipment-G0TDEW.jpg',
        status: 'ACTIVE',
        userId: user.id,
      },
    }),
    prisma.store.upsert({
      where: { slug: 'fashion-point-ke' },
      update: {},
      create: {
        name: 'Fashion Point KE',
        slug: 'fashion-point-ke',
        description: 'Stylish fashion for modern Kenyans',
        logo: 'https://i.pinimg.com/originals/75/78/fd/7578fd6ff79851e3e361b7b6dc451c95.jpg',
        banner: 'https://i.pinimg.com/originals/82/6c/8e/826c8e1c4fb0f12d163075a23f90c3a4.jpg',
        status: 'ACTIVE',
        userId: user.id,
      },
    }),
  ])

  console.log('🏪 Created stores:', stores.length)

  // Create products for each store
  const products = []
  
  // Tech Hub Nairobi products
  const techProducts = await Promise.all([
    prisma.product.upsert({
      where: { slug_storeId: { slug: 'iphone-15-pro', storeId: stores[0].id } },
      update: {
        price: 145000.00,
        comparePrice: 155000.00,
      },
      create: {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'The latest iPhone with advanced camera system and A17 Pro chip',
        price: 145000.00,
        comparePrice: 155000.00,
        images: [
          'https://i.ytimg.com/vi/sgFRNA6iqKs/maxresdefault.jpg',
          'https://i.imgur.com/nbs5Glk.jpg',
        ],
        status: 'ACTIVE',
        inventory: 25,
        categoryId: categories[0].id,
        storeId: stores[0].id,
      },
    }),
    prisma.product.upsert({
      where: { slug_storeId: { slug: 'macbook-air-m3', storeId: stores[0].id } },
      update: {
        price: 185000.00,
        comparePrice: 195000.00,
      },
      create: {
        name: 'MacBook Air M3',
        slug: 'macbook-air-m3',
        description: 'Ultra-thin laptop with M3 chip for incredible performance',
        price: 185000.00,
        comparePrice: 195000.00,
        images: [
          'https://i.ytimg.com/vi/h7KhAypxH9g/maxresdefault.jpg',
          'https://i.ytimg.com/vi/SPi3VDN_Xww/maxresdefault.jpg',
        ],
        status: 'ACTIVE',
        inventory: 15,
        categoryId: categories[0].id,
        storeId: stores[0].id,
      },
    }),
    prisma.product.upsert({
      where: { slug_storeId: { slug: 'samsung-galaxy-watch-6', storeId: stores[0].id } },
      update: {
        price: 45000.00,
        comparePrice: 48000.00,
      },
      create: {
        name: 'Samsung Galaxy Watch 6',
        slug: 'samsung-galaxy-watch-6',
        description: 'Advanced smartwatch with health monitoring and GPS',
        price: 45000.00,
        comparePrice: 48000.00,
        images: [
          'https://cdn.mos.cms.futurecdn.net/QQeJc3gesQDsei4HaRExbY.jpg',
          'https://i.ytimg.com/vi/wFf8Cv7DAKg/maxresdefault.jpg',
        ],
        status: 'ACTIVE',
        inventory: 40,
        categoryId: categories[0].id,
        storeId: stores[0].id,
      },
    }),
  ])

  // Fashion Point KE products
  const fashionProducts = await Promise.all([
    prisma.product.upsert({
      where: { slug_storeId: { slug: 'denim-jacket-classic-blue', storeId: stores[1].id } },
      update: {
        price: 3500.00,
        comparePrice: 4500.00,
      },
      create: {
        name: 'Denim Jacket - Classic Blue',
        slug: 'denim-jacket-classic-blue',
        description: 'Timeless denim jacket perfect for casual and semi-formal occasions',
        price: 3500.00,
        comparePrice: 4500.00,
        images: [
          'https://www.rw-co.com/on/demandware.static/-/Sites-Rwco-master-catalog/default/dw20bab939/images/xlarge/rwco_447544_480_0.jpg',
          'https://i.pinimg.com/originals/8d/a3/3a/8da33a2493afb43cc3322bfd472a7cca.jpg',
        ],
        status: 'ACTIVE',
        inventory: 50,
        categoryId: categories[1].id,
        storeId: stores[1].id,
      },
    }),
    prisma.product.upsert({
      where: { slug_storeId: { slug: 'sneakers-white-leather', storeId: stores[1].id } },
      update: {
        price: 5500.00,
        comparePrice: 7000.00,
      },
      create: {
        name: 'Sneakers - White Leather',
        slug: 'sneakers-white-leather',
        description: 'Premium white leather sneakers for everyday comfort',
        price: 5500.00,
        comparePrice: 7000.00,
        images: [
          'https://i.pinimg.com/originals/76/53/65/765365f54a8b767d174c8755cc2882b1.jpg',
          'https://i.pinimg.com/originals/e9/c4/05/e9c405d8b05085eec1d7dd63de264967.jpg',
        ],
        status: 'ACTIVE',
        inventory: 75,
        categoryId: categories[1].id,
        storeId: stores[1].id,
      },
    }),
  ])

  products.push(...techProducts, ...fashionProducts)
  console.log('📦 Created products:', products.length)

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Mary Wanjiku',
        email: 'mary.wanjiku@email.com',
        phone: '+254722334455',
        address: '123 Kimathi Street',
        city: 'Nairobi',
        state: 'Nairobi County',
        zipCode: '00100',
        storeId: stores[0].id,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Peter Kamau',
        email: 'peter.kamau@email.com',
        phone: '+254733445566',
        address: '456 Uhuru Highway',
        city: 'Mombasa',
        state: 'Mombasa County',
        zipCode: '80100',
        storeId: stores[0].id,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Grace Akinyi',
        email: 'grace.akinyi@email.com',
        phone: '+254744556677',
        address: '789 Kenyatta Avenue',
        city: 'Kisumu',
        state: 'Kisumu County',
        zipCode: '40100',
        storeId: stores[1].id,
      },
    }),
  ])

  console.log('👥 Created customers:', customers.length)

  // Create orders
  const orders = await Promise.all([
    prisma.order.upsert({
      where: { orderNumber: 'ORD-2024-001' },
      update: {},
      create: {
        orderNumber: 'ORD-2024-001',
        status: 'DELIVERED',
        total: 145000.00,
        subtotal: 145000.00,
        tax: 0,
        shipping: 0,
        paymentStatus: 'PAID',
        paymentMethod: 'M-Pesa',
        customerId: customers[0].id,
        storeId: stores[0].id,
        items: {
          create: {
            quantity: 1,
            price: 145000.00,
            productId: products[0].id,
          },
        },
      },
    }),
    prisma.order.upsert({
      where: { orderNumber: 'ORD-2024-002' },
      update: {},
      create: {
        orderNumber: 'ORD-2024-002',
        status: 'PROCESSING',
        total: 45000.00,
        subtotal: 45000.00,
        tax: 0,
        shipping: 0,
        paymentStatus: 'PAID',
        paymentMethod: 'Bank Transfer',
        customerId: customers[1].id,
        storeId: stores[0].id,
        items: {
          create: {
            quantity: 1,
            price: 45000.00,
            productId: products[2].id,
          },
        },
      },
    }),
    prisma.order.upsert({
      where: { orderNumber: 'ORD-2024-003' },
      update: {},
      create: {
        orderNumber: 'ORD-2024-003',
        status: 'PENDING',
        total: 9000.00,
        subtotal: 9000.00,
        tax: 0,
        shipping: 0,
        paymentStatus: 'PENDING',
        paymentMethod: 'M-Pesa',
        customerId: customers[2].id,
        storeId: stores[1].id,
        items: {
          create: [
            {
              quantity: 1,
              price: 3500.00,
              productId: products[3].id,
            },
            {
              quantity: 1,
              price: 5500.00,
              productId: products[4].id,
            },
          ],
        },
      },
    }),
  ])

  console.log('🛒 Created orders:', orders.length)

  // Create analytics data for the last 12 months
  const analyticsData = []
  const now = new Date()
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    
    for (const store of stores) {
      analyticsData.push({
        date,
        views: Math.floor(Math.random() * 1000) + 500,
        orders: Math.floor(Math.random() * 50) + 10,
        sales: Math.floor(Math.random() * 100000) + 50000,
        customers: Math.floor(Math.random() * 100) + 50,
        storeId: store.id,
      })
    }
  }

  for (const analytics of analyticsData) {
    await prisma.analytics.upsert({
      where: {
        date_storeId: {
          date: analytics.date,
          storeId: analytics.storeId,
        },
      },
      update: {
        views: analytics.views,
        orders: analytics.orders,
        sales: analytics.sales,
        customers: analytics.customers,
      },
      create: analytics,
    })
  }

  console.log('📊 Created analytics data:', analyticsData.length)

  // Create delivery info for stores
  await Promise.all(stores.map(store => 
    prisma.deliveryInfo.upsert({
      where: { storeId: store.id },
      update: {},
      create: {
        freeDelivery: true,
        deliveryFee: 0,
        minOrderAmount: 500,
        deliveryRadius: 25,
        estimatedTime: '2-3 business days',
        storeId: store.id,
      },
    })
  ))

  // Delete existing transactions for clean seed
  await prisma.transaction.deleteMany({
    where: { userId: user.id }
  })

  // Create sample transactions
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        type: 'CREDIT',
        amount: 7250.00,
        status: 'COMPLETED',
        description: 'Order commission - #ORD-2024-001',
        reference: 'TXN-001',
        userId: user.id,
      },
    }),
    prisma.transaction.create({
      data: {
        type: 'CREDIT',
        amount: 2250.00,
        status: 'COMPLETED',
        description: 'Order commission - #ORD-2024-002',
        reference: 'TXN-002',
        userId: user.id,
      },
    }),
    prisma.transaction.create({
      data: {
        type: 'WITHDRAWAL',
        amount: 10000.00,
        status: 'COMPLETED',
        description: 'Withdrawal to Equity Bank',
        reference: 'WTH-001',
        userId: user.id,
      },
    }),
  ])

  console.log('💳 Created transactions:', transactions.length)

  // Create sample coupons
  const coupons = await Promise.all([
    prisma.coupon.upsert({
      where: { code: 'WELCOME10' },
      update: {},
      create: {
        code: 'WELCOME10',
        type: 'PERCENTAGE',
        value: 10.00,
        minAmount: 1000.00,
        maxDiscount: 500.00,
        usageLimit: 100,
        usedCount: 5,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
        storeId: stores[0].id,
      },
    }),
    prisma.coupon.upsert({
      where: { code: 'FASHION50' },
      update: {},
      create: {
        code: 'FASHION50',
        type: 'FIXED',
        value: 50.00,
        minAmount: 500.00,
        usageLimit: 50,
        usedCount: 8,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        isActive: true,
        storeId: stores[1].id,
      },
    }),
  ])

  console.log('🎫 Created coupons:', coupons.length)

  // Create sample messages
  const messages = await Promise.all([
    prisma.message.create({
      data: {
        type: 'SMS',
        content: 'Welcome to Tech Paradise! Get 10% off on your first order with code WELCOME10',
        recipients: ['9876543211', '9876543212'],
        status: 'SENT',
        sentAt: new Date(),
        userId: user.id,
        storeId: stores[0].id,
      },
    }),
    prisma.message.create({
      data: {
        type: 'SMS',
        content: 'Flash Sale Alert! 50% off on all fashion items this weekend only!',
        recipients: ['9876543213'],
        status: 'DELIVERED',
        sentAt: new Date(),
        userId: user.id,
        storeId: stores[1].id,
      },
    }),
  ])

  console.log('📱 Created messages:', messages.length)

  // Create referral
  await prisma.referral.upsert({
    where: { code: 'REF-DEMO-001' },
    update: {},
    create: {
      code: 'REF-DEMO-001',
      referrerId: user.id,
      status: 'PENDING',
      commission: 100.00,
    },
  })

  console.log('🎯 Created referral program data')

  console.log('✅ Seed completed successfully!')
  console.log('')
  console.log('Demo login credentials:')
  console.log('Email: demo@dooonda.com')
  console.log('Password: password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
