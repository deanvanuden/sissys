(function () {
  document.documentElement.classList.add("js");

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var builderBasePrice = 15;
  var totalNode = document.getElementById("builderTotal");
  var choiceGroups = Array.prototype.slice.call(document.querySelectorAll(".step-panel"));

  function updateBuilderTotal() {
    var total = builderBasePrice;
    choiceGroups.forEach(function (group) {
      var activeChoice = group.querySelector(".choice.is-active");
      if (activeChoice) {
        total += Number(activeChoice.getAttribute("data-price") || 0);
      }
    });

    if (totalNode) {
      totalNode.textContent = total.toLocaleString("de-DE") + " EUR";
    }
  }

  choiceGroups.forEach(function (group) {
    group.addEventListener("click", function (event) {
      var choice = event.target.closest(".choice");
      if (!choice) {
        return;
      }

      Array.prototype.slice.call(group.querySelectorAll(".choice")).forEach(function (button) {
        button.classList.remove("is-active");
      });
      choice.classList.add("is-active");
      updateBuilderTotal();
    });
  });

  updateBuilderTotal();

  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var pageNav = document.getElementById("pageNav");

  function setMenuOpen(isOpen) {
    if (!header || !menuToggle || !pageNav) {
      return;
    }

    header.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  }

  if (menuToggle && pageNav) {
    menuToggle.addEventListener("click", function () {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    pageNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });
  }

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".menu-tab"));
  var menuCards = Array.prototype.slice.call(document.querySelectorAll(".menu-card"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      filterButtons.forEach(function (tab) {
        tab.classList.remove("is-active");
      });
      button.classList.add("is-active");

      menuCards.forEach(function (card) {
        var shouldShow = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
})();
