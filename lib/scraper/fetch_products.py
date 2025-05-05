import requests
import json
import os

# URL to fetch products
# url = "https://pointofviewlabel.com/collections/all-workwear/products.json"
url = "https://pointofviewlabel.com/collections/all-workwear/products.json"

# Make a request
response = requests.get(url)

# Check if request was successful
if response.status_code == 200:
    data = response.json()
    products = data.get('products', [])

    # Create folders if not exist
    os.makedirs('data', exist_ok=True)
    os.makedirs('images', exist_ok=True)

    # Save products JSON
    with open('data/all-workwear.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=4)

    print(f"✅ Saved {len(products)} products to 'data/all-workwear.json'")

    # Download images
    # for product in products:
    #     title = product.get('title', 'no-title').replace('/', '-').replace('\\', '-')
    #     images = product.get('images', [])

    #     for idx, image in enumerate(images):
    #         image_url = image.get('src')
    #         if image_url:
    #             try:
    #                 img_response = requests.get(image_url)
    #                 if img_response.status_code == 200:
    #                     file_extension = image_url.split('.')[-1].split('?')[0]  # Get jpg, png, etc.
    #                     image_filename = f"images/{title}-{idx+1}.{file_extension}"

    #                     with open(image_filename, 'wb') as img_file:
    #                         img_file.write(img_response.content)
                        
    #                     print(f"🖼️  Downloaded {image_filename}")
    #             except Exception as e:
    #                 print(f"⚠️ Failed to download image {image_url}: {e}")
else:
    print(f"❌ Failed to fetch products. Status Code: {response.status_code}")
