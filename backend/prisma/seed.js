const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up existing database records...');
  // Delete in reverse order of relationships to satisfy FK constraints
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('Seeding initial products, variants, and EMI plans for PostgreSQL...');

  // 1. iPhone 17 Pro
  const iphone = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      description: 'Titanium design, A19 Pro chip, revolutionary camera system with 5x Telephoto, and all-day battery life.',
      variants: {
        create: [
          {
            label: '256GB · Natural Titanium',
            mrp: 134900,
            price: 125900,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 41967,
                  interestRate: 0.0,
                  cashback: 7500,
                  totalPayable: 125900,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 20983,
                  interestRate: 0.0,
                  cashback: 3000,
                  totalPayable: 125900,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 11100,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 133200,
                  processingFee: 499,
                },
              ],
            },
          },
          {
            label: '512GB · Deep Blue',
            mrp: 154900,
            price: 145900,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 48633,
                  interestRate: 0.0,
                  cashback: 9000,
                  totalPayable: 145900,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 24316,
                  interestRate: 0.0,
                  cashback: 4000,
                  totalPayable: 145900,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 12863,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 154356,
                  processingFee: 499,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      description: 'Galaxy AI is here. Epic titanium shield, 200MP camera with ProVisual Engine, and built-in S Pen.',
      variants: {
        create: [
          {
            label: '256GB · Titanium Gray',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 43333,
                  interestRate: 0.0,
                  cashback: 8000,
                  totalPayable: 129999,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 21666,
                  interestRate: 0.0,
                  cashback: 3500,
                  totalPayable: 129999,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 11458,
                  interestRate: 10.5,
                  cashback: 1000,
                  totalPayable: 137496,
                  processingFee: 499,
                },
              ],
            },
          },
          {
            label: '512GB · Titanium Black',
            mrp: 149999,
            price: 139999,
            imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 46666,
                  interestRate: 0.0,
                  cashback: 10000,
                  totalPayable: 139999,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 23333,
                  interestRate: 0.0,
                  cashback: 4500,
                  totalPayable: 139999,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 12338,
                  interestRate: 10.5,
                  cashback: 1500,
                  totalPayable: 148056,
                  processingFee: 499,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 3. MacBook Air M3
  const macbook = await prisma.product.create({
    data: {
      slug: 'macbook-air-m3',
      name: 'MacBook Air M3',
      brand: 'Apple',
      description: 'Lean. Mean. M3 machine. Strikingly thin design, up to 18 hours of battery life, and Liquid Retina display.',
      variants: {
        create: [
          {
            label: '8GB RAM · 256GB SSD · Midnight',
            mrp: 114900,
            price: 104900,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 34967,
                  interestRate: 0.0,
                  cashback: 6000,
                  totalPayable: 104900,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 17483,
                  interestRate: 0.0,
                  cashback: 2500,
                  totalPayable: 104900,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 9245,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 110940,
                  processingFee: 499,
                },
              ],
            },
          },
          {
            label: '16GB RAM · 512GB SSD · Space Gray',
            mrp: 134900,
            price: 124900,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 41633,
                  interestRate: 0.0,
                  cashback: 7500,
                  totalPayable: 124900,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 20816,
                  interestRate: 0.0,
                  cashback: 3500,
                  totalPayable: 124900,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 11008,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 132096,
                  processingFee: 499,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Database seeded successfully on PostgreSQL!`);
  console.log(`Created products: ${iphone.name}, ${samsung.name}, ${macbook.name}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
