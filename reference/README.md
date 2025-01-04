# Home Exercise: Notification Management Service

The goal of this exercise is to create a backend HTTP service for managing user notification preferences and sending notifications based on those preferences.

---

## **Objective**

You are tasked with:
1. Building a backend service (referred to as "User Notifications Manager") that:
   - Manages user notification preferences.
   - Sends notifications based on those preferences via the provided "Notification Service."
2. Containerizing the service using Docker.
3. Integrating the service with the "Notification Service" using Docker Compose.

---

## **User Preferences Structure**

The **User Preferences** are described as follows:

```json
[
  {
    "userId": 1,
    "email": "ironman@avengers.com",
    "telephone": "+123456789",
    "preferences": { "email": true, "sms": true }
  },
  {
    "userId": 2,
    "email": "loki@avengers.com",
    "telephone": "+123456788",
    "preferences": { "email": true, "sms": false }
  },
  {
    "userId": 3,
    "email": "hulk@avengers.com",
    "telephone": "+123456787",
    "preferences": { "email": false, "sms": false }
  },
  {
    "userId": 4,
    "email": "blackwidow@avengers.com",
    "telephone": "+123456786",
    "preferences": { "email": true, "sms": true }
  }
]
```

---

## **Setup**

### **1. File Structure**
Your project should be structured as follows:
```
/project-root
├── docker-compose.yml              # Docker Compose file
├── Dockerfile                      # Dockerfile for the User Notifications Manager
├── package.json                    # User Notifications Manager dependencies
├── src/..                          # User Notifications Manager service code
```

### **2. Run the Services**

#### **Run Services with Docker Compose**
- Start the services:
  ```bash
  docker-compose up --build
  ```
- Access the services:
  - **User Notifications Manager**: Accessible on port `8080`.
  - **Notification Service**: Accessible on port `5001`.

#### **Stop Services**
- Shut down the services:
  ```bash
  docker-compose down
  ```

---

## **Endpoints**

### **User Notifications Manager**

Your task is to define and implement these endpoints:

1. **Send Notifications**
   - Accepts user information (e.g., `userId` or `email`) and message content.
   - Sends notifications to the "Notification Service" based on user preferences.
   - Input Example:
     ```json
     {
       "userId": 1,
       "message": "This is your notification message."
     }
     ```

2. **Edit User Preferences**
   - Accepts user information (e.g., `email`) and notification preferences.
   - Adds or updates user data in the in-memory data structure.
   - Input Example:
     ```json
     {
       "email": "user@example.com",
       "preferences": { "email": true, "sms": false }
     }
     ```

3. **Create User Preferences**
   - Accepts user information (e.g., `email`) and notification preferences.
   - Creates user preferences data in the in-memory data structure.
   - Input Example:
     ```json
     {
       "email": "user@example.com",
       "telephone": "+123456786",
       "preferences": { "email": true, "sms": false }
     }
     ```

---

## **Notification Service**

Use the "Notifications Service" as an external api to send notifications. 

The "Notification Service" is already provided and integrated into the `docker-compose.yml`. 
For detailed information about its API, refer to the **Notification Service README** attached with this exercise.

---

## **Additional Comments**

- The system should store hundreds of thousands of users.
- For simplicity, store data in memory (no need for external storage).
- Ensure flexibility for adding additional notification channels in the future.
- If a user has multiple preferences enabled, the notification should be sent to all specified channels.

---

## **Testing**

### **Send Notification Example**
```bash
curl -X POST http://localhost:8080/<your-notifications-endpoint> \
-H "Authorization: Bearer onlyvim2024" \
-H "Content-Type: application/json" \
-d '{
  "userId": 1,
  "message": "Hello, this is a notification!"
}'
```

### **Add User Example**
```bash
curl -X POST http://localhost:8080/<your-users-endpoint> \
-H "Authorization: Bearer onlyvim2024" \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "preferences": { "email": true, "sms": true }
}'
```

---

## **Submission**

1. Include the following:
   - User Notifications Manager service code.
   - `Dockerfile` for the User Notifications Manager.
   - `docker-compose.yml`.
   - Clear instructions in your own README file.

2. Submit your solution as a Git repository link or a compressed `.zip` file.

---

## **Contact for Questions and Submissions**

If you have any questions or need clarification, feel free to reach out:

- Arye Kogan: [aryek@getvim.com](mailto:aryek@getvim.com)
- Ayala Barzilay: [ayalab@getvim.com](mailto:ayalab@getvim.com)

Good luck! We’re excited to see your solution.