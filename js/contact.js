// ─── Contact / Enquiry Form Handling ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn  = document.getElementById('form-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      field.classList.remove('border-red-500');
      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        valid = false;
      }
    });

    if (!valid) {
      const firstInvalid = form.querySelector('.border-red-500');
      firstInvalid?.focus();
      return;
    }

    // Email format check
    const emailField = form.querySelector('[type="email"]');
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('border-red-500');
      emailField.focus();
      return;
    }

    // Submit state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    // Simulate async submission (replace with actual endpoint / FormSubmit / EmailJS)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Show success message
    form.reset();
    form.classList.add('hidden');
    successMsg?.classList.remove('hidden');

    // Re-enable after 5 seconds if user wants to submit again
    setTimeout(() => {
      form.classList.remove('hidden');
      successMsg?.classList.add('hidden');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry';
      }
    }, 6000);
  });

  // Live validation: clear error on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('border-red-500');
    });
  });
});
