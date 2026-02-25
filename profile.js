 const PROFILE_KEY = "luna-profile";
      const ORDERS_KEY = "luna-orders";
      // DOM references for profile form and order history rendering.
      const form = document.getElementById("profileForm");
      const historyList = document.getElementById("historyList");
      const saveMessage = document.getElementById("saveMessage");
      const avatarText = document.getElementById("avatarText");
      let revealObserver = null;

      // Safely parse persisted JSON values with fallback defaults.
      function loadJSON(key, fallback) {
        try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : fallback;
        } catch (error) {
          return fallback;
        }
      }

      // Persist JSON state to localStorage.
      function saveJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      }

      // Generate avatar initials from a customer full name.
      function initials(name) {
        if (!name) {
          return "LC";
        }
        return name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0].toUpperCase())
          .join("");
      }

      // Populate profile form fields from stored account information.
      function fillProfile() {
        const profile = loadJSON(PROFILE_KEY, {});
        Object.keys(profile).forEach((key) => {
          const input = form.elements.namedItem(key);
          if (input) {
            input.value = profile[key];
          }
        });
        avatarText.textContent = initials(profile.fullName);
      }

      // Render order history list and trigger summary stat updates.
      function renderOrders() {
        const orders = loadJSON(ORDERS_KEY, []);
        if (!orders.length) {
          historyList.innerHTML =
            '<div class="empty">No order records found. Submit checkout in the storefront to create your first order.</div>';
          updateStats(orders);
          return;
        }

        historyList.innerHTML = orders
          .map((order, index) => {
            const items = order.items
              .map(
                (item) =>
                  `<div class="line-item">${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</div>`,
              )
              .join("");
            const date = new Date(order.date).toLocaleString();
            return `
            <article class="history-item reveal-item" data-reveal style="--reveal-delay:${Math.min(index * 70, 300)}ms;">
              <div class="history-head">
                <strong>${order.id}</strong>
                <span class="badge">${order.status}</span>
              </div>
              <div class="line-item">${date}</div>
              <div class="line-item">Customer: ${order.customer || "Account Holder"}</div>
              <div style="margin-top:6px;display:grid;gap:4px;">${items}</div>
              <div style="margin-top:8px;font-weight:700;color:#ffd166;">Total: $${Number(order.total || 0).toFixed(2)}</div>
            </article>`;
          })
          .join("");

        registerRevealElements([
          ...historyList.querySelectorAll("[data-reveal]"),
        ]);

        updateStats(orders);
      }

      // Compute aggregate metrics for account-level reporting.
      function updateStats(orders) {
        const totalOrders = orders.length;
        const totalSpend = orders.reduce(
          (sum, order) => sum + Number(order.total || 0),
          0,
        );
        const totalItems = orders.reduce(
          (sum, order) =>
            sum +
            (Array.isArray(order.items)
              ? order.items.reduce(
                  (acc, item) => acc + Number(item.qty || 0),
                  0,
                )
              : 0),
          0,
        );

        document.getElementById("statOrders").textContent = String(totalOrders);
        document.getElementById("statSpent").textContent =
          `$${totalSpend.toFixed(2)}`;
        document.getElementById("statItems").textContent = String(totalItems);
      }

      // Persist profile updates and display save confirmation.
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());
        saveJSON(PROFILE_KEY, profile);
        avatarText.textContent = initials(profile.fullName);
        saveMessage.textContent = "Profile updated successfully.";
        setTimeout(() => {
          saveMessage.textContent = "";
        }, 1800);
      });

      // Initialize observer-driven reveal animations for static and dynamic sections.
      function initScrollReveal() {
        if (!("IntersectionObserver" in window)) {
          document
            .querySelectorAll("[data-reveal]")
            .forEach((el) => el.classList.add("is-visible"));
          return;
        }

        revealObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
        );

        document
          .querySelectorAll("[data-reveal]")
          .forEach((el) => revealObserver.observe(el));
      }

      // Register runtime-rendered nodes for reveal animations.
      function registerRevealElements(elements) {
        if (!elements.length) {
          return;
        }
        if (!revealObserver) {
          elements.forEach((el) => el.classList.add("is-visible"));
          return;
        }
        elements.forEach((el) => revealObserver.observe(el));
      }

      // Page initialization.
      initScrollReveal();
      fillProfile();
      renderOrders();