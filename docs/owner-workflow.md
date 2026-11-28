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
6. Claude te devuelve el enlace de vista previa de tu propuesta, la versión exacta
   comprobada y el resultado.
7. El desarrollador recibe una mención en GitHub y revisa los cambios.

Cada propuesta tendrá su propia vista previa, también si sigue como borrador.
El enlace de versión identifica lo comprobado; el alias de la propuesta puede cambiar.
Staging será la web con cambios ya aceptados por el desarrollador. Producción solo
cambiará con una versión publicada y autorizada por él.

Las comprobaciones obligatorias son `Validate` y `preview/e2e`. La vista previa
se verifica en su URL de versión exacta, no en el enlace compartido de staging.
El circuito antiguo de staging por propuesta se retira con este cambio; staging
desde `main` solo se activa después de que el desarrollador lo fusione y verifique.
Consulta `docs/github-setup-status.md` para el estado real, no solo el preparado.
Publicar para revisión NO publica en producción ni autoriza a Claude a fusionar cambios.

## Protección de `main`

Nunca trabajes en `main`: cada tarea va en su propia sesión, worktree y rama.
`pnpm install` intenta activar los bloqueos locales. Cuando están activos, bloquean
`git commit` en `main`, las fusiones que crean un commit en `main` y los envíos
a la rama remota `main`.
Git todavía puede actualizar tu `main` local mediante un avance rápido
(`fast-forward`), por ejemplo al sincronizarlo con GitHub. También puede aplicar
commits en tu `main` local mediante `git cherry-pick`.
Si ves un mensaje que empieza por «BLOQUEADO», abre una sesión nueva para la tarea.
No desactives estos bloqueos. Las reglas de GitHub protegen la rama remota `main`.

## Si algo falla

Claude puede intentar reparar un error de código y repetir el proceso hasta dos
veces. Después explica el bloqueo y avisa al desarrollador; no elimina pruebas ni
pide permisos más amplios. Los errores de acceso o configuración los resuelve el
desarrollador.

Puedes seguir trabajando localmente aunque staging esté bloqueado. No interpretes
«funciona en mi ordenador» como «ya está publicado y verificado».
