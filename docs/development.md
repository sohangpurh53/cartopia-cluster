# Development Guide

## Running the Application

1. Start Django development server:
```bash
python manage.py runserver
```

2. Start React development server:
```bash
npm run dev
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses include a message field:
```json
{
  "message": "Resource not found"
}
```