# 🚀 SubTrack - Subscription Tracker API (Express & MongoDB Edition)

**SubTrack** is a powerful backend service built with **Express.js** and **MongoDB** to help users organize and monitor their subscriptions. This version leverages **Mongoose** for elegant data modeling and **Upstash Workflow** for automated, background-driven email notifications.

---

## 🛠 Tech Stack

* **Server:** [Express.js](https://expressjs.com/) (Node.js)
* **Database:** [MongoDB](https://www.mongodb.com/) (Atlas)
* **ODM:** [Mongoose](https://mongoosejs.com/)
* **Workflow & Automation:** [Upstash Workflow](https://upstash.com/)
* **Security:** [Arcjet](https://arcjet.com/) (Bot protection, Rate limiting)
* **Emailing:** [Nodemailer](https://nodemailer.com/)
* **Date Handling:** [Day.js](https://day.js.org/)

---

## ✨ Key Features

-   ✅ **NoSQL Data Modeling:** Flexible subscription management using **Mongoose** schemas.
-   ⏳ **Intelligent Lifecycle Workflows:** Background processes that automate email reminders at **7, 5, 2, and 1 day(s)** before renewal.
-   🛡️ **Proactive Security:** Integrated **Arcjet** to shield API endpoints from bot attacks and manage request traffic.
-   🔍 **Strict Schema Validation:** Every request is filtered through **Zod** to ensure only clean, valid data reaches the database.
-   📧 **Dynamic Notifications:** Automated HTML emails customized with subscription details (price, currency, and renewal date).
-   🔄 **Scalable Architecture:** Designed to handle multiple concurrent workflows without blocking the main server thread.

---

## 🏗 System Architecture

The project is structured to provide a secure and reliable backend experience:
1.  **Request Pipeline:** Incoming requests are first checked by **Arcjet** security and then validated via **Zod**.
2.  **Data Layer:** Uses **Mongoose** to interact with **MongoDB**, ensuring consistent document structures.
3.  **Automation:** When a subscription is active, **Upstash Workflow** takes over to handle the time-based logic (scheduling reminders).
4.  **Communication:** **Nodemailer** serves as the delivery agent for all system-generated notifications.

---

## 🚀 Getting Started

Follow these steps to set up and run the server locally:

### 1. Clone the Repository
```bash
git clone [https://github.com/HussamMAhmad/subscription-tracker-mongodb.git](https://github.com/HussamMAhmad/subscription-tracker-mongodb.git)
cd subscription-tracker-mongodb
