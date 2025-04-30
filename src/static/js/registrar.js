document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const username = document.getElementById("username");
    const nationalId = document.getElementById("national-id");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    // Utility function to show error messages
    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        errorSpan.style.color = "red";
    }

    // Utility function to clear error messages
    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = "";
    }

    // Username Validation (No spaces allowed)
    username.addEventListener("input", function () {
        if (/\s/.test(username.value)) {
            showError(username, "Username cannot contain spaces.");
        } else {
            clearError(username);
        }
    });

    // National ID Validation (Only numbers)
    nationalId.addEventListener("input", function () {
        if (!/^\d+$/.test(nationalId.value)) {
            showError(nationalId, "Only numbers allowed.");
        } else {
            clearError(nationalId);
        }
    });

    // Email Validation
    email.addEventListener("input", function () {
        if (!email.validity.valid) {
            showError(email, "Enter a valid email address.");
        } else {
            clearError(email);
        }
    });

    // Phone Number Validation (Must start with + and be numeric)
    phone.addEventListener("input", function () {
        if (!/^\+\d{7,15}$/.test(phone.value)) {
            showError(phone, "Enter a valid international phone number.");
        } else {
            clearError(phone);
        }
    });

    // Password Strength Validation
    password.addEventListener("input", function () {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passRegex.test(password.value)) {
            showError(password, "Must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special.");
        } else {
            clearError(password);
        }
    });

    // Confirm Password Match Validation
    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "Passwords do not match.");
        } else {
            clearError(confirmPassword);
        }
    });

    // Form Submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Ensure all fields are valid before submission
        if (document.querySelector(".error-message:not(:empty)")) {
            alert("Please fix errors before submitting.");
            return;
        }

        // Simulate Secure Submission
        alert("Registration Successful!");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const dropdownSelected = document.querySelector(".dropdown-selected");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const hiddenInput = document.querySelector("#account-type");

    // 🔹 Alternar la visibilidad del menú desplegable al hacer clic en el contenedor
    dropdown.addEventListener("click", function (e) {
        e.stopPropagation(); // Evita que el evento de clic se propague al documento
        dropdown.classList.toggle("open");
    });

    // 🔹 Seleccionar un elemento de la lista
    dropdownItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.stopPropagation(); // Evita cerrar antes de actualizar
            dropdownSelected.textContent = this.textContent; // Muestra la opción seleccionada
            hiddenInput.value = this.dataset.value; // Guarda el valor seleccionado en el input oculto
            dropdown.classList.remove("open"); // Oculta la lista después de seleccionar
        });
    });

    // 🔹 Cerrar el dropdown si el usuario hace clic fuera de él
    document.addEventListener("click", function () {
        dropdown.classList.remove("open");
    });

    // 🔹 Evita que el formulario se envíe sin seleccionar un rol
    document.querySelector("#registration-form").addEventListener("submit", function (e) {
        if (!hiddenInput.value) {
            e.preventDefault();
            alert("Por favor, selecciona un rol.");
        }
    });
});
