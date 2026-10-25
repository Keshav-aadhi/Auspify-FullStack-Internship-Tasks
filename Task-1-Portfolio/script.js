document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formResponse = document.getElementById("form-response");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      formResponse.textContent = `Thank you, ${name}! Your message has been received.`;
      contactForm.reset();

      setTimeout(() => {
        formResponse.textContent = "";
      }, 5000);
    } else {
      formResponse.style.color = "#dc2626";
      formResponse.textContent = "Please fill in all fields.";
    }
  });
});