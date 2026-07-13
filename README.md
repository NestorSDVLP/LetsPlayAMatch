# ⚽ Let's Play A Match

> **Organizar un partido debería tomar segundos, no cientos de mensajes de WhatsApp.**

Let's Play A Match (LPAM) es una aplicación web mobile-first creada para simplificar la organización de partidos deportivos entre entrenadores y jugadores.

El objetivo no es reemplazar WhatsApp, sino complementarlo.

WhatsApp sigue siendo el canal donde los grupos deportivos se comunican. LPAM se encarga de resolver el problema de organización: creación del partido, gestión de cupos, inscripción de jugadores y visualización del estado de convocatoria.

El entrenador crea un partido, comparte el enlace y los jugadores pueden inscribirse desde cualquier dispositivo sin necesidad de registrarse ni instalar una aplicación.

---

# 🚀 Problema que resuelve

En muchos grupos deportivos la organización sigue un proceso manual:

* Se publica una convocatoria en WhatsApp.
* Los jugadores responden en diferentes momentos.
* El entrenador cuenta confirmaciones manualmente.
* La lista de espera se administra con mensajes.
* Es difícil conocer rápidamente la disponibilidad real.

Let's Play A Match transforma ese proceso en un flujo simple:

**Crear → Compartir → Inscribirse → Organizar**

---

# ✨ Funcionalidades

## Gestión de entrenadores

* Autenticación mediante Firebase Authentication.
* Perfil de entrenador.
* Creación y administración de partidos.
* Acceso protegido mediante navegación autenticada.

---

## Gestión de partidos

* Creación de partidos deportivos.
* Edición de información.
* Configuración de:

  * Actividad deportiva.
  * Fecha y horario.
  * Ubicación.
  * Tipo de partido.
  * Nivel.
  * Cantidad máxima de jugadores.
  * PIN de acceso.

Persistencia completa mediante Cloud Firestore.

---

## Board público

Cada partido posee un Board accesible mediante URL compartida.

Los jugadores pueden visualizar:

* Información del partido.
* Fecha y horario.
* Ubicación.
* Datos deportivos.
* Estado actual de convocatoria.

El acceso puede validarse mediante PIN.

---

## Inscripciones

Los jugadores pueden registrarse sin crear una cuenta.

Características:

* Formulario público.
* Validaciones con VeeValidate + Yup.
* Registro automático en Firestore.
* Actualización reactiva del Board.

---

## Confirmados y lista de espera

La asignación de jugadores se determina automáticamente según el orden de inscripción.

Ejemplo:

```
Cupos disponibles: 10

Inscripciones:
1 - Juan
2 - Pedro
...
10 - Martín

Confirmados:
Juan → Martín

Lista de espera:
11 en adelante
```

No existen estados manuales.

El orden de creación de los registros define la posición dentro del partido.

---

# 🏗 Arquitectura

El proyecto utiliza una arquitectura **Feature First**.

```
src/

features/

    auth/
        components/
        services/
        stores/

    matches/
        components/
        models/
        schemas/
        services/
        stores/
        views/

    trainers/
        components/
        services/
        stores/
        views/

shared/

    services/
    utils/
    components/
```

Cada feature encapsula:

* Componentes.
* Estado global.
* Servicios.
* Modelos.
* Validaciones.
* Vistas.

Esta estructura reduce el acoplamiento y facilita la evolución del proyecto.

---

# 🧠 Modelo de datos

LPAM evita introducir complejidad innecesaria en su primera versión.

Actualmente no existe una entidad Player.

Los jugadores representan inscripciones dentro de un partido mediante:

```
matchPlayers
```

Cada registro mantiene la relación con:

```
matchId
```

La identidad del jugador continúa perteneciendo al contexto del grupo deportivo.

Esta decisión permite mantener un flujo simple:

* Sin creación de cuentas.
* Sin perfiles adicionales.
* Sin gestión de usuarios innecesaria.

---

# 🔐 Seguridad

La aplicación utiliza Firebase Security Rules para separar responsabilidades:

## Trainer

* Usuario autenticado.
* Administración de partidos propios.
* Gestión de información privada.

## Guest / Player

* Acceso público al Board.
* Inscripción al partido.
* Sin usuario persistente.

---

# ⚙ Tecnologías utilizadas

## Front-End

* Vue 3
* Composition API
* Pinia
* Vue Router
* Vite

## Backend / Servicios

* Firebase Authentication
* Cloud Firestore

## UI

* Bootstrap 5
* Bootstrap Icons
* SweetAlert2

## Formularios y validaciones

* VeeValidate
* Yup
* Maska

---

# 📱 Mobile First

LPAM fue diseñado pensando principalmente en el uso desde dispositivos móviles.

El escenario principal:

1. El entrenador crea un partido.
2. Comparte el enlace por WhatsApp.
3. Los jugadores ingresan desde su teléfono.
4. Se registran en segundos.

Sin instalación.

Sin registro.

Sin fricción.

---

# 📌 Estado actual

## Implementado

✅ Autenticación de entrenadores
✅ Gestión de perfil de entrenador
✅ Creación y edición de partidos
✅ Board público
✅ Acceso mediante PIN
✅ Inscripciones públicas
✅ Confirmados automáticos
✅ Lista de espera automática
✅ Validaciones de formularios
✅ Persistencia Firestore
✅ Arquitectura Feature First
✅ Diseño responsive Mobile First

---

# 🔮 Próximas mejoras

Algunas mejoras futuras consideradas:

* Gestión avanzada de asistencia.
* Historial de partidos.
* Estadísticas básicas.
* Mejoras de experiencia para entrenadores.
* Notificaciones.
* Evolución del modelo de usuarios según necesidades reales.

La prioridad continuará siendo mantener una herramienta simple, enfocada y fácil de usar.

---

# 📚 Conceptos aplicados

Durante el desarrollo se trabajaron conceptos como:

* Arquitectura Feature First.
* Vue 3 Composition API.
* Gestión de estado con Pinia.
* Separación Store → Service → Firestore.
* Modelado NoSQL.
* Firebase Authentication.
* Firestore Security Rules.
* Formularios reactivos.
* Validaciones reutilizables.
* Diseño Mobile First.
* Componentización.
* UX orientada a producto.

---

# 🤝 Autor

Desarrollado por **Néstor S.** como proyecto personal de portfolio.

Let's Play A Match representa una forma de construir software orientado a resolver problemas reales mediante soluciones simples, mantenibles y escalables.

El objetivo no es agregar funcionalidades por cantidad, sino construir la herramienta adecuada para el problema adecuado.
