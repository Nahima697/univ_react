

# 🎓 Hippo University – Application d’Inscription Universitaire en React

## Table des matières
- [Installation](#installation)
- [Backend avec Docker](#-backend--docker)
- [Étapes de développement](#-étapes-de-développement)
- [Authentification](#-authentification--admin)
- [Évolutions possibles](#-évolutions-possibles)
- [Conclusion](#conclusion)


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

[React](https://reactjs.org) est une librairie JavaScript développée par Meta pour créer des interfaces utilisateur dynamiques. Elle est basée sur des composants réutilisables et un DOM virtuel(Dom en mémoire) pour de meilleures performances.

[Bun](https://bun.com) est un gestionnaire de paquet , un runtime et un bundler Javascript.

---

## 🚀 Installation rapide

### Frontend
```bash
bun install
bun dev
```

## 🐳 Backend & **[Docker](https://docs.docker.com/reference/cli/docker/)**

### Backend

L'Api que je consomme a été réalisée en  Symfony avec Api Platform et a été dockerisée. Il faut donc lancer les conteneurs en local et initialiser la BDD et l'alimenter de fixtures.

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
Ajout du champ description dans classroom → blocage car pas de persistance.

✅ Solution : ajout de volumes Docker pour sauvegarder la base.


## 🧱 Étapes de développement

### ⚡ Initialisation

- Création du projet frontend avec **[Bun](https://bun.com/guides/ecosystem/react)** (gestionnaire de paquets très rapide, alternative à npm/yarn).

### Creation des composants
- Utilisation de **[React Router](https://www.w3schools.com/react/react_router.asp)** pour les routes.
- Affichage des **classrooms** dans des cards. Doc sur les **[props](https://react.dev/learn/passing-props-to-a-component)**
    .Utilisation de useParam pour récupérer l'id dans le lien sur les cards pour fetch les datas de la classroom.
- Mise en place d’un **formulaire d’inscription basique** **[Form](https://react.dev/reference/react-dom/components/form)** d’un étudiant en React.

- Création de **CustomInput et de FormButton** **[CustomInput](https://medium.com/@amitsharma_24072/react-form-design-creating-custom-reusable-inputs-and-buttons-in-reactjs-c93e67ab2347)** 
- Refactorisation avec [React Hook Form](https://react-hook-form.com) pour la gestion des inputs, erreurs et validations.
- Création du composant classroomDetail.

#### Acces à l'environnement
Avec Bun il n'est pas possible d'accéder aux variables d'environnement contrairement à Next ou React avec un Bundler Vite par exemple. En effet, on ne peut pas faire un **process.env**.Bun lance l'application via son server dans index.tsx qui construit l'index.html qui va pointer vers frontend.tsx qui est l'application React. On n'a donc plus accès aux fonctionnalités server de Bun. Il faudrait créer un fichier server et faire du SSR pour accéder aux fonctionnalités de celui-ci dont l'accès à l'environnement.
Par conséquent, j'ai mis en place un fichier de config où je stocke l'url de l'API.

### 💡 Structuration du code

- Création de **services dédiés** (`/services`) pour centraliser les requêtes API (CRUD).
- Séparation des responsabilités : composants de formulaire, composants UI, boutons, champs custom
- Création de composants réutilisables : `FormButton`, `CustomInput`, `HandleError`...

### 🔐 Authentification & Admin

- Mise en place de l’interface d'administration avec **React-Admin** [ReactAdmin](https://marmelab.com/react-admin).
- Difficultés rencontrées avec **Bun** seul (problème de dépendances `memoryStore`).
- Solution : intégration de **Vite** pour supporter React-Admin correctement.

### 🛠️ Gestion des erreurs

- Gestion des erreurs API dans les services (`try/catch`).
- Mise en place d’un **`handleError()`** central pour gérer les erreurs critiques (503, etc.).
- Affichage de messages explicites à l'utilisateur (Refraiche en cas d'erreur 503, formulaire invalide…).


### Difficultés

- Ajout du champ `description` dans l'entité `Classroom` a causé un blocage au démarrage car la BDD n'était pas persistée en local.
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

### Difficultés rencontrés
Malgré de nombreuses tentatives de résolution:
    -creation d'un eventListener sur Symfony pour set le cookie celui-ci n'est pas stocké dans le navigateur. Par conséquent j'avais des erreurs 401 le token n'étant pas renvoyé dans les requêtes get de l'admin.
    -passage en https avec vite de l'url front

## Authentification en LocalStorage
Plus facile à gérer, il suffit de stocker le token à l'authentification dans un localstorage.


## 🔮 Roadmap
- [ ] Gestion des rôles et connexion étudiants
- [ ] Intégrer Material UI ou Tailwind
- [ ] Amélioration UX (loader, retry automatique en cas de 503)
- [ ] Dashboard admin enrichi + guards
- [ ] Tests front (Jest + React Testing Library)
- [ ] Tests backend (PHPUnit)

## Conclusion

Bon premier jet sur React, ce qui me faisait peur (manque de structure contrairement à un framework) est gérable si on s'impose une architecture en tentant de séparer la logique de service(fetch de donnée) et celle de view (interface). Bun est un gestionnaire de package très rapide mais il a montré quelques limites gestion de l'environnement compliqué en front et problème de  compatibilité des dépendances, un autre gestionnaire en complément commme Vite ou Webpack peut-être nécessaire.
J'ai voulu gérer le token directement au niveau du serveur pour voir une autre manière de faire avec les cookies HttpOnly, il faut que je creuse les conséquences en terme de sécurité et ce qu'il faut mettre en place en utilisant cette méthode. 