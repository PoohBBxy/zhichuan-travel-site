const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = Array.from(document.querySelectorAll(".primary-nav a"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const codeButton = document.querySelector("[data-code]");

const codeChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const languageOptions = [
  { id: "chinese_simplified", label: "简体中文" },
  { id: "english", label: "English" },
  { id: "japanese", label: "日本語" },
  { id: "korean", label: "한국어" },
];
const submenuConfig = {
  news: [
    { label: "公司新闻", href: "news.html#company" },
    { label: "行业新闻", href: "news.html#industry" },
  ],
  about: [{ label: "公司简介", href: "about.html#intro" }],
  contact: [{ label: "在线留言", href: "contact.html#message" }],
};

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-active");
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function createCode() {
  if (!codeButton) {
    return "";
  }

  let code = "";
  for (let index = 0; index < 4; index += 1) {
    code += codeChars[Math.floor(Math.random() * codeChars.length)];
  }
  codeButton.textContent = code;
  return code;
}

function setActiveNav() {
  const page = document.body.dataset.page || "home";

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === page);
  });
}

function enhanceNavigation() {
  Object.entries(submenuConfig).forEach(([key, items]) => {
    document.querySelectorAll(`[data-page-link="${key}"]`).forEach((link) => {
      if (link.parentElement?.classList.contains("nav-item")) {
        return;
      }

      const wrapper = document.createElement("span");
      wrapper.className = "nav-item has-submenu";
      link.parentNode.insertBefore(wrapper, link);
      wrapper.append(link);

      const submenu = document.createElement("span");
      submenu.className = "submenu";
      items.forEach((item) => {
        const child = document.createElement("a");
        child.href = item.href;
        child.textContent = item.label;
        submenu.append(child);
      });
      wrapper.append(submenu);
    });
  });
}

function bindClickableCards() {
  document.querySelectorAll("[data-href]").forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "link");
    item.addEventListener("click", () => {
      window.location.href = item.dataset.href;
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = item.dataset.href;
      }
    });
  });
}

function applyLanguage(languageId) {
  if (window.i18n) {
    window.i18n.apply(languageId);
  }
}

function setupLanguageMenu() {
  const languageButton = document.querySelector(".language");
  if (!languageButton) {
    return;
  }

  const label = languageButton.querySelector("span");
  const savedLanguage = localStorage.getItem("zhichuan-language") || "chinese_simplified";
  const wrapper = document.createElement("span");
  const menu = document.createElement("span");

  wrapper.className = "language-wrap";
  wrapper.setAttribute("translate", "no");
  menu.className = "language-menu";
  menu.setAttribute("translate", "no");

  languageButton.parentNode.insertBefore(wrapper, languageButton);
  wrapper.append(languageButton);
  wrapper.append(menu);

  function updateLanguageLabel(languageId) {
    const option = languageOptions.find((item) => item.id === languageId) || languageOptions[0];
    if (label) {
      label.textContent = option.label;
    }

    menu.querySelectorAll(".language-option").forEach((item) => {
      item.classList.toggle("active", item.dataset.language === option.id);
    });
  }

  languageOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-option";
    button.dataset.language = option.id;
    button.textContent = option.label;
    button.addEventListener("click", () => {
      updateLanguageLabel(option.id);
      wrapper.classList.remove("open");
      applyLanguage(option.id);
    });
    menu.append(button);
  });

  languageButton.addEventListener("click", (event) => {
    event.stopPropagation();
    wrapper.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) {
      wrapper.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      wrapper.classList.remove("open");
    }
  });

  updateLanguageLabel(savedLanguage);
  applyLanguage(savedLanguage);
}

function renderSearchPage() {
  const items = Array.from(document.querySelectorAll("[data-search-item]"));
  if (!items.length) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const keyword = (params.get("keyword") || "").trim();
  const title = document.querySelector("[data-search-title]");
  const empty = document.querySelector("[data-empty-result]");
  const searchInput = document.querySelector(".search-form input");

  if (searchInput) {
    searchInput.value = keyword;
  }

  if (title && keyword) {
    title.textContent = ` / SEARCH: ${keyword}`;
  }

  let visibleCount = 0;
  items.forEach((item) => {
    const haystack = `${item.textContent} ${item.dataset.keywords || ""}`.toLowerCase();
    const matched = !keyword || haystack.includes(keyword.toLowerCase());
    item.hidden = !matched;
    if (matched) {
      visibleCount += 1;
    }
  });

  if (empty) {
    empty.hidden = visibleCount > 0;
  }
}

window.addEventListener("scroll", () => {
  setHeaderState();
  setActiveNav();
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  header.classList.toggle("menu-active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelector(".search-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const keyword = input.value.trim();
  if (!keyword) {
    input.focus();
    return;
  }
  window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

codeButton?.addEventListener("click", createCode);
createCode();

function localize(text) {
  return window.i18n ? window.i18n.t(text) : text;
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const code = String(data.get("code") || "").trim().toUpperCase();

  if (!name) {
    formNote.textContent = localize("请输入您的姓名。");
    contactForm.elements.name.focus();
    return;
  }

  if (!/^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/.test(phone)) {
    formNote.textContent = localize("请输入正确的联系电话。");
    contactForm.elements.phone.focus();
    return;
  }

  if (code !== codeButton.textContent) {
    formNote.textContent = localize("验证码不正确，请重新输入。");
    contactForm.elements.code.focus();
    createCode();
    return;
  }

  contactForm.reset();
  createCode();
  formNote.textContent = localize("留言已记录在前端演示中，正式上线时可接入后台。");
});

setHeaderState();
enhanceNavigation();
bindClickableCards();
setupLanguageMenu();
renderSearchPage();
setActiveNav();

// Render icons as soon as the script runs (lucide is loaded with `defer` before
// this file, so it is already available). Waiting for window.load meant icons
// only appeared after slow remote images finished, causing the header to jump.
function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

renderIcons();
window.addEventListener("load", renderIcons);
