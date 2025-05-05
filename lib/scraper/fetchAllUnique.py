import requests
import json
import os
from collections import OrderedDict

# List of URLs for different collections
urls = [
    "https://pointofviewlabel.com/collections/all-workwear/products.json",
    "https://pointofviewlabel.com/collections/work-dresses-for-women/products.json",
    "https://pointofviewlabel.com/collections/womens-workwear-blouses/products.json",
    "https://pointofviewlabel.com/collections/dress-pants-for-women/products.json",
    "https://pointofviewlabel.com/collections/womens-power-suit/products.json",
    "https://pointofviewlabel.com/collections/daily-dopamine/products.json",
    "https://pointofviewlabel.com/collections/work-to-wine/products.json",
    "https://pointofviewlabel.com/collections/power-presence/products.json",

]

# Create folders if they don't exist
os.makedirs('data', exist_ok=True)

# Function to download products from a single URL
def download_products(url, output_file):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        products = data.get('products', [])
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(products, f, ensure_ascii=False, indent=4)
        print(f"✅ Saved {len(products)} products to '{output_file}'")
        return products
    else:
        print(f"❌ Failed to fetch {url}: Status {response.status_code}")
        return []

# Download products from all URLs
all_products = []
for i, url in enumerate(urls):
    output_file = f'data/collection_{i+1}.json'
    products = download_products(url, output_file)
    all_products.extend(products)

# Ensure unique products (using 'id' or 'handle' as the unique identifier)
unique_products = []
seen_ids = set()
for product in all_products:
    product_id = product.get('id')  # or use 'handle' if 'id' is not reliable
    if product_id not in seen_ids:
        seen_ids.add(product_id)
        unique_products.append(product)

# Save combined unique products to a single file
combined_file = 'data/all_products.json'
with open(combined_file, 'w', encoding='utf-8') as f:
    json.dump(unique_products, f, ensure_ascii=False, indent=4)

print(f"✅ Combined {len(unique_products)} unique products into '{combined_file}'")