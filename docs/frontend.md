# Frontend Integration

## API Client Setup

```typescript
const API_BASE_URL = 'http://localhost:8000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products/`);
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  return response.json();
};
```

## Authentication
Include the token in protected requests:
```typescript
const headers = {
  'Authorization': `Token ${token}`,
  'Content-Type': 'application/json',
};
```

Protected endpoints include:
- Cart operations
- User profile
- Order management