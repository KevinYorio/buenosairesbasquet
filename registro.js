// En registro.js
const registerUser = async () => {
  // Obtener datos del formulario
  const fullName = document.getElementById("fullName").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validación de edad mejorada
  const ageNumber = parseInt(age, 10);
  if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 90) {
    alert("Por favor, ingrese una edad válida.");
    return false;
  }

  // Validación de correo electrónico
  if (!/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  // Validación de contraseña y confirmación de contraseña
  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/user/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        age,
        email,
        password,
        // Puedes agregar más campos aquí según sea necesario
      }),
    });

    if (response.ok) {
      alert("Registro exitoso. ¡Bienvenido a Buenos Aires Basquet!");
      return true;
    } else {
      const errorMessage = await response.text();
      alert(`Error en el registro: ${errorMessage}`);
      return false;
    }
  } catch (error) {
    console.error('Error al procesar el registro:', error);
    return false;
  }
};
