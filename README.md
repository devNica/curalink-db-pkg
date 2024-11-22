# curalink-db-pkg

   ```description
   This repository is used to manage, define and update the database models of the curalink application and centralize all management regarding them, so as to minimize the errors that usually occur when the model code is duplicated in all microservices, which may have obsolete versions with respect to others
```

# About the package
```about
A github package has been generated, which can be installed in any of the microservices of the curalink application.

https://github.com/users/devNica/packages/npm/package/curalink-dbmodels-pkg
```

# API
```core
curalinkCore
```
| Class | Method | Description |
| :--- | :--- | :--- |
| `DatabaseOrchestrator` | `newOrchestrator` | creates an instance of the database model orchestrator. |
| `DatabaseOrchestrator` | `initialize` | initialize the connection to a database with optional migration of models. |
| `DatabaseOrchestrator` | `migrations` | performs seed migration by model segmentation (in development). |

# Licence & Disclaimer
```license
curalink is a registered trademark, however the application code has been shared under the MIT free software license.
```

# About the Autor
```license
The code of this repository and other applications of the curalink brand are entirely and completely property of: A. Alejandro G. Sanchez.
```