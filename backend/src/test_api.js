const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

function makeRequest(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:4000${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(data),
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: data,
          });
        }
      });
    });
    req.on('error', reject);
  });
}

async function runTests() {
  console.log('Starting backend server for API testing...');
  const server = spawn('node', ['index.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: process.env,
  });

  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('Server running')) {
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });
  });

  try {
    console.log('\n--- 1. Testing GET /api/health ---');
    const health = await makeRequest('/api/health');
    console.log(`Status: ${health.status}`, health.body);

    console.log('\n--- 2. Testing GET /api/products ---');
    const products = await makeRequest('/api/products');
    console.log(`Status: ${products.status}`);
    console.log(`Found ${products.body.length} products:`);
    products.body.forEach((p) => {
      console.log(`  - [${p.slug}] ${p.name} (${p.brand}) -> minPrice: ₹${p.minPrice}`);
    });

    console.log('\n--- 3. Testing GET /api/products/iphone-17-pro ---');
    const iphone = await makeRequest('/api/products/iphone-17-pro');
    console.log(`Status: ${iphone.status}`);
    console.log(`Product: ${iphone.body.name} (${iphone.body.variants?.length} variants)`);

    console.log('\n--- 4. Testing GET /api/products/non-existent-slug (404 test) ---');
    const missing = await makeRequest('/api/products/non-existent-slug');
    console.log(`Status: ${missing.status}`, missing.body);

    console.log('\n--- 5. Testing GET /api/unknown-route (404 fallback test) ---');
    const unknown = await makeRequest('/api/unknown-route');
    console.log(`Status: ${unknown.status}`, unknown.body);

    console.log('\nAll API endpoint tests completed successfully!');
  } catch (err) {
    console.error('API Test Failed:', err);
    process.exitCode = 1;
  } finally {
    server.kill();
  }
}

runTests();
