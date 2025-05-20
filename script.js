"use strict";

const COUNTER_COUNT = 3; // Change this to 5 or more to scale easily

const counters = Array.from({ length: COUNTER_COUNT }, () => []);
const container = document.querySelector(".checkout-counters");

const input = document.getElementById("itemInput");
const button = document.getElementById("checkoutBtn");

let counterEls = [];

initCounters();
renderCounters();

// Setup counters in the DOM dynamically
function initCounters() {
  container.innerHTML = ""; // Clear existing HTML
  counterEls = [];

  for (let i = 0; i < COUNTER_COUNT; i++) {
    const counterDiv = document.createElement("div");
    counterDiv.className = "counter";
    counterDiv.id = `counter${i + 1}`;
    counterDiv.innerHTML = `
      <h3>Counter ${
        i + 1
      } <span class="customers"><i class='fas fa-user-friends'></i>0 customers</span></h3>
      <ul class="items"></ul>
      <p class="total">Total Items: 0</p>
    `;
    container.appendChild(counterDiv);
    counterEls.push(counterDiv);
  }
}

// Handle button click
button.addEventListener("click", () => {
  const itemCount = parseInt(input.value);

  if (isNaN(itemCount) || itemCount <= 0) {
    alert("Please enter a valid number of items");
    return;
  }

  // Find least-loaded counter
  const totals = counters.map((queue) => queue.reduce((a, b) => a + b, 0));
  const minTotal = Math.min(...totals);
  const targetIndex = totals.indexOf(minTotal);

  counters[targetIndex].push(itemCount);
  input.value = "";

  renderCounters(); // re-render UI
});

function renderCounters() {
  counters.forEach((queue, i) => {
    const counterEl = counterEls[i];
    const listEl = counterEl.querySelector(".items");
    const customerCountEl = counterEl.querySelector(".customers");
    const totalEl = counterEl.querySelector(".total");

    listEl.innerHTML = "";

    queue.forEach((items, customerIndex) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <span>🛒 ${items} items</span>
          <span class="delete-btn" style="cursor:pointer; color:#dc2626;">–</span>
        `;

      // Add click handler to delete
      li.querySelector(".delete-btn").addEventListener("click", () => {
        counters[i].splice(customerIndex, 1); // remove customer from queue
        renderCounters();
      });

      listEl.appendChild(li);
    });

    customerCountEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16" style="margin-right: 6px; vertical-align: middle;">
      <path fill="#777" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/>
    </svg>
    ${queue.length} customers`;
    const totalItems = queue.reduce((a, b) => a + b, 0);
    totalEl.textContent = `Total Items: ${totalItems}`;
  });

  const totals = counters.map((q) => q.reduce((a, b) => a + b, 0));
  const minTotal = Math.min(...totals);

  counterEls.forEach((el, idx) => {
    if (totals[idx] === minTotal) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
