# IEEE PES Uniandes - Documentación del Sitio Web

## 📁 Estructura del Proyecto

```
PES/
├── index.html                    # Página principal
├── contacto.html                 # Formulario de contacto
├── proyectos/
│   ├── microformer.html         # Detalle de Microformer
│   └── kiosol.html              # Detalle de Kiosol
├── css/
│   └── styles.css               # Estilos centralizados
├── js/
│   ├── navigation.js            # Navegación y efectos
│   └── contact-form.js          # Validación y envío de formulario
└── IMG/
    ├── PES.png                  # Logo claro (para fondos oscuros)
    ├── PESNEGRO.jpg             # Logo oscuro (para fondos claros)
    └── CANDELARIA.png           # Banner de Candelaria
```

---

## 🚀 Configuración de EmailJS (IMPORTANTE)

El formulario de contacto requiere configuración de EmailJS para funcionar. Sigue estos pasos:

### Paso 1: Crear cuenta en EmailJS

1. Ve a https://www.emailjs.com/
2. Click en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

### Paso 2: Configurar servicio de email

1. Una vez dentro, ve a "Email Services"
2. Click en "Add New Service"
3. Selecciona tu proveedor de email (Gmail recomendado)
4. Sigue las instrucciones para conectar tu cuenta
5. **Guarda el SERVICE ID** (algo como: `service_abc123`)

### Paso 3: Crear template de email

1. Ve a "Email Templates"
2. Click en "Create New Template"
3. Configura el template con estos campos:

**Subject:**
```
Nuevo mensaje de contacto - {{from_name}}
```

**Content (HTML):**
```html
<h2>Nuevo mensaje de contacto desde IEEE PES Uniandes</h2>

<p><strong>Nombre:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Teléfono:</strong> {{phone}}</p>

<h3>Mensaje:</h3>
<p>{{message}}</p>

<hr>
<p><small>Este mensaje fue enviado desde el formulario de contacto del sitio web IEEE PES Uniandes</small></p>
```

**To Email:** 
```
ieeepes@uniandes.edu.co
```

**IMPORTANTE - Configurar envío a múltiples correos:**

En la sección "Settings" del template, agrega estos campos en "To":
```
ieeepes@uniandes.edu.co, i.del@uniandes.edu.co, la.aristizabalc1@uniandes.edu.co
```

O si no funciona, usa CC/BCC (puede requerir plan de pago).

4. **Guarda el TEMPLATE ID** (algo como: `template_xyz789`)

### Paso 4: Obtener Public Key

1. Ve a "Account" → "General"
2. Busca "Public Key"
3. **Copia tu Public Key** (algo como: `user_abcd1234efgh`)

### Paso 5: Configurar en el código

1. Abre el archivo `js/contact-form.js`
2. Busca estas líneas al inicio:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'TU_PUBLIC_KEY_AQUI',
    serviceId: 'TU_SERVICE_ID_AQUI',
    templateId: 'TU_TEMPLATE_ID_AQUI'
};
```

3. Reemplaza con tus valores:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'user_abcd1234efgh',      // Tu Public Key
    serviceId: 'service_abc123',          // Tu Service ID
    templateId: 'template_xyz789'         // Tu Template ID
};
```

4. Guarda el archivo

### Paso 6: Probar el formulario

1. Sube todos los archivos a GitHub
2. Visita `tu-sitio.github.io/PES/contacto.html`
3. Completa y envía el formulario de prueba
4. Verifica que los 3 correos reciban el mensaje

---

## 📝 Guía de Edición

### Editar contenido del index.html

Todos los contenidos editables están marcados con comentarios `<!-- EDITABLE: -->`:

```html
<!-- EDITABLE: Misión del capítulo -->
<p>Tu contenido aquí</p>
```

### Actualizar proyectos

**Para Microformer** (`proyectos/microformer.html`):
- Busca los comentarios `<!-- EDITABLE: -->`
- Actualiza textos, nombres del equipo, fechas, etc.
- Reemplaza `[Por definir]` con datos reales
- Agrega imágenes reemplazando los placeholders

**Para Kiosol** (`proyectos/kiosol.html`):
- Mismo proceso que Microformer

### Agregar imágenes

1. Guarda las imágenes en la carpeta `IMG/`
2. En el HTML, reemplaza:
```html
<div class="image-placeholder">
    [Descripción de la imagen]
</div>
```

Por:
```html
<img src="../IMG/nombre-imagen.jpg" alt="Descripción" style="width: 100%; border-radius: 12px; margin: 2rem 0;">
```

### Modificar colores o estilos

Edita `css/styles.css` en las variables al inicio:

```css
:root {
    --color-primary: #06a24e;      /* Verde principal */
    --color-secondary: #a1d891;    /* Verde secundario */
    --color-accent: #a5ff9c;       /* Verde acento */
    /* ... */
}
```

---

## 🌐 Despliegue en GitHub Pages

### Subir archivos

```bash
# En tu carpeta local PES/
git add .
git commit -m "Restructuración modular del sitio web"
git push origin main
```

### Activar GitHub Pages

1. Ve a Settings → Pages
2. Source: Deploy from a branch
3. Branch: main → / (root)
4. Save
5. Espera 1-2 minutos
6. Visita: `https://tu-usuario.github.io/PES/`

---

## ✅ Checklist de implementación

- [ ] Configurar cuenta de EmailJS
- [ ] Crear servicio de email en EmailJS
- [ ] Crear template de email con los 3 destinatarios
- [ ] Copiar Public Key, Service ID y Template ID
- [ ] Actualizar `js/contact-form.js` con las credenciales
- [ ] Subir todos los archivos a GitHub
- [ ] Activar GitHub Pages
- [ ] Probar formulario de contacto
- [ ] Verificar que los 3 correos reciban mensajes
- [ ] Actualizar contenido de proyectos (placeholders)
- [ ] Agregar imágenes reales de los proyectos

---

## 🐛 Solución de Problemas

### El formulario no envía emails

1. Verifica que las credenciales en `contact-form.js` sean correctas
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que EmailJS esté configurado con los 3 emails
4. Prueba enviando un email de prueba desde el dashboard de EmailJS

### Las páginas se ven sin estilos

1. Verifica que `css/styles.css` esté en la ubicación correcta
2. Verifica que las rutas en los `<link>` sean correctas
3. Si usas carpetas, ajusta las rutas relativas (`../css/styles.css`)

### Las imágenes no cargan

1. Verifica que estén en la carpeta `IMG/`
2. Verifica que los nombres coincidan exactamente (mayúsculas/minúsculas)
3. Revisa las rutas en el HTML (`IMG/nombre.jpg` vs `../IMG/nombre.jpg`)

---

## 📧 Contacto

Si tienes problemas con la configuración, contacta al equipo técnico de IEEE PES Uniandes.

---

**Última actualización:** Diciembre 2024
