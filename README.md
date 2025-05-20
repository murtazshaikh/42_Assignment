
# HypermART Checkout System

This is a frontend implementation of a real-time customer queue management system built using **HTML, CSS, and JavaScript**. It was developed as part of a screening assignment for a Full-Stack Developer role.

## 🛒 Problem Statement

Large retail chains often face the challenge of distributing incoming customers efficiently across multiple checkout counters. The goal of this assignment is to simulate that process by assigning customers to the counter with the least number of items in its queue.

### Example:
If three customers arrive with 5, 12, and 6 items respectively, they should be distributed in a way that keeps total queue lengths balanced across counters.

---

## ⚙️ Features

- Dynamically assigns each customer to the counter with the fewest total items.
- Fully scalable — change one variable to update the number of checkout counters.
- Real-time DOM updates for customer queues and totals.
- Delete a customer from any queue.
- Clean UI with highlight on the most available counter.

---

## 🔧 How to Use

1. Enter the number of items for a customer.
2. Click "Checkout Items".
3. The customer will be added to the best-fit counter.
4. Click the — icon to remove a customer from a queue.

To change the number of counters, simply update this line in `script.js`:

```js
const COUNTER_COUNT = 5;
```

---

## 🧠 Assumptions

- All customers enter one at a time and are instantly assigned.
- Each customer is defined only by the number of items they bring.
- Queue ordering is first-come, first-served per counter.
- For simplicity, each customer is added to the first eligible counter if there’s a tie.

---

## ⏱️ Time Complexity

- **Assignment Logic:**  
  For each new customer:
  - Finding the counter with the least total items: `O(n * k)`  
    (where `n` is number of counters and `k` is the average queue length per counter)
    
---

## 🧼 Built With

- HTML5
- CSS3 (custom styling, no frameworks)
- JavaScript (ES6+)

---

## ✅ What Makes This Scalable?

- Change one constant to switch from 3 counters to 10+
- All counter elements and logic adjust automatically
- DOM rendering is fully dynamic
