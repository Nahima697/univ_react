# bun-react-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

# 🎓 Hippo University – Application d’Inscription Universitaire en React

## 🧰 Atelier choisi

Développement d’une application web de type portail universitaire permettant aux étudiants de s'inscrire à des classes et à un administrateur de gérer les données via une interface sécurisée.

## ⚙️ Outils utilisés

- **React** : Librairie JavaScript utilisée pour créer l'interface utilisateur.
- **React Hook Form** : Gestion des formulaires de manière performante et réactive.
- **React-Admin** : Framework d’admin pour React utilisé pour créer l’interface administrateur.
- **Symfony** : Backend API REST (avec API Platform).
- **LexikJWTAuthenticationBundle** : Pour l’authentification via JWT.
- **Docker** : Conteneurisation de l’application.
- **Bun** : Alternative rapide à npm/yarn, utilisé pour démarrer le projet frontend.
- **Vite** : Utilisé pour remplacer Bun lors de l’intégration de React-Admin.
- **PostgreSQL** : Base de données dans le conteneur et SQLLite en local

---

## 🚀 Présentation rapide de React

[React](https://reactjs.org/) est une librairie JavaScript développée par Meta pour créer des interfaces utilisateur dynamiques. Elle est basée sur des composants réutilisables et un DOM virtuel pour de meilleures performances.

---

## 🐳 Backend & Docker

### Démarrage
```bash
docker compose build --pull --no-cache
docker compose up --wait
docker exec -it hippo_univ_api-php-1 bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
docker compose down --remove-orphans
```

#### Difficultés rencontrées
Ajout du champ description dans Classroom → blocage car pas de persistance.

✅ Solution : ajout de volumes Docker pour sauvegarder la base.


## 🧱 Étapes de développement

### ⚡ Initialisation

- Création du projet frontend avec **[Bun](https://bun.sh)** (gestionnaire de paquets très rapide, alternative à npm/yarn).
- Mise en place d’un **formulaire d’inscription basique** d’un étudiant en React.
- Refactorisation avec **React Hook Form** pour la gestion des inputs, erreurs et validations.

### 💡 Structuration du code

- Création de **services dédiés** (`/services`) pour centraliser les requêtes API (CRUD).
- Séparation des responsabilités : composants de formulaire, composants UI, boutons, champs custom
- Création de composants réutilisables : `FormButton`, `CustomInput`, `HandleError`...

### 🔐 Authentification & Admin

- Mise en place de l’interface d'administration avec **React-Admin**.
- Difficultés rencontrées avec **Bun** seul (problème de dépendances `memoryStore`).
- Solution : intégration de **Vite** pour supporter React-Admin correctement.

### 🛠️ Gestion des erreurs

- Gestion des erreurs API dans les services (`try/catch`).
- Mise en place d’un **`handleError()`** central pour gérer les erreurs critiques (503, etc.).
- Affichage de messages explicites à l'utilisateur (Refraiche en cas d'erreur 503, formulaire invalide…).



- Difficulté rencontrée : ajout du champ `description` dans l'entité `Classroom` a causé un blocage au démarrage car la BDD n'était pas persisté en local.
- Résolu grâce à la **persistance des données en local** (`volumes` Docker).

---

## 🔁 Authentification JWT via Cookie

- L'API a une configuration pour les tokens avec `LexikJWTAuthenticationBundle`.
- J'avais décidé de stocker le  token dans un **cookie sécurisé HttpOnly** nommé `BEARER` et injecté par le serveur dans le header afin que le navigateur le stocke automatique dans ses cookies sans avoir à le gérer dans le front dans un localstorage ou avec un intercepteur. Le cookie
doit avoir les mentions :
  - `SameSite=None`
  - `Secure=true`
  - `HttpOnly=true`
- Gestion automatique de l’extraction du token via la config de Lexik sur Symfony :
  ```yaml
  token_extractors:
    cookie:
      enabled: true
      name: BEARER
  set_cookies:
    BEARER: ~

-Difficultés rencontrés
Malgré de nombreuses tentatives de résolution:
    -creation d'un eventListener sur Symfony pour set le cookie celui-ci n'est pas stocké dans le navigateur. Par conséquent j'avais des erreurs 401 le token n'étant pas renvoyé dans les requêtes get de l'admin.
    -passage en https avec vite de l'url front

## Authentification en LocalStorage
Plus facile à gérer, il suffit de stocker le token à l'authentification dans un localstorage.


## 🔁 Evolutions possibles

- Gestion des rôles, connexion des étudiants
-Interface : intégrer Material UI ou Tailwind pour un design plus moderne.

-Amélioration UX : loader, retry automatique en cas de 503.
-Amélioration du dashboard admin, guard sur la page admin

-Tests : intégration de tests front (Jest + React Testing Library) et API (PHPUnit).

## Conclusion

Bon premier jet sur React, ce qui me faisait peur (manque de structure contrairement à un framework) est gérable si on s'impose une architecture en tentant de séparer la logique de service(fetch de donnée) et celle de view (interface). Bun est un gestionnaire de package très rapide mais il a montré quelques limites gestion de l'environnement compliqué en front et problème de  compatibilité des dépendances, un autre gestionnaire en complément commme Vite ou Webpack peut-être nécessaire.
J'ai voulu gérer le token directement au niveau du serveur pour voir une autre manuère de faire avec les cookies HttpOnly, il faut que je creuse les conséquences en terme de sécurité et ce qu'il faut mettre en place en utilisant cette méthode. 