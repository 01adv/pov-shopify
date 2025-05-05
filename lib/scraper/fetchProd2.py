import requests
import json
import os
from collections import Counter

# URL to fetch products
base_url = "https://pointofviewlabel.com/collections/all-workwear/products.json"
limit = 30  # Set limit to approximate observed page sizes

# Function to fetch all products with pagination
def fetch_all_products():
    products = []
    page = 1
    expected_total = 53  # Known total (29 + 21 + 3)

    while True:
        url = f"{base_url}?limit={limit}&page={page}"
        print(f"Fetching page {page} from {url}...")
        response = requests.get(url)

        if response.status_code != 200:
            print(f"❌ Failed to fetch page {page}: Status code {response.status_code}")
            break

        data = response.json()
        page_products = data.get('products', [])

        if not page_products:
            print("No more products to fetch.")
            break

        products.extend(page_products)
        print(f"✅ Fetched {len(page_products)} products on page {page} (Total so far: {len(products)})")

        page += 1

    if len(products) == expected_total:
        print(f"✅ Successfully fetched all {len(products)} expected products.")
    else:
        print(f"⚠️ Warning: Fetched {len(products)} products, but expected {expected_total}.")

    return products

# Create folders if not exist
os.makedirs('data', exist_ok=True)
os.makedirs('images', exist_ok=True)

# Fetch and analyze products
try:
    # Fetch products
    raw_products = fetch_all_products()

    # Save raw products JSON
    output_file = 'data/all_workwear_products2.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(raw_products, f, ensure_ascii=False, indent=4)
    print(f"✅ Saved {len(raw_products)} products to '{output_file}'")

    # Note: Handle-based counting requires transformed data (after flattening variants)
    print("⚠️ Note: Handle-based counting requires transformedProducts.json (run Node.js script first).")
    # If you want to count handles from raw products, you can use 'handle' field directly
    handle_counts = Counter(product['handle'] for product in raw_products)
    print("\nRaw product handle counts (before transformation):")
    for handle, count in sorted(handle_counts.items()):
        print(f"{handle}: {count}")

except Exception as e:
    print(f"❌ An error occurred: {e}")