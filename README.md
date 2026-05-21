# 🚖 UberITT

---

# 👨‍💻 Autores

**IVAN MENDOZA** - 
**FELIX GUADALUE** - 
**YAHIR ORTEGA** - 
**RODRIGO SOTELO** 

Proyecto académico — Ingeniería en Sistemas Computacionales.

---

## 📌 Descripción del Proyecto

UberITT es una aplicación web inspirada en plataformas de transporte como Uber. El sistema simula el flujo completo de un viaje, permitiendo al usuario seleccionar un origen y destino, calcular tarifas, elegir métodos de pago y visualizar el recorrido mediante mapas interactivos.

El proyecto fue desarrollado utilizando tecnologías web y aplicando distintos patrones de diseño para mejorar la organización, mantenimiento y escalabilidad del sistema.

---

# 🎯 Objetivo del Proyecto

Desarrollar una aplicación web interactiva que simule el funcionamiento básico de una plataforma de transporte, implementando patrones de diseño para mejorar la estructura y calidad del software.

---

# 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- Leaflet.js
- Arquitectura Modular

---

# Diagrama UML

<img width="1078" height="1600" alt="WhatsApp Image 2026-05-20 at 5 29 46 PM" src="https://github.com/user-attachments/assets/18335a0d-c2c5-47a4-a534-06f383b0d8af" />


# Diagrama de procesos

<img width="1600" height="385" alt="WhatsApp Image 2026-05-20 at 5 30 11 PM" src="https://github.com/user-attachments/assets/990cec6b-c532-4a23-ab9d-6c3207a9fe0b" />


---

# ⚙️ Funcionamiento del Programa

El sistema simula el proceso completo de solicitud de un viaje.

<img width="1907" height="912" alt="Screenshot 2026-05-06 200909" src="https://github.com/user-attachments/assets/ffd091f5-cdb0-44c2-a6b5-22ba2c4f5d61" />

## Flujo general

1. El usuario selecciona un punto de origen.
2. Selecciona un destino.
3. El sistema calcula la tarifa estimada.
4. El usuario elige el método de pago.
5. Se confirma el viaje.
6. El sistema busca un conductor disponible.
7. El conductor se dirige al usuario.
8. El viaje inicia.
9. El conductor se mueve hacia el destino.
10. El viaje finaliza y se procesa el pago.

---

# 📚 Patrones de Diseño Utilizados

| Patrón | ¿Para qué se utilizó? | Justificación | Compatibilidad con el proyecto |
|---|---|---|---|
| State | Controlar los estados del viaje dentro de la aplicación. | Permite separar la lógica de cada etapa del viaje y evita grandes bloques de condicionales. | Compatible porque el sistema funciona mediante distintas etapas consecutivas. |
| Strategy | Manejar distintos métodos de pago y cálculos de tarifa. | Permite cambiar algoritmos sin modificar la lógica principal del sistema. | Compatible porque la aplicación maneja diferentes tipos de pago y tarifas dinámicas. |
| Factory | Crear objetos como conductores, pagos y tipos de viaje. | Centraliza la creación de objetos y mejora la organización del código. | Compatible debido a que el sistema genera distintos objetos constantemente. |
| Observer | Actualizar automáticamente la interfaz cuando cambia el estado del viaje. | Permite que varios componentes reaccionen automáticamente a cambios del sistema. | Compatible porque la aplicación necesita reflejar cambios en tiempo real. |
| Command | Encapsular acciones del usuario como comandos ejecutables. | Facilita el control y validación de acciones. | Compatible porque el usuario interactúa constantemente con el sistema. |
| Adapter | Integrar la librería Leaflet para el manejo de mapas. | Reduce la dependencia directa con librerías externas. | Compatible porque el proyecto utiliza mapas interactivos y rutas. |

---

# 🔄 Compatibilidad Entre los Patrones

Todos los patrones utilizados trabajan en conjunto para mejorar el funcionamiento del sistema.

- **State** controla el flujo del viaje.
- **Observer** actualiza automáticamente la interfaz.
- **Strategy** gestiona pagos y tarifas.
- **Factory** crea los objetos del sistema.
- **Command** controla acciones del usuario.
- **Adapter** conecta el sistema con Leaflet y los mapas.

Gracias a esta combinación:

- El código es más limpio.
- El sistema es más modular.
- Es más sencillo agregar nuevas funciones.
- El mantenimiento es más fácil.

---

# 🗺️ Funcionalidades Principales

- Selección de origen y destino.
- Visualización de rutas en mapas.
- Simulación de conductores.
- Cálculo de tarifas.
- Métodos de pago.
- Control de estados del viaje.
- Actualización dinámica de la interfaz.

---

# ✅ Conclusión

En conclusión, este proyecto me ayudó a entender mejor cómo funcionan los patrones de diseño y cómo se pueden aplicar en una aplicación real. Gracias a los patrones utilizados, el código quedó más organizado, más fácil de entender y más sencillo de mantener.

Además, pude ver cómo cada patrón cumple una función importante dentro del sistema y cómo todos trabajan juntos para mejorar el funcionamiento de la aplicación. También aprendí la importancia de estructurar bien un proyecto para facilitar futuras mejoras o nuevas funciones.

Finalmente, considero que este proyecto fue una buena práctica para reforzar mis conocimientos de programación y comprender mejor el desarrollo de software utilizando buenas prácticas.
