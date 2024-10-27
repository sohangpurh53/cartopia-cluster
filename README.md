# E-commerce Store with React Frontend and Django Backend

## Backend API Documentation

### Setup Django Backend

1. Create a virtual environment and install dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install django djangorestframework django-cors-headers
```

2. Create a new Django project:
```bash
django-admin startproject backend
cd backend
python manage.py startapp api
```

### API Endpoints

#### Products

```
GET /api/products/
```
Returns a list of all products.

Response:
```json
[
  {
    "id": "1",
    "name": "Smart Door Lock X1",
    "slug": "smart-door-lock-x1",
    "description": "Advanced biometric door lock with fingerprint recognition",
    "price": 299.99,
    "category": "Door Locks",
    "brand": "Qubo",
    "image": "url_to_image",
    "additionalImages": ["url1", "url2"],
    "rating": 4.5,
    "stock": 10,
    "features": {
      "material": "Stainless Steel",
      "dimensions": "5.9 x 3.1 x 1.2 inches",
      "technicalSpecs": ["Fingerprint Recognition", "Battery Life: 12 months", "Bluetooth Enabled"]
    }
  }
]
```

```
GET /api/products/{slug}/
```
Returns details of a specific product.

#### Categories

```
GET /api/categories/
```
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

#### Cart

```
POST /api/cart/add/
```
Add item to cart.

Request:
```json
{
  "product_id": "1",
  "quantity": 1
}
```

```
GET /api/cart/
```
Get cart contents.

```
DELETE /api/cart/{item_id}/
```
Remove item from cart.

### Django Models

```python
# api/models.py

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    image = models.URLField()
    additional_images = models.JSONField(default=list)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    stock = models.IntegerField()
    features = models.JSONField()
    date_added = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
```

### Configuration

1. Add to `settings.py`:
```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Your React dev server
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ]
}
```

2. Update `urls.py`:
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/cart/', include('api.urls.cart')),
]
```

### Frontend Integration

Update your React application to use the Django backend:

1. Create an API client:
```typescript
// src/lib/api.ts
const API_BASE_URL = 'http://localhost:8000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products/`);
  return response.json();
};

export const fetchProduct = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}/`);
  return response.json();
};
```

2. Use React Query for data fetching:
```typescript
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
```

### Development

1. Start Django development server:
```bash
python manage.py runserver
```

2. Start React development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:8000/api/` and the frontend at `http://localhost:5173`.

### Authentication

The API uses token-based authentication for protected endpoints. Include the token in your requests:

```typescript
const headers = {
  'Authorization': `Token ${token}`,
  'Content-Type': 'application/json',
};
```

Protected endpoints include:
- Cart operations (add, remove, update)
- User profile
- Order management

### Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses include a message field explaining the error:
```json
{
  "message": "Product not found"
}
```