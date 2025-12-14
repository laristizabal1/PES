// ==================== CONFIGURACIÓN EMAILJS ====================
// IMPORTANTE: Reemplaza estos valores con los tuyos de EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'M-duuFaRxMWr5oUQb',  // Obtener de: https://dashboard.emailjs.com/admin/account
    serviceId: 'service_obwobss',   // Obtener de: https://dashboard.emailjs.com/admin
    templateId: 'template_qkbi39i'  // Obtener de: https://dashboard.emailjs.com/admin/templates
};

// ==================== VALIDACIÓN DE FORMULARIO ====================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    // Acepta formatos: +57 123 456 7890, 123-456-7890, 1234567890
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

function validateForm(formData) {
    let isValid = true;
    const errors = {};

    // Validar nombre
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Por favor ingresa un nombre válido (mínimo 2 caracteres)';
        isValid = false;
    }

    // Validar email
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Por favor ingresa un correo electrónico válido';
        isValid = false;
    }

    // Validar teléfono
    if (!formData.phone || !validatePhone(formData.phone)) {
        errors.phone = 'Por favor ingresa un número de teléfono válido';
        isValid = false;
    }

    // Validar mensaje
    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Por favor ingresa un mensaje (mínimo 10 caracteres)';
        isValid = false;
    }

    return { isValid, errors };
}

function showFieldError(fieldName, errorMessage) {
    const formGroup = document.querySelector(`[name="${fieldName}"]`).closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.add('error');
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}

function clearFieldError(fieldName) {
    const formGroup = document.querySelector(`[name="${fieldName}"]`).closest('.form-group');
    formGroup.classList.remove('error');
}

function clearAllErrors() {
    document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
    });
}

function showFormStatus(message, isSuccess) {
    const statusElement = document.getElementById('form-status');
    statusElement.textContent = message;
    statusElement.className = 'form-status ' + (isSuccess ? 'success' : 'error');
    statusElement.style.display = 'block';
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

// ==================== ENVÍO DE FORMULARIO ====================
async function sendEmail(formData) {
    try {
        // Verificar que EmailJS esté configurado
        if (EMAILJS_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI') {
            throw new Error('EmailJS no está configurado. Por favor revisa la documentación.');
        }

        // Inicializar EmailJS
        emailjs.init(EMAILJS_CONFIG.publicKey);

        // Preparar los parámetros del template
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'ieeepes@uniandes.edu.co',
            cc_email_1: 'i.del@uniandes.edu.co',
            cc_email_2: 'la.aristizabalc1@uniandes.edu.co'
        };

        // Enviar email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        return { success: true, response };
    } catch (error) {
        console.error('Error al enviar email:', error);
        return { success: false, error };
    }
}

// ==================== MANEJO DEL FORMULARIO ====================
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Limpiar errores previos
    clearAllErrors();
    
    // Obtener datos del formulario
    const form = event.target;
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim()
    };
    
    // Validar formulario
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
        // Mostrar errores
        Object.keys(validation.errors).forEach(fieldName => {
            showFieldError(fieldName, validation.errors[fieldName]);
        });
        showFormStatus('Por favor corrige los errores en el formulario', false);
        return;
    }
    
    // Deshabilitar botón de envío
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Enviar formulario
    sendEmail(formData)
        .then(result => {
            if (result.success) {
                showFormStatus('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', true);
                form.reset();
            } else {
                showFormStatus('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o contáctanos directamente por correo.', false);
            }
        })
        .finally(() => {
            // Rehabilitar botón
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
}

// ==================== VALIDACIÓN EN TIEMPO REAL ====================
function setupRealtimeValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Validar campos al perder el foco
    ['name', 'email', 'phone', 'message'].forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => {
                const value = field.value.trim();
                if (value) {
                    const formData = { [fieldName]: value };
                    const validation = validateForm(formData);
                    
                    if (validation.errors[fieldName]) {
                        showFieldError(fieldName, validation.errors[fieldName]);
                    } else {
                        clearFieldError(fieldName);
                    }
                }
            });
            
            // Limpiar error al escribir
            field.addEventListener('input', () => {
                clearFieldError(fieldName);
            });
        }
    });
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        setupRealtimeValidation();
    }
});
