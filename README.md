# Simulación de App de Viajes Tipo Uber 🚖

## Integrantes 👥

- IVAN MENDOZA
- FELIX SANDOVAL
- RODRIGO SOTELO
- YAHIR ORTEGA

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de una aplicación web inspirada en plataformas de transporte como Uber, diseñada para simular el flujo completo de un viaje utilizando distintos patrones de diseño de software y arquitectura MVC.

La aplicación permite al usuario:

- Seleccionar un punto de origen y destino.
- Elegir el tipo de viaje.
- Visualizar rutas en un mapa interactivo.
- Consultar tarifas estimadas.
- Avanzar dinámicamente entre distintos estados del viaje.
- Simular el comportamiento completo del proceso de transporte.

El objetivo principal del proyecto es demostrar la implementación práctica de patrones de diseño y buenas prácticas de arquitectura de software en una aplicación interactiva.

<img width="1907" height="912" alt="Screenshot 2026-05-06 200909" src="https://github.com/user-attachments/assets/ffd091f5-cdb0-44c2-a6b5-22ba2c4f5d61" />

---

# Arquitectura Utilizada 🏗️

## MVC (Modelo - Vista - Controlador)

El proyecto fue desarrollado utilizando la arquitectura MVC para separar responsabilidades y mejorar la organización del código.

### Model (Modelo)

Se encarga de:

- Manejo de datos del viaje.
- Estado actual del sistema.
- Tarifas y rutas.
- Información del usuario.

### View (Vista)

Representa:

- Interfaz gráfica.
- Mapa interactivo.
- Panel lateral.
- Botones y tarjetas visuales.

### Controller (Controlador)

Gestiona:

- Eventos del usuario.
- Comunicación entre modelo y vista.
- Transiciones de estados.

---

# Patrones de Diseño Implementados 🎯

## 1. Singleton (Creacional)

Se utiliza para mantener una única instancia global encargada de controlar información importante del sistema.

### Aplicaciones dentro del proyecto

- Gestor principal del viaje.
- Configuración global.
- Administración del estado actual.

### Ventajas

- Evita múltiples instancias innecesarias.
- Facilita acceso global.
- Centraliza información importante.

---

## 2. Facade (Estructural)

Se implementa para simplificar la interacción entre múltiples módulos del sistema mediante una interfaz unificada.

### Funciones simplificadas

- Cálculo de tarifas.
- Actualización del mapa.
- Gestión de rutas.
- Cambio de estados.

### Ventajas

- Reduce complejidad.
- Facilita mantenimiento.
- Mejora la legibilidad del código.

---

## 3. State (Comportamiento)

El patrón principal del proyecto.

Permite cambiar dinámicamente el comportamiento del sistema dependiendo del estado actual del viaje.

### Estados implementados

- Esperando solicitud.
- Viaje solicitado.
- Buscando conductor.
- Conductor asignado.
- Conductor en camino.
- Viaje iniciado.
- Viaje finalizado.
- Viaje cancelado.

### Ventajas

- Evita grandes estructuras condicionales.
- Facilita agregar nuevos estados.
- Mejora escalabilidad y mantenimiento.

---

# Compatibilidad de los Patrones 🔗

Los patrones implementados trabajan de manera complementaria:

| Patrón | Función |
|---|---|
| MVC | Organización general del sistema |
| Singleton | Manejo de instancia global |
| Facade | Simplificación de procesos |
| State | Control dinámico del flujo del viaje |

La combinación de estos patrones permite construir un sistema modular, mantenible y escalable.

---

# Flujo General del Sistema 🔄

1. Usuario selecciona origen y destino.
2. Sistema calcula la ruta.
3. Se muestran tarifas disponibles.
4. Usuario selecciona tipo de viaje.
5. Se confirma la solicitud.
6. El sistema busca conductor.
7. El conductor acepta el viaje.
8. El viaje inicia.
9. El viaje finaliza o puede cancelarse.

---

# Tecnologías Utilizadas 💻

- HTML5
- CSS3
- JavaScript
- Leaflet.js
- OpenStreetMap

---

# Diagramas 📊

El proyecto incluye:

- Diagrama UML
- Diagrama de procesos
- Documentación técnica
- Justificación de patrones

---

# Capturas del Sistema 🖼️

## Pantalla Principal

- Selección de origen y destino.
- Visualización del mapa.
- Tarifas dinámicas.
- Flujo de estados.

> CAPTURAS

---

# Objetivo Académico 🎓

Demostrar la aplicación práctica de patrones de diseño y arquitectura de software mediante el desarrollo de un sistema interactivo capaz de manejar múltiples estados dinámicos de manera organizada y eficiente.

---

# Conclusión ✅

