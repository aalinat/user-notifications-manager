# Notification Service

The Notification Service is a simple Node.js application that simulates sending notifications via email and SMS. It includes features like per-endpoint rate limiting and random error simulation to mimic real-world scenarios.

---

## **Features**

1. **Send Email**: Simulates sending email notifications.
2. **Send SMS**: Simulates sending SMS notifications.
3. **Per-Endpoint Rate Limiting**: Configurable request limits for each endpoint.
4. **Random Errors**: Configurable percentage of random server errors to simulate failures.

---

## **Setup**

### **1. Prerequisites**
- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/) (optional for containerized deployment)

### **2. Install Dependencies**
```bash
npm install
```

---

## **Running the Service**

### **1. Locally**
Start the service:
```bash
npm start
```
The service will run on `http://localhost:5001`.

### **2. With Docker**

#### Build the Docker Image:
```bash
docker build -t notification-service .
```

#### Run the Container:
```bash
docker run -p 5001:5001 \
  -e EMAIL_RATE_LIMIT=3 \
  -e SMS_RATE_LIMIT=2 \
  -e RATE_LIMIT_WINDOW_MS=2000 \
  -e ERROR_RATE=0.2 \
  notification-service
```

---

## **Environment Variables**

| Variable                | Default Value | Description                                              |
|-------------------------|---------------|----------------------------------------------------------|
| `EMAIL_RATE_LIMIT`      | `1`           | Number of requests per second allowed for `/send-email`. |
| `SMS_RATE_LIMIT`        | `1`           | Number of requests per second allowed for `/send-sms`.   |
| `RATE_LIMIT_WINDOW_MS`  | `1000`        | Time window for rate limiting, in milliseconds.          |
| `ERROR_RATE`            | `0.1`         | Fraction of requests that return a random server error.  |

---

## **Endpoints**

### **1. Send Email**
**POST** `/send-email`

- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "message": "This is a test email message."
  }
  ```

- **Response**:
  - **Success**:
    ```json
    {
      "status": "sent",
      "channel": "email",
      "to": "user@example.com",
      "message": "This is a test email message."
    }
    ```
  - **Rate Limit Exceeded**:
    ```json
    { "error": "Too many requests for /send-email, please try again later." }
    ```
  - **Random Error**:
    ```json
    { "error": "Random server error occurred." }
    ```

---

### **2. Send SMS**
**POST** `/send-sms`

- **Request Body**:
  ```json
  {
    "telephone": "+1234567890",
    "message": "This is a test SMS message."
  }
  ```

- **Response**:
  - **Success**:
    ```json
    {
      "status": "sent",
      "channel": "sms",
      "to": "+1234567890",
      "message": "This is a test SMS message."
    }
    ```
  - **Rate Limit Exceeded**:
    ```json
    { "error": "Too many requests for /send-sms, please try again later." }
    ```
  - **Random Error**:
    ```json
    { "error": "Random server error occurred." }
    ```

---

## **Testing**

### **Send Email Example**
```bash
curl -X POST http://localhost:5001/send-email \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "message": "Hello via Email!"}'
```

### **Send SMS Example**
```bash
curl -X POST http://localhost:5001/send-sms \
-H "Content-Type: application/json" \
-d '{"telephone": "+1234567890", "message": "Hello via SMS!"}'
```