# API Documentation

## Base URL
All API requests should be prefixed with: `http://localhost:8000/api/`

## Authentication
Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Products API

### List Products
```http
GET /products/
```

Query Parameters:
- `category` (string): Filter by category slug
- `price_min` (number): Minimum price filter
- `price_max` (number): Maximum price filter
- `sort` (string): Sort by field (options: price_asc, price_desc, newest, popular)
- `search` (string): Search products by name or description

Response:
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": "1",
      "name": "Smart Door Lock X1",
      "slug": "smart-door-lock-x1",
      "description": "Advanced biometric door lock",
      "price": 299.99,
      "category": {
        "id": 1,
        "name": "Door Locks",
        "slug": "door-locks"
      },
      "brand": "Qubo",
      "image": "url_to_image",
      "additional_images": ["url1", "url2"],
      "rating": 4.5,
      "stock": 10,
      "features": {
        "material": "Stainless Steel",
        "dimensions": "5.9 x 3.1 x 1.2 inches",
        "technical_specs": ["Fingerprint Recognition"]
      }
    }
  ]
}
```

### Get Product Detail
```http
GET /products/{slug}/
```

Response: Single product object

### Create Product (Admin only)
```http
POST /products/
```

Request Body:
```json
{
  "name": "New Product",
  "description": "Description",
  "price": 99.99,
  "category_id": 1,
  "brand": "Brand Name",
  "image": "image_url",
  "additional_images": ["url1", "url2"],
  "features": {
    "material": "Material type",
    "dimensions": "Dimensions"
  }
}
```

## Categories API

### List Categories
```http
GET /categories/
```

Response:
```json
[
  {
    "id": 1,
    "name": "Smart Home",
    "slug": "smart-home",
    "description": "Smart home devices",
    "image": "category_image_url",
    "subcategories": [
      {
        "id": 2,
        "name": "Door Locks",
        "slug": "door-locks"
      }
    ]
  }
]
```

### Get Category Detail
```http
GET /categories/{slug}/
```

Response: Single category object with products

### Create Category (Admin only)
```http
POST /categories/
```

Request Body:
```json
{
  "name": "New Category",
  "description": "Category description",
  "parent_id": null,
  "image": "image_url"
}
```

## Cart API

### Get Cart
```http
GET /cart/
```

Response:
```json
{
  "id": "cart_id",
  "items": [
    {
      "id": "item_id",
      "product": {
        "id": "1",
        "name": "Product Name",
        "price": 99.99
      },
      "quantity": 2,
      "total": 199.98
    }
  ],
  "total": 199.98
}
```

### Add to Cart
```http
POST /cart/items/
```

Request Body:
```json
{
  "product_id": "1",
  "quantity": 1
}
```

### Update Cart Item
```http
PATCH /cart/items/{item_id}/
```

Request Body:
```json
{
  "quantity": 2
}
```

### Remove from Cart
```http
DELETE /cart/items/{item_id}/
```

## Orders API

### Create Order
```http
POST /orders/
```

Request Body:
```json
{
  "shipping_address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zip_code": "12345"
  },
  "payment_method": "credit_card",
  "payment_details": {
    "card_token": "token_from_payment_processor"
  }
}
```

### List Orders (User's orders)
```http
GET /orders/
```

Response:
```json
{
  "results": [
    {
      "id": "order_id",
      "status": "processing",
      "total": 299.99,
      "created_at": "2024-02-20T10:30:00Z",
      "items": [
        {
          "product": {
            "id": "1",
            "name": "Product Name"
          },
          "quantity": 1,
          "price": 299.99
        }
      ]
    }
  ]
}
```

### Get Order Detail
```http
GET /orders/{order_id}/
```

## Error Responses

All endpoints return error responses in this format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human readable error message"
  }
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error