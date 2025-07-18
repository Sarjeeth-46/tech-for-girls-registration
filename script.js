const whatsappBtn = document.getElementById('whatsappShareBtn');
const clickCountText = document.getElementById('clickCount');
const shareCompleteMsg = document.getElementById('shareCompleteMsg');
const regForm = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYouMsg = document.getElementById('thankYouMsg');

let count = 0;

// Check localStorage for submission
if (localStorage.getItem('submitted') === 'true') {
  regForm.style.display = 'none';
  thankYouMsg.classList.remove('hidden');
}

// WhatsApp Share Button
whatsappBtn.addEventListener('click', () => {
  if (count < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community! 💥");
    window.open(`https://wa.me/?text=${message}`, "_blank");

    count++;
    clickCountText.textContent = `Click count: ${count} / 5`;

    if (count === 5) {
      shareCompleteMsg.classList.remove('hidden');
      whatsappBtn.disabled = true;
    }
  }
});

// Submit Form
regForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (count < 5) {
    alert("Please complete WhatsApp sharing (5/5) before submitting.");
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const screenshot = document.getElementById('screenshot').files[0];

  // Upload file to File.io or Cloudinary OR just send file name to Google Sheets via Apps Script
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("file", screenshot);

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Send to Google Apps Script Web App URL
  fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
    method: "POST",
    body: formData,
  }).then(response => response.text())
    .then(data => {
      localStorage.setItem('submitted', 'true');
      regForm.reset();
      regForm.style.display = 'none';
      thankYouMsg.classList.remove('hidden');
    }).catch(error => {
      alert("Something went wrong. Try again.");
      console.error(error);
    });
});
