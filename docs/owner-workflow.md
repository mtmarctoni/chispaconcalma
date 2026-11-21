# Trabajar en la web con Claude Desktop

## Antes de empezar

El desarrollador debe completar `docs/staging-setup.md` y comprobar el circuito
entero con tu cuenta. Hasta entonces hay una web local y una configuración preparada,
no un entorno compartido operativo.

Abre este repositorio en la sección **Code** de Claude Desktop. Claude debe leer
`CLAUDE.md` y trabajar en estos archivos, no crear un artifact aparte.
El desarrollador configura Node, pnpm, GitHub CLI y tu acceso una sola vez.
No necesitas claves de Cloudflare.

## Tu sesión habitual

1. Describe lo que quieres cambiar. Claude prepara una rama y abre la web local.
2. Revisa el resultado en ordenador y móvil. Puedes experimentar sin publicar.
3. Cuando quieras compartirlo, di **«publicar para revisión»**.
4. Claude comprueba la web, guarda los cambios y abre una propuesta en GitHub.
5. Espera a las comprobaciones y a las pruebas de la web publicada.
6. Claude te devuelve el enlace de staging, la propuesta y el resultado.
7. El desarrollador recibe una mención en GitHub y revisa los cambios.

La web de staging tiene un enlace fijo, pero muestra la última propuesta publicada.
La propuesta de GitHub identifica exactamente qué versión se ha comprobado.
Publicar aquí NO publica en producción ni autoriza a Claude a fusionar cambios.

## Si algo falla

Claude puede intentar reparar un error de código y repetir el proceso hasta dos
veces. Después explica el bloqueo y avisa al desarrollador; no elimina pruebas ni
pide permisos más amplios. Los errores de acceso o configuración los resuelve el
desarrollador.

Puedes seguir trabajando localmente aunque staging esté bloqueado. No interpretes
«funciona en mi ordenador» como «ya está publicado y verificado».
