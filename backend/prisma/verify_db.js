const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  console.log('--- 1Fi Marketplace Database Verification ---');

  const productCount = await prisma.product.count();
  const variantCount = await prisma.variant.count();
  const emiPlanCount = await prisma.eMIPlan.count();

  console.log(`Product Count:  ${productCount}`);
  console.log(`Variant Count:  ${variantCount}`);
  console.log(`EMI Plan Count: ${emiPlanCount}`);

  console.log('\nFetching sample product with variants & EMI plans...');
  const sampleProduct = await prisma.product.findUnique({
    where: { slug: 'iphone-17-pro' },
    include: {
      variants: {
        include: {
          emiPlans: true,
        },
      },
    },
  });

  console.log('\nSample Product:');
  console.log(`- ID: ${sampleProduct.id}`);
  console.log(`- Name: ${sampleProduct.name}`);
  console.log(`- Brand: ${sampleProduct.brand}`);
  console.log(`- Variants (${sampleProduct.variants.length}):`);

  for (const v of sampleProduct.variants) {
    console.log(`  * Label: ${v.label} (Price: ₹${v.price}, MRP: ₹${v.mrp})`);
    console.log(`    EMI Plans (${v.emiPlans.length}):`);
    for (const plan of v.emiPlans) {
      console.log(
        `      - ${plan.tenureMonths} months @ ₹${plan.monthlyAmount}/mo (Interest: ${plan.interestRate}%, Cashback: ${
          plan.cashback ? '₹' + plan.cashback : 'None'
        })`
      );
    }
  }

  console.log('\nVerification Passed cleanly!');
}

verify()
  .catch((err) => {
    console.error('Verification failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
