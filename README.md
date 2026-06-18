# 🏡 Quincho La Javiera

Aplicación web para la consulta y gestión de disponibilidad de fechas del Quincho La Javiera.

Permite a los clientes visualizar fechas disponibles y consultar información del establecimiento mediante una interfaz web simple y accesible.

Instagram: @quincho_lajaviera

---

## 🚀 Tecnologías Utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Google Apps Script

### Persistencia
- Google Sheets

### Comunicación
- HTTP
- JSON

---

## 🏛️ Arquitectura

El sistema utiliza una arquitectura cliente-servidor ligera basada en servicios de Google.

El frontend desarrollado con HTML, CSS y JavaScript consume una API REST implementada mediante Google Apps Script. La API obtiene los datos desde Google Sheets, que funciona como mecanismo de persistencia.

El administrador gestiona la disponibilidad y la información del sistema directamente desde la hoja de cálculo.

### Diagrama de Arquitectura

![Arquitectura del Sistema](docs/arquitectura.png)

---

## 🔄 Flujo de Funcionamiento

1. El cliente accede a la aplicación web.
2. El frontend realiza una solicitud HTTP a la API.
3. Google Apps Script procesa la solicitud.
4. La API consulta los datos almacenados en Google Sheets.
5. La información es devuelta en formato JSON.
6. El frontend muestra los datos al usuario.
7. El administrador puede actualizar la información directamente desde Google Sheets.

---

## 📂 Estructura del Proyecto

```text
QuinchoLaJaviera/
│
├── css/
├── js/
├── assets/
├── docs/
│   └── arquitectura.png
│
├── index.html
└── README.md
```

---

## 📡 API

La aplicación consume una API REST desarrollada con Google Apps Script.

### Respuesta de ejemplo

```json
{
  "dates": [
    "2025-12-20",
    "2025-12-24",
    "2026-03-26"
  ]
}
```

---

## 💾 Persistencia de Datos

La información de disponibilidad se almacena en Google Sheets.

Google Apps Script actúa como capa de acceso a datos, obteniendo la información de la hoja de cálculo y exponiéndola mediante una API REST.

---

## 👨‍💻 Autor

Máximo Bastián

Proyecto desarrollado como solución web para la gestión de disponibilidad del Quincho La Javiera.
