# ⚽ Let's Play A Match

> **Organizar un partido debería tomar segundos, no cientos de mensajes de WhatsApp.**

Let's Play A Match es una aplicación web desarrollada para simplificar la organización de partidos deportivos entre entrenadores y jugadores.

La propuesta no busca reemplazar WhatsApp ni transformar la dinámica habitual de los grupos deportivos. Al contrario: nace para complementarla, resolviendo uno de los problemas más frecuentes durante la organización de un partido.

El entrenador crea un partido, comparte un enlace y los jugadores simplemente ingresan al Board para inscribirse.

Sin registros.

Sin descargar aplicaciones.

Sin aprender una herramienta nueva.

---

# 🚀 ¿Por qué existe este proyecto?

En la mayoría de los grupos deportivos la organización sigue un mismo patrón:

* Se publica un mensaje en WhatsApp.
* Cada jugador responde cuando puede.
* Los confirmados se cuentan manualmente.
* La lista de espera se mantiene escribiendo mensajes.
* Es difícil saber rápidamente quién juega y quién espera.

Let's Play A Match automatiza todo ese proceso sin modificar el flujo de trabajo que los entrenadores ya utilizan diariamente.

WhatsApp continúa siendo el canal de comunicación.

Let's Play A Match se convierte en la herramienta que organiza la inscripción.

---

# ✨ Funcionalidades implementadas

### Gestión de partidos

* Creación de partidos
* Edición de información
* Persistencia en Firebase Firestore

### Board público

* Acceso mediante URL pública
* Información completa del partido
* Fecha, horario y ubicación
* Cupos mínimos y máximos
* Información deportiva

### Inscripciones

* Formulario público
* Validaciones con Vee Validate + Yup
* Registro automático en Firestore
* Reset del formulario luego de una inscripción exitosa
* Mensajes de éxito y error mediante SweetAlert2

### Gestión automática de participantes

Las listas se generan automáticamente a partir del orden de inscripción.

Los primeros jugadores ocupan los cupos disponibles.

Una vez alcanzado el límite de participantes, las siguientes inscripciones pasan automáticamente a la Lista de Espera.

No existen procesos manuales.

No existen estados duplicados.

El propio orden de los documentos determina el estado de cada participante.

### Experiencia de usuario

* Actualización reactiva del Board
* Loading States
* Navegación protegida
* Scroll automático
* Manejo de errores
* Responsive Design

---

# 🏗 Arquitectura

El proyecto utiliza una arquitectura **Feature First**, donde cada módulo encapsula completamente su funcionalidad.

```
features/

    matches/
        components/
        models/
        schemas/
        services/
        stores/
        validations/
        views/

    trainers/
    auth/
    home/
```

Cada Feature mantiene aislados sus:

* Componentes
* Estado (Pinia)
* Servicios
* Modelos
* Validaciones
* Vistas

Esta organización facilita el mantenimiento, reduce el acoplamiento y permite escalar la aplicación sin convertir el proyecto en un conjunto de carpetas compartidas.

---

# 🧠 Decisiones de arquitectura

Uno de los objetivos principales de la V1 fue mantener el proyecto lo más simple posible.

Por esa razón **no existe una entidad Player**.

Cada inscripción genera únicamente un documento dentro de la colección:

```
matchPlayers
```

relacionado mediante:

```
matchPlayerMatchId
```

La identidad del jugador continúa existiendo dentro del grupo de WhatsApp.

Esto evita introducir autenticación, perfiles, permisos y sincronizaciones innecesarias durante la primera versión del producto.

La complejidad se incorpora únicamente cuando realmente agrega valor.

---

# ⚙ Tecnologías utilizadas

## Front-End

* Vue 3
* Composition API
* Pinia
* Vue Router

## Backend

* Firebase Authentication
* Cloud Firestore

## UI

* Bootstrap 5
* Bootstrap Icons
* SweetAlert2

## Validaciones

* Vee Validate
* Yup

---

# 📱 Mobile First

Aunque gran parte del desarrollo fue realizado desde escritorio, la interfaz fue diseñada pensando primero en dispositivos móviles.

El objetivo es que cualquier entrenador pueda compartir el enlace del partido por WhatsApp y que los jugadores puedan inscribirse desde su teléfono en pocos segundos.

Sin instalación.

Sin registro.

Sin fricción.

---

# 📌 Estado actual

## Implementado

* ✅ Creación de partidos
* ✅ Visualización pública
* ✅ Persistencia en Firestore
* ✅ Inscripción pública
* ✅ Confirmados automáticos
* ✅ Lista de Espera automática
* ✅ Actualización reactiva
* ✅ Validaciones
* ✅ Arquitectura Feature First

## En desarrollo

* Edición de partidos
* Eliminación de partidos
* Acceso mediante PIN
* Fecha de última actualización dinámica
* Mejoras de UX
* Optimización visual

---

# 🔮 Roadmap

## V1

Finalizar la experiencia completa de organización de partidos.

## V2

Evaluar funcionalidades adicionales según el uso real del sistema.

Entre las ideas consideradas:

* Gestión de asistencia
* Confirmación de presencia
* Notificaciones
* Mejoras para entrenadores
* Estadísticas básicas
* Nuevas herramientas de organización

La prioridad continuará siendo mantener una aplicación simple y enfocada en resolver problemas concretos.

---

# 📚 Aprendizajes aplicados

Durante el desarrollo se trabajó sobre conceptos como:

* Arquitectura Feature First
* Separación de responsabilidades
* Composition API
* Gestión de estado con Pinia
* Modelado de datos en Firestore
* Formularios reactivos
* Validaciones reutilizables
* Componentización
* Flujo Store → Service → Firestore
* Re-renderizado reactivo
* Diseño Mobile First

---

# 🤝 Autor

Desarrollado por **Néstor S** como proyecto personal de aprendizaje y portfolio.

Let's Play A Match representa una forma de construir software orientada a resolver problemas reales mediante soluciones simples, escalables y mantenibles.

El objetivo nunca fue desarrollar la aplicación con mayor cantidad de funcionalidades, sino construir la herramienta correcta para el problema correcto.
