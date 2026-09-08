

/* ===============================
   MOBILE MENU
================================ */

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");


menuBtn?.addEventListener("click", () => {

  const isOpen =
    !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");

  menuBtn.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

});


/* ===============================
   CLOSE MOBILE MENU
================================ */

document
  .querySelectorAll(".mobile-link")
  .forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.add("hidden");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


/* ===============================
   COPY DONATION DETAILS
================================ */

document
  .querySelectorAll("[data-copy]")
  .forEach((button) => {

    button.addEventListener("click", async () => {

      const value = button.dataset.copy;

      const originalText =
        button.textContent;


      try {

        await navigator.clipboard.writeText(value);

        button.textContent = "Copied ✓";


        setTimeout(() => {

          button.textContent =
            originalText;

        }, 1600);


      } catch (error) {

        button.textContent =
          "Copy unavailable";


        setTimeout(() => {

          button.textContent =
            originalText;

        }, 1600);

      }

    });

  });


/* ===============================
   CURRENT YEAR
================================ */

document.getElementById("year").textContent =
  new Date().getFullYear();


