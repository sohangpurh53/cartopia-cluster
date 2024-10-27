# API Documentation

## Products

### GET /api/products/
Returns a list of all products.

### GET /api/products/{slug}/
Returns details of a specific product.

## Categories

### GET /api/categories/
Returns a list of all categories with their subcategories.

Response:
```json
[
  {
    "id": 1,
    "name": "Smart Home Devices",
    "slug": "smart-home-devices",
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

### GET /api/categories/{slug}/
Returns details of a specific category and its products.

## Cart Operations

### POST /api/cart/add/
Add item to cart.

### GET /api/cart/
Get cart contents.

### DELETE /api/cart/{item_id}/
Remove item from cart.