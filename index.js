 const CART_KEY = "luna-cart";
      const ORDERS_KEY = "luna-orders";
      const PROFILE_KEY = "luna-profile";
      // Product catalog rendered in the storefront grid and product details modal.
      const products = [
        {
          name: "Nebula Dew Serum",
          category: "Skincare",
          price: 42,
          rating: 4.9,
          image:
            "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=900&q=80",
          description:
            "A lightweight serum that boosts hydration and bounce for a dewy, fresh finish.",
          size: "30 ml",
          benefits: [
            "Hydrates deeply",
            "Brightens dull tone",
            "Layers under makeup",
          ],
          ingredients: ["Niacinamide", "Hyaluronic acid", "Green tea extract"],
        },
        {
          name: "Solar Matte Tint",
          category: "Makeup",
          price: 28,
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
          description:
            "Soft-blur skin tint with breathable coverage and a smooth all-day matte look.",
          size: "40 ml",
          benefits: ["Evens complexion", "Controls shine", "No heavy feel"],
          ingredients: ["Silica blend", "Squalane", "Vitamin E"],
        },
        {
          name: "Halo Repair Mask",
          category: "Skincare",
          price: 35,
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1600428877878-1a0fd85beda3?auto=format&fit=crop&w=900&q=80",
          description:
            "Overnight recovery mask that supports skin barrier repair and morning softness.",
          size: "50 ml",
          benefits: ["Repairs dryness", "Calms redness", "Improves texture"],
          ingredients: ["Ceramides", "Panthenol", "Centella asiatica"],
        },
        {
          name: "Aurora Lip Cloud",
          category: "Lips",
          price: 22,
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
          description:
            "Airy whipped lip tint with high color payoff and a soft velvet finish.",
          size: "6 ml",
          benefits: ["Lightweight wear", "Rich pigment", "Comfortable finish"],
          ingredients: ["Jojoba oil", "Fruit wax", "Vitamin C esters"],
        },
        {
          name: "Comet Lash Lift",
          category: "Eyes",
          price: 19,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1631214524020-0f99f6f0cd3f?auto=format&fit=crop&w=900&q=80",
          description:
            "Lengthening mascara that defines lashes with a flexible, flake-resistant hold.",
          size: "10 ml",
          benefits: ["Adds visible length", "Separates lashes", "No clumping"],
          ingredients: ["Rice bran wax", "Argan oil", "Peptide complex"],
        },
        {
          name: "Moonmilk Clean Balm",
          category: "Skincare",
          price: 31,
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=900&q=80",
          description:
            "Melting cleansing balm that dissolves sunscreen, makeup, and daily buildup fast.",
          size: "90 g",
          benefits: [
            "Removes waterproof makeup",
            "Rinses clean",
            "Leaves skin soft",
          ],
          ingredients: ["Sunflower seed oil", "Oat extract", "Camellia oil"],
        },
        {
          name: "Prism Blush Stick",
          category: "Makeup",
          price: 24,
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1525408612212-8c00be98828e?auto=format&fit=crop&w=900&q=80",
          description:
            "Cream blush stick with buildable color and a natural satin glow.",
          size: "8 g",
          benefits: ["Easy blend", "Buildable intensity", "Travel friendly"],
          ingredients: ["Shea butter", "Squalane", "Rosehip oil"],
        },
        {
          name: "Starline Brow Fix",
          category: "Eyes",
          price: 17,
          rating: 4.4,
          image:
            "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
          description:
            "Clear brow gel that shapes and lifts each hair for a clean laminated look.",
          size: "7 ml",
          benefits: ["Strong hold", "No crunchy feel", "Natural finish"],
          ingredients: ["Aloe vera", "Castor oil", "Film formers"],
        },
      ];

      // DOM references: navigation, cart, modals, and product list containers.
      const categories = [
        "All",
        ...new Set(products.map((item) => item.category)),
      ];
      const chipsWrap = document.getElementById("categoryChips");
      const productGrid = document.getElementById("productGrid");
      const cartButton = document.getElementById("cartButton");
      const cartButtonMobile = document.getElementById("cartButtonMobile");
      const cartCountEl = document.getElementById("cartCount");
      const cartCountMobileEl = document.getElementById("cartCountMobile");
      const cartOverlay = document.getElementById("cartOverlay");
      const cartDrawer = document.getElementById("cartDrawer");
      const cartItemsWrap = document.getElementById("cartItemsWrap");
      const cartSubtotal = document.getElementById("cartSubtotal");
      const cartMessage = document.getElementById("cartMessage");
      const cartCloseBtn = document.getElementById("cartCloseBtn");
      const checkoutBtn = document.getElementById("checkoutBtn");
      const clearCartBtn = document.getElementById("clearCartBtn");
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const themeToggleBtnMobile = document.getElementById(
        "themeToggleBtnMobile",
      );
      const menuToggleBtn = document.getElementById("menuToggleBtn");
      const mobileMenu = document.getElementById("mobileMenu");
      const modal = document.getElementById("quickViewModal");
      const modalImage = document.getElementById("modalImage");
      const modalCategory = document.getElementById("modalCategory");
      const modalTitle = document.getElementById("modalTitle");
      const modalDescription = document.getElementById("modalDescription");
      const modalRating = document.getElementById("modalRating");
      const modalSize = document.getElementById("modalSize");
      const modalBenefits = document.getElementById("modalBenefits");
      const modalIngredients = document.getElementById("modalIngredients");
      const modalPrice = document.getElementById("modalPrice");
      const modalAddBtn = document.getElementById("modalAddBtn");
      const modalCloseBtn = document.getElementById("modalCloseBtn");
      let revealObserver = null;

      // Runtime state used to track filters, modal selection, and cart contents.
      let activeCategory = "All";
      let selectedProduct = null;
      let cartItems = loadJSON(CART_KEY, []);

      // Safely parse persisted JSON values with fallback defaults.
      function loadJSON(key, fallback) {
        try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : fallback;
        } catch (error) {
          return fallback;
        }
      }

      // Persist application state in localStorage.
      function saveJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      }

      // Prevent background scrolling when overlays are visible.
      function syncBodyLock() {
        const shouldLock =
          modal.classList.contains("show") ||
          cartOverlay.classList.contains("show");
        document.body.classList.toggle("modal-open", shouldLock);
      }

      // Apply theme token class and keep control labels in sync.
      function applyTheme(theme) {
        const isLight = theme === "light";
        document.body.classList.toggle("light-theme", isLight);
        const nextLabel = isLight ? "Dark Mode" : "Light Mode";
        themeToggleBtn.textContent = nextLabel;
        themeToggleBtn.setAttribute("aria-pressed", String(isLight));
        if (themeToggleBtnMobile) {
          themeToggleBtnMobile.textContent = nextLabel;
          themeToggleBtnMobile.setAttribute("aria-pressed", String(isLight));
        }
      }

      // Initialize theme from user preference, with system fallback.
      function initTheme() {
        const storedTheme = localStorage.getItem("luna-theme");
        if (storedTheme === "light" || storedTheme === "dark") {
          applyTheme(storedTheme);
          return;
        }
        const prefersLight =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: light)").matches;
        applyTheme(prefersLight ? "light" : "dark");
      }

      // Collapse the mobile navigation menu and reset toggle state.
      function closeMobileMenu() {
        mobileMenu.classList.remove("show");
        menuToggleBtn.classList.remove("open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      }

      // Update the header cart badge to reflect total unit count.
      function updateCartBadge() {
        const totalUnits = cartItems.reduce((sum, item) => sum + item.qty, 0);
        cartCountEl.textContent = String(totalUnits);
        if (cartCountMobileEl) {
          cartCountMobileEl.textContent = String(totalUnits);
        }
      }

      // Add a catalog product to cart and persist the updated state.
      function addToCart(product) {
        const found = cartItems.find((item) => item.name === product.name);
        if (found) {
          found.qty += 1;
        } else {
          cartItems.push({
            name: product.name,
            price: product.price,
            category: product.category,
            qty: 1,
          });
        }
        saveJSON(CART_KEY, cartItems);
        updateCartBadge();
        renderCart();
      }

      // Render cart line items, quantity controls, and subtotal.
      function renderCart() {
        if (!cartItems.length) {
          cartItemsWrap.innerHTML =
            '<div class="empty-cart">Your cart is empty. Add products from the catalog.</div>';
          cartSubtotal.textContent = "$0.00";
          return;
        }

        cartItemsWrap.innerHTML = cartItems
          .map(
            (item) => `
            <article class="cart-item" data-name="${item.name}">
              <div class="cart-item-top">
                <strong>${item.name}</strong>
                <span>$${(item.price * item.qty).toFixed(2)}</span>
              </div>
              <div class="meta">
                <span>${item.category}</span>
                <div class="qty-row">
                  <button class="qty-btn" data-action="decrease" data-name="${item.name}" type="button">-</button>
                  <span>${item.qty}</span>
                  <button class="qty-btn" data-action="increase" data-name="${item.name}" type="button">+</button>
                </div>
              </div>
              <button class="remove-link" data-action="remove" data-name="${item.name}" type="button">Remove</button>
            </article>`,
          )
          .join("");

        const subtotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      }

      // Open cart drawer and refresh its latest content.
      function openCart() {
        cartOverlay.classList.add("show");
        cartOverlay.setAttribute("aria-hidden", "false");
        cartDrawer.classList.add("show");
        syncBodyLock();
        renderCart();
        cartMessage.textContent =
          "Cart data is synchronized with your account profile.";
      }

      // Close cart drawer and restore page scroll when no overlays remain.
      function closeCart() {
        cartOverlay.classList.remove("show");
        cartOverlay.setAttribute("aria-hidden", "true");
        cartDrawer.classList.remove("show");
        syncBodyLock();
      }

      // Create a new order record from current cart and clear cart afterward.
      function saveOrder() {
        if (!cartItems.length) {
          cartMessage.textContent = "Your cart is empty.";
          return;
        }

        const profile = loadJSON(PROFILE_KEY, {});
        const orders = loadJSON(ORDERS_KEY, []);
        const total = cartItems.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );
        const order = {
          id: `LUNA-${Date.now().toString().slice(-8)}`,
          date: new Date().toISOString(),
          status: "Processing",
          customer: profile.fullName || "Account Holder",
          total,
          items: cartItems.map((item) => ({ ...item })),
        };

        orders.unshift(order);
        saveJSON(ORDERS_KEY, orders);
        cartItems = [];
        saveJSON(CART_KEY, cartItems);
        updateCartBadge();
        renderCart();
        cartMessage.textContent = `Order ${order.id} created successfully. Full history is available in Account.`;
      }

      // Initialize observer-driven reveal animations for static and dynamic content blocks.
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

        document.querySelectorAll("[data-reveal]").forEach((el) => {
          revealObserver.observe(el);
        });
      }

      // Register newly rendered elements for reveal animations.
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

      // Render category filter chips and bind selection handlers.
      function renderChips() {
        chipsWrap.innerHTML = categories
          .map(
            (cat) =>
              `<button class="chip ${cat === activeCategory ? "active" : ""}" data-category="${cat}">${cat}</button>`,
          )
          .join("");

        chipsWrap.querySelectorAll(".chip").forEach((chip) => {
          chip.addEventListener("click", () => {
            activeCategory = chip.dataset.category;
            renderChips();
            renderProducts();
          });
        });
      }

      // Render filtered product cards and bind action handlers.
      function renderProducts() {
        const filtered =
          activeCategory === "All"
            ? products
            : products.filter((item) => item.category === activeCategory);

        productGrid.innerHTML = filtered
          .map(
            (product, idx) => `
            <article class="product-card reveal-item" data-reveal style="--reveal-delay:${idx * 70}ms;">
              <img src="${product.image}" alt="${product.name}" loading="lazy" />
              <div class="product-body">
                <span class="label">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="meta">
                  <span>Rating ${product.rating}</span>
                  <span class="price">$${product.price.toFixed(2)}</span>
                </div>
                <div class="card-actions">
                  <button class="view-btn" data-view="${product.name}">View Details</button>
                  <button class="add-btn" data-product="${product.name}">Add to Cart</button>
                </div>
              </div>
            </article>`,
          )
          .join("");

        registerRevealElements([
          ...productGrid.querySelectorAll("[data-reveal]"),
        ]);

        productGrid.querySelectorAll(".add-btn").forEach((button) => {
          button.addEventListener("click", () => {
            const productName = button.dataset.product;
            const product = products.find((item) => item.name === productName);
            if (!product) {
              return;
            }
            addToCart(product);
            button.textContent = "Added to Cart";
            setTimeout(() => {
              button.textContent = "Add to Cart";
            }, 700);
          });
        });

        productGrid.querySelectorAll(".view-btn").forEach((button) => {
          button.addEventListener("click", () => {
            const productName = button.dataset.view;
            const product = products.find((item) => item.name === productName);
            if (product) {
              openModal(product);
            }
          });
        });
      }

      // Open product details modal with selected product data.
      function openModal(product) {
        selectedProduct = product;
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalCategory.textContent = product.category;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalRating.textContent = `Rating ${product.rating}`;
        modalSize.textContent = `Size ${product.size}`;
        modalPrice.textContent = `$${product.price.toFixed(2)}`;
        modalBenefits.innerHTML = product.benefits
          .map((item) => `<p>${item}</p>`)
          .join("");
        modalIngredients.innerHTML = product.ingredients
          .map((item) => `<p>${item}</p>`)
          .join("");
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        syncBodyLock();
        modalCloseBtn.focus();
      }

      // Close product details modal.
      function closeModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        syncBodyLock();
      }

      // Start a live countdown timer for promotional placement.
      function startCountdown(hours = 8) {
        const target = Date.now() + hours * 60 * 60 * 1000;
        const box = document.getElementById("countdown");

        function tick() {
          const diff = Math.max(target - Date.now(), 0);
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff / (1000 * 60)) % 60);
          const s = Math.floor((diff / 1000) % 60);

          box.innerHTML = `
          <div class="time-pill"><b>${String(h).padStart(2, "0")}</b><span>Hours</span></div>
          <div class="time-pill"><b>${String(m).padStart(2, "0")}</b><span>Minutes</span></div>
          <div class="time-pill"><b>${String(s).padStart(2, "0")}</b><span>Seconds</span></div>`;

          if (diff <= 0) {
            clearInterval(timer);
          }
        }

        tick();
        const timer = setInterval(tick, 1000);
      }

      // Handle newsletter form submission and update inline confirmation.
      function subscribe(event) {
        event.preventDefault();
        const emailInput = document.getElementById("emailInput");
        const message = document.getElementById("newsletterMessage");
        message.textContent = `Subscription confirmed for ${emailInput.value}`;
        emailInput.value = "";
        return false;
      }

      // Application bootstrap sequence.
      renderChips();
      initScrollReveal();
      renderProducts();
      renderCart();
      updateCartBadge();
      initTheme();
      startCountdown(9);

      // Cart interaction events.
      cartButton.addEventListener("click", openCart);
      if (cartButtonMobile) {
        cartButtonMobile.addEventListener("click", () => {
          closeMobileMenu();
          openCart();
        });
      }
      cartCloseBtn.addEventListener("click", closeCart);
      cartOverlay.addEventListener("click", (event) => {
        if (event.target === cartOverlay) {
          closeCart();
        }
      });

      // Delegate cart item quantity and removal actions.
      cartItemsWrap.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        const action = target.dataset.action;
        const name = target.dataset.name;
        if (!action || !name) {
          return;
        }
        const item = cartItems.find((entry) => entry.name === name);
        if (!item) {
          return;
        }

        if (action === "increase") {
          item.qty += 1;
        }
        if (action === "decrease") {
          item.qty = Math.max(1, item.qty - 1);
        }
        if (action === "remove") {
          cartItems = cartItems.filter((entry) => entry.name !== name);
        }

        saveJSON(CART_KEY, cartItems);
        updateCartBadge();
        renderCart();
      });

      // Checkout and cart maintenance actions.
      checkoutBtn.addEventListener("click", saveOrder);
      clearCartBtn.addEventListener("click", () => {
        cartItems = [];
        saveJSON(CART_KEY, cartItems);
        updateCartBadge();
        renderCart();
        cartMessage.textContent = "Cart has been cleared.";
      });

      // Product details modal events.
      modalCloseBtn.addEventListener("click", closeModal);
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });

      // Global keyboard close handling for modal overlays.
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          if (modal.classList.contains("show")) {
            closeModal();
          }
          if (cartOverlay.classList.contains("show")) {
            closeCart();
          }
        }
      });

      modalAddBtn.addEventListener("click", () => {
        if (!selectedProduct) {
          return;
        }
        addToCart(selectedProduct);
        modalAddBtn.textContent = "Added to Cart";
        setTimeout(() => {
          modalAddBtn.textContent = "Add To Cart";
        }, 700);
      });

      // Theme preference toggle.
      function toggleTheme() {
        const nextTheme = document.body.classList.contains("light-theme")
          ? "dark"
          : "light";
        applyTheme(nextTheme);
        localStorage.setItem("luna-theme", nextTheme);
      }

      themeToggleBtn.addEventListener("click", toggleTheme);
      if (themeToggleBtnMobile) {
        themeToggleBtnMobile.addEventListener("click", toggleTheme);
      }

      // Mobile navigation menu toggle and lifecycle handlers.
      menuToggleBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("show");
        menuToggleBtn.classList.toggle("open", isOpen);
        menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
      });

      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 640) {
          closeMobileMenu();
        }
      });