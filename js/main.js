

/* ===============================
   MOBILE MENU
================================ */

const menuButtons = [
  document.getElementById("menu-btn"),
  document.getElementById("menuBtn"),
  document.getElementById("mobile-menu-button")
].filter(Boolean);

const mobileMenus = [
  document.getElementById("mobile-menu"),
  document.getElementById("mobileMenu")
].filter(Boolean);

menuButtons.forEach((button) => {
  const targetMenu = mobileMenus.find((menu) => {
    const buttonId = button.id;
    return (
      (buttonId === "menu-btn" || buttonId === "mobile-menu-button") &&
      (menu.id === "mobile-menu" || menu.id === "mobileMenu")
    ) ||
    (buttonId === "menuBtn" && (menu.id === "mobileMenu" || menu.id === "mobile-menu"));
  }) || mobileMenus[0];

  button.addEventListener("click", () => {
    if (!targetMenu) return;

    const isOpen = !targetMenu.classList.contains("hidden");
    targetMenu.classList.toggle("hidden");
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});


/* ===============================
   CLOSE MOBILE MENU
================================ */

document
  .querySelectorAll(".mobile-link, .mobile-nav-link")
  .forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenus.forEach((menu) => menu.classList.add("hidden"));
      menuButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
    });
  });


/* ===============================
   TEMPLATE CONFIG
================================ */

const config = window.SCSF_CONFIG || {};

const setTextContent = (selector, value) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
};

const applyTemplateConfig = () => {
  if (!config || Object.keys(config).length === 0) return;

  const foundationName = config.foundationName || "Send a Child to School Foundation";
  const email = config.contact?.email || "[FOUNDATION EMAIL]";
  const phone = config.contact?.phone || "[FOUNDATION PHONE NUMBER]";
  const whatsapp = config.contact?.whatsapp || "[FOUNDATION WHATSAPP NUMBER]";
  const address = config.contact?.address || "[FOUNDATION ADDRESS]";
  const officeAddress = config.contact?.officeAddress || "[FOUNDATION OFFICE ADDRESS]";

  setTextContent(".site-name", foundationName);
  setTextContent(".contact-email", email);
  setTextContent(".contact-phone", phone);
  setTextContent(".contact-whatsapp", whatsapp);
  setTextContent(".contact-address", address);
  setTextContent(".contact-office-address", officeAddress);

  const formMap = {
    volunteer: ".form-volunteer",
    partnership: ".form-partnership",
    general: ".form-general",
    media: ".form-media"
  };

  Object.entries(formMap).forEach(([key, selector]) => {
    const anchor = document.querySelector(selector);
    if (anchor && config.forms && config.forms[key]) {
      anchor.setAttribute("href", config.forms[key]);
    }
  });
};

applyTemplateConfig();


/* ===============================
   COPY DONATION DETAILS
================================ */

const copyTextToClipboard = async (value) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-9999px";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  helper.setSelectionRange(0, value.length);

  const copied = document.execCommand("copy");
  document.body.removeChild(helper);

  if (!copied) {
    throw new Error("Copy command failed");
  }
};

document
  .querySelectorAll("[data-copy]")
  .forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      const originalText = button.textContent;

      try {
        await copyTextToClipboard(value);
        button.textContent = "Copied ✓";
      } catch (error) {
        button.textContent = "Copy unavailable";
      }

      setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    });
  });


/* ===============================
   CURRENT YEAR
================================ */

document.querySelectorAll("#year, #currentYear, #current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});


