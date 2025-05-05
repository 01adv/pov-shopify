import json
from collections import Counter

# Path to the transformedProducts.json file
json_file_path = "./transformedProducts2.json"

try:
    # Read the JSON file
    with open(json_file_path, "r", encoding="utf-8") as file:
        products = json.load(file)

    # Total products (all entries in the JSON)
    total_products = len(products)

    # Count unique products based on 'id'
    unique_product_ids = {product["id"] for product in products}
    unique_products_by_id = len(unique_product_ids)

    # Count unique products based on 'handle' (grouping by product, ignoring color variants)
    unique_product_handles = {product["handle"] for product in products}
    unique_products_by_handle = len(unique_product_handles)

    # Count variants per handle (number of colors per product)
    handle_counts = Counter(product["handle"] for product in products)

    # Print results
    print(f"Total products (including all variants): {total_products}")
    print(f"Unique products (based on 'id'): {unique_products_by_id}")
    print(f"Unique products (based on 'handle', treating same product with different colors as one): {unique_products_by_handle}")
    print("\nVariant counts per product (by handle):")
    for handle, count in handle_counts.items():
        print(f"{handle}: {count}")

except FileNotFoundError:
    print(f"Error: The file {json_file_path} was not found.")
except json.JSONDecodeError:
    print("Error: The JSON file is invalid or corrupted.")
except KeyError as e:
    print(f"Error: A required field is missing in some products: {e}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")