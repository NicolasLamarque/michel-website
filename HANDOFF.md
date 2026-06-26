# Passation à Michel — guide étape par étape

Ce document explique comment faire en sorte que **Michel devienne propriétaire** de son site (code, hébergement, domaine), tout en te gardant comme collaborateur pour la maintenance.

Idée générale : aujourd'hui tout est sous tes comptes (GitHub, futur Cloudflare). À la fin de cette passation, Michel possède ses comptes et ses clés ; toi tu gardes un accès collaborateur pour intervenir.

---

## 1. Comptes que Michel doit créer (avec sa propre adresse courriel)

Demande-lui de créer, avec **son** courriel (pas le tien) :

1. **GitHub** — gratuit. https://github.com/signup
2. **Cloudflare** — gratuit. https://dash.cloudflare.com/sign-up
3. **Resend** (plus tard, quand il voudra les courriels automatiques) — gratuit jusqu'à un certain volume. https://resend.com/signup
4. **Un domaine** (ex: michelconstruction.ca) — si pas déjà acheté, il peut l'acheter directement dans Cloudflare Registrar ou ailleurs (Namecheap, GoDaddy) et le pointer vers Cloudflare ensuite.

Tu n'as pas besoin de connaître ses mots de passe. Demande-lui juste de te donner son **nom d'utilisateur GitHub** et de t'inviter comme collaborateur (étape 2).

---

## 2. Transférer le repo GitHub à Michel

Une fois qu'il a son compte GitHub :

1. Sur https://github.com/Nicolaslamarque/michel-website → **Settings** → tout en bas → **Transfer ownership**.
2. Entre son nom d'utilisateur GitHub comme nouveau propriétaire.
3. Il reçoit un courriel, doit accepter le transfert.
4. Une fois accepté, le repo devient `github.com/<son-nom>/michel-website`.
5. Il va dans **Settings → Collaborators** de son nouveau repo et t'ajoute (avec ton propre compte GitHub) comme collaborateur — tu gardes ainsi un accès pour push/maintenir.
6. Sur ta machine, mets à jour l'URL du remote :
   ```
   git remote set-url origin https://github.com/<son-nom>/michel-website.git
   ```

---

## 3. Déployer sur le Cloudflare de Michel

Une fois qu'il a son compte Cloudflare :

1. Il se connecte sur https://dash.cloudflare.com → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Il autorise Cloudflare à accéder à son GitHub et sélectionne le repo `michel-website`.
3. Paramètres de build :
   - Build command : `npm run build`
   - Output directory : `dist`
4. Il clique **Save and Deploy**. Le site est en ligne sur une URL `*.pages.dev`.

À partir de là, **chaque `git push` sur la branche main redéploiera automatiquement** — Michel n'a plus rien à faire manuellement.

---

## 4. Créer la base D1 (pour le mini CMS des messages)

C'est la partie technique — tu peux la faire toi-même une fois que Michel t'a donné accès à son compte Cloudflare (en t'invitant comme membre, voir étape 6), ou en te connectant temporairement avec `wrangler` sous son compte.

```bash
npx wrangler login
npx wrangler d1 create michel-vite-messages
```

Ça retourne un `database_id`. Mets-le dans [wrangler.toml](wrangler.toml) à la place de `REMPLACER_PAR_ID_D1`, commit et push.

Puis applique le schéma sur la base en production :

```bash
npx wrangler d1 execute michel-vite-messages --file=functions/schema.sql --remote
```

Enfin, dans le dashboard Cloudflare Pages → ton projet → **Settings → Functions → D1 database bindings**, ajoute :
- Variable name : `DB`
- D1 database : `michel-vite-messages`

---

## 5. Variables d'environnement à configurer

Dans le dashboard Cloudflare Pages → projet → **Settings → Environment variables** (en Production) :

| Variable | Valeur | Quand |
|---|---|---|
| `ADMIN_PASSWORD` | mot de passe choisi par Michel pour `/admin` | Maintenant |
| `ADMIN_SESSION_SECRET` | une chaîne aléatoire longue (ex: générée avec `openssl rand -hex 32`) | Maintenant |
| `RESEND_API_KEY` | clé API depuis son compte Resend | Plus tard |
| `RESEND_FROM` | ex: `Michel Construction <contact@michelconstruction.ca>` | Plus tard, nécessite domaine vérifié dans Resend |
| `CONTACT_EMAIL` | courriel de Michel où il reçoit les notifications | Plus tard |

Important : marque `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET` comme **Encrypted** dans Cloudflare (case à cocher au moment de l'ajout).

---

## 6. Brancher le domaine

Dans le projet Pages de Michel → **Custom domains** → ajoute son domaine. Si le domaine est déjà sur Cloudflare (DNS géré là), c'est automatique. Sinon, Cloudflare donne les enregistrements DNS à ajouter chez son registrar actuel.

---

## 7. Accès continu pour toi (sans qu'il partage son mot de passe)

Cloudflare permet d'inviter des membres sans partager le compte :

Dashboard Cloudflare de Michel → en haut à droite, icône compte → **Manage Account → Members → Invite Member** → ton courriel, rôle **Administrator** (ou un rôle plus restreint si Cloudflare le propose pour Pages/D1 seulement).

Tu reçois une invitation et accèdes à son compte avec ton propre login, sans connaître son mot de passe.

---

## 8. Ce que Michel doit savoir, en langage simple

À lui expliquer ou à lui remettre par écrit :

- **Son site** : `https://<son-domaine>` — change automatiquement quand toi (ou lui, plus tard) modifiez le code sur GitHub.
- **Sa boîte de messages** : `https://<son-domaine>/admin` — protégée par le mot de passe que vous aurez choisi ensemble. Il y voit les demandes de contact, peut les marquer "lu"/"traité", ou les supprimer.
- **S'il perd son mot de passe admin** : il faut changer la variable `ADMIN_PASSWORD` dans Cloudflare Pages (toi ou lui peut le faire dans Settings → Environment variables).
- **S'il veut des courriels automatiques** : créer un compte Resend, vérifier son domaine là-bas, puis remplir les 3 variables `RESEND_*` ci-dessus.

---

## Checklist rapide

- [ ] Michel crée GitHub, Cloudflare (et Resend plus tard)
- [ ] Transfert du repo GitHub vers son compte, toi ajouté comme collaborateur
- [ ] Mise à jour de `git remote` en local
- [ ] Connexion du repo à Cloudflare Pages (sous son compte)
- [ ] Création de la base D1 + binding `DB`
- [ ] Variables `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` configurées
- [ ] Domaine personnalisé branché
- [ ] Toi invité comme membre Cloudflare pour maintenance
- [ ] (Plus tard) Resend configuré
