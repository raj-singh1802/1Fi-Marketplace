const prisma = require('../lib/prisma');

async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { createdAt: 'asc' },
    });

    const summarized = products.map((product) => {
      const prices = product.variants.map((v) => v.price);
      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        minPrice: Math.min(...prices),
        thumbnailImage: product.variants[0]?.imageUrl ?? null,
      };
    });

    res.status(200).json(summarized);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

async function getProductBySlug(req, res) {
  const { slug } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: { tenureMonths: 'asc' },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: `Product with slug "${slug}" not found` });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by slug:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

module.exports = { getAllProducts, getProductBySlug };
