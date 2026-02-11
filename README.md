# ToDo App
Application de gestion d'une TODO List.

## Technologies employées

Les technologies utilisées sur le projet sont les suivantes : 
- [TypeScript](https://www.typescriptlang.org/) / [React](https://react.dev/) pour le code de l'application;
- [Tailwind CSS](https://tailwindcss.com/) pour la gestion des feuilles de style


## Installation du projet en local
- Cloner le projet sur votre poste (au choix : par HTTPS, SSH, etc.)
- Ouvrir le projet dans un éditeur de code (ex.: Visual Studio Code)
Pour exécuter le projet : 
- Vérifier que vous avez [Node.js](https://nodejs.org/fr) et son gestionnaire de package [npm](https://www.npmjs.com/) d'installés sur votre poste. Le cas échéant, installez-les préalablement;
- Au sein du dossier du projet, ouvrez un terminal (ex.: Git Bash) et exécutez la commande suivante : 
```
npm install
```
Cette commande installe les dépendances nécessaires à l'exécution de l'application.
- Ensuite, pour exécuter le projet, lancez la commande suivante : 
```
npm run dev
```
Cette commande ouvre un serveur Web localement, exposant l'application sur le port 5173. Vous pouvez donc consulter le rendu au sein de votre navigateur avec l'URL suivante :  http://localhost:5173/

## Préparatioon à la mise en production
En vue de la mise en production, on devra d'abord compiler le projet avec la commande suivante : 
```
npm run build
```
Cette commande permet notamment d'exécuter la transpilation du TypeScript, de bundler et minifier le code. Le résultat de la compilation est stocké dans un dossier "dist". C'est ce dossier qu'on pourra déployer sur le sevreur d'hébergement souhaité.







```
