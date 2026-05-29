# 🚖 UberITT

Simulación interactiva de una aplicación de transporte tipo Uber desarrollada con JavaScript, HTML y CSS aplicando Arquitectura MVC y múltiples Patrones de Diseño.

---

# 📌 Descripción del Proyecto

UberITT es una simulación web inspirada en aplicaciones de transporte como Uber. El sistema permite al usuario:

* Iniciar sesión.
* Seleccionar origen y destino.
* Visualizar rutas en mapa.
* Calcular distancia y tiempo estimado.
* Elegir diferentes tipos de servicio.
* Simular asignación de conductores.
* Simular métodos de pago.
* Visualizar cambios de estado del viaje en tiempo real.

El proyecto fue desarrollado utilizando JavaScript modular, Leaflet para mapas interactivos y una arquitectura MVC complementada con patrones de diseño.

---

# 🏗️ Arquitectura MVC

El proyecto utiliza el patrón arquitectónico MVC (Model - View - Controller) para separar responsabilidades y mejorar la organización del sistema.

## 🔹 Model

Se encarga de manejar los datos y estados del sistema.

Ejemplos:

* ride-model.js
* payment-model.js
* state-model.js

---

## 🔹 View

Controla toda la interfaz visual del sistema.

Ejemplos:

* fare-view.js
* map-view.js
* payment-view.js
* state-view.js

---

## 🔹 Controller

Coordina la lógica y comunicación entre modelos y vistas.

Ejemplos:

* ride-controller.js
* payment-controller.js
* map-controller.js

---

# 🎯 Patrones de Diseño Implementados

| Categoría      | Patrón   | Función                                            |
| -------------- | -------- | -------------------------------------------------- |
| Creacional     | Factory  | Crea objetos como conductores y tipos de servicio. |
| Estructural    | Adapter  | Integra Leaflet con la lógica interna del sistema. |
| Comportamiento | State    | Controla las diferentes etapas del viaje.          |
| Comportamiento | Strategy | Maneja distintos cálculos de tarifas y pagos.      |
| Comportamiento | Observer | Actualiza automáticamente la interfaz.             |
| Comportamiento | Command  | Encapsula acciones del usuario.                    |

---

# ⚙️ Funcionalidades Principales

* Inicio de sesión interactivo.
* Selección de puntos en mapa.
* Visualización de rutas.
* Cálculo de tarifas dinámicas.
* Selección de servicios:

  * UberX
  * Comfort
  * UberXL
  * Uber Lux
* Asignación automática de conductores.
* Simulación de métodos de pago.
* Estados dinámicos del viaje.
* Interfaz responsive y moderna.

---

# 🚗 Tipos de Viaje

| Servicio | Descripción                 |
| -------- | --------------------------- |
| UberX    | Servicio económico estándar |
| Comfort  | Viaje con mayor comodidad   |
| UberXL   | Vehículos más amplios       |
| Uber Lux | Servicio premium de lujo    |

---

# 🧠 Explicación Breve de los Patrones

## 🔹 Strategy

Permite utilizar diferentes algoritmos para calcular tarifas dependiendo del tipo de servicio seleccionado.

---

## 🔹 Observer

Actualiza automáticamente la interfaz cuando cambia el estado del viaje.

---

## 🔹 State

Controla las transiciones entre estados del viaje como:

* buscando conductor
* conductor asignado
* viaje en curso
* viaje finalizado

---

## 🔹 Factory

Centraliza la creación de objetos dentro del sistema.

---

## 🔹 Adapter

Permite integrar librerías externas como Leaflet.

---

## 🔹 Command

Organiza acciones del usuario como comandos independientes.

---

# 🛠️ Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript ES6
* Leaflet.js

---

# 📚 Conclusión

Este proyecto permitió aplicar de forma práctica diferentes patrones de diseño junto con la arquitectura MVC para desarrollar una aplicación más organizada, modular y escalable. Cada patrón cumple una función específica dentro del sistema y ayuda a mejorar la estructura del código, facilitando futuras mejoras y mantenimiento del proyecto.


