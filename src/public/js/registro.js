// registro.js

const registerUser = async () => {
  try {
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

    // Envío del formulario al servidor
    const formData = {
      fullName,
      age,
      email,
      password,
      confirmPassword,
    };

    if (!response.ok) {
      throw new Error('Error al enviar el formulario al servidor.');
    }

    const responseData = await response.json();

    // Verificar si la respuesta indica éxito
    if (responseData.success) {
      // Éxito, redirigir a la página de inicio de sesión
      alert('Usuario registrado exitosamente.');
      window.location.href = '../../views/login.html';
    } else {
      // Error, mostrar mensaje al usuario
      alert(responseData.message || 'Ocurrió un error al guardar los datos en la base de datos.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al enviar el formulario al servidor.');
  }

  // Devolver true para permitir que el formulario se envíe normalmente
  return true;
};
