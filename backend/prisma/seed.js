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
            label: '256GB · Cosmic Orange',
            mrp: 154999,
            price: 144999,
            imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.OODlQZbNOmYQUKaraxB70gHaHa?r=0&pid=ImgDet&w=208&h=208&c=7&dpr=2&o=7&rm=3',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 48333,
                  interestRate: 0.0,
                  cashback: 10000,
                  totalPayable: 144999,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 24167,
                  interestRate: 0.0,
                  cashback: 7500,
                  totalPayable: 144999,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 12867,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 154400,
                  processingFee: 499,
                },
              ],
            },
          },
          {
            label: '512GB · Deep Blue',
            mrp: 154900,
            price: 145900,
            imageUrl: 'https://i-system.gr/storage/i3commerce/images/i/p/iphone_17_pro_max_deep_blue_2_up_screen_usen_img_03.jpg',
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
                  monthlyAmount: 24317,
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

  // 2. Samsung Galaxy S26 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-s26-ultra',
      name: 'Samsung Galaxy S26 Ultra',
      brand: 'Samsung',
      description: 'Galaxy AI is here. Epic titanium shield, 200MP camera with ProVisual Engine, and built-in S Pen.',
      variants: {
        create: [
          {
            label: '256GB · Titanium Gray',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://mdsmobile.ae/cdn/shop/files/sm-s948_galaxys26ultra_front_cobaltviolet_251120.jpg?v=1772036514',
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
            mrp: 159999,
            price: 149999,
            imageUrl: 'https://images.hindustantimes.com/tech/htmobile4/samsung-galaxy-s26-ultra/heroimage/71RLLn9RZxL.-SL1500---1-.jpg',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 49999,
                  interestRate: 0.0,
                  cashback: 10000,
                  totalPayable: 149999,
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
      slug: 'macbook-air-m4',
      name: 'MacBook Air M4',
      brand: 'Apple',
      description: 'Lean. Mean. M4 machine. Strikingly thin design, up to 18 hours of battery life, and Liquid Retina display.',
      variants: {
        create: [
          {
            label: '8GB RAM · 256GB SSD · Midnight',
            mrp: 144900,
            price: 134900,
            imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.O3-g7_d03fJ44_PmyEi_1QAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 44967,
                  interestRate: 0.0,
                  cashback: 6000,
                  totalPayable: 134900,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 22483,
                  interestRate: 0.0,
                  cashback: 3500,
                  totalPayable: 134900,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 11959,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 143508,
                  processingFee: 499,
                },
              ],
            },
          },
          {
            label: '16GB RAM · 512GB SSD · Space Gray',
            mrp: 164900,
            price: 154900,
            imageUrl: 'https://b2c-contenthub.com/wp-content/uploads/2025/03/M4-MacBook-Air-Sky-Blue-horizontal.jpg?quality=50&strip=all',
            emiPlans: {
              create: [
                {
                  tenureMonths: 3,
                  monthlyAmount: 51633,
                  interestRate: 0.0,
                  cashback: 7500,
                  totalPayable: 154900,
                  processingFee: 0,
                },
                {
                  tenureMonths: 6,
                  monthlyAmount: 25817,
                  interestRate: 0.0,
                  cashback: 3500,
                  totalPayable: 154900,
                  processingFee: 199,
                },
                {
                  tenureMonths: 12,
                  monthlyAmount: 13742,
                  interestRate: 10.5,
                  cashback: null,
                  totalPayable: 164904,
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
