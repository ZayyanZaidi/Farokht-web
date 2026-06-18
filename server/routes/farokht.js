const express = require('express');
const router = express.Router();

const FAROKHT_API_BASE =
  process.env.FAROKHT_API_URL || 'https://svc-frkt-app-x8d4k2.farokht.store/api/v1/ml/datasets';
const FAROKHT_API_KEY =
  process.env.FAROKHT_API_KEY ||
  'a8f3c1d9b7e6f4c2a1d0b9c8e7f6a5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9';

async function fetchDataset(resource, query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });

  const url = `${FAROKHT_API_BASE}/${resource}${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url, {
    headers: { 'x-farokht-key': FAROKHT_API_KEY }
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || `Farokht API error (${response.status})`);
  }
  return body;
}

router.get('/posts', async (req, res) => {
  try {
    const { page = '1', limit = '24', brandId, postType } = req.query;
    const wanted = parseInt(limit, 10) || 24;
    const fetchLimit = postType ? Math.max(wanted * 4, 80) : wanted;
    const result = await fetchDataset('posts', { page, limit: String(fetchLimit), brandId });
    let items = Array.isArray(result.data) ? result.data : [];

    if (postType) {
      items = items.filter((p) => p.postType === postType).slice(0, wanted);
    }

    res.json({ status: 'success', data: items });
  } catch (err) {
    console.error('Farokht posts proxy:', err.message);
    res.status(502).json({ status: 'failed', msg: err.message, data: [] });
  }
});

router.get('/brands', async (req, res) => {
  try {
    const { page = '1', limit = '60' } = req.query;
    const result = await fetchDataset('posts', { page, limit });
    const items = Array.isArray(result.data) ? result.data : [];

    const brandMap = new Map();
    items.forEach((post) => {
      const user = post.user;
      if (!user?.id) return;
      if (!brandMap.has(user.id)) {
        const categoryName =
          user.categories?.[0]?.category?.name ||
          (typeof user.categories?.[0]?.category === 'string'
            ? user.categories[0].category
            : post.categories?.[0]?.name) ||
          'Brand';

        brandMap.set(user.id, {
          id: user.id,
          name: user.brandName || user.fullName,
          category: categoryName,
          image:
            user.bannerUrls?.[0] ||
            user.logoUrl ||
            post.image,
          logoUrl: user.logoUrl,
          link: `/brand/${user.id}`
        });
      }
    });

    res.json({ status: 'success', data: Array.from(brandMap.values()) });
  } catch (err) {
    console.error('Farokht brands proxy:', err.message);
    res.status(502).json({ status: 'failed', msg: err.message, data: [] });
  }
});

module.exports = router;
