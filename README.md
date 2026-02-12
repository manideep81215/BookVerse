
```
LIBRARY-PROJECT
├─ library-backend
│  ├─ .idea
│  │  ├─ compiler.xml
│  │  ├─ encodings.xml
│  │  ├─ jarRepositories.xml
│  │  ├─ misc.xml
│  │  └─ workspace.xml
│  ├─ .mvn
│  │  └─ wrapper
│  │     └─ maven-wrapper.properties
│  ├─ HELP.md
│  ├─ mvnw
│  ├─ mvnw.cmd
│  ├─ pom.xml
│  ├─ src
│  │  ├─ main
│  │  │  ├─ java
│  │  │  │  └─ com
│  │  │  │     └─ lib
│  │  │  │        └─ library
│  │  │  │           ├─ Controller
│  │  │  │           │  ├─ BookController.java
│  │  │  │           │  ├─ BorrowController.java
│  │  │  │           │  └─ UserController.java
│  │  │  │           ├─ DTO
│  │  │  │           │  ├─ BorrowRequest.java
│  │  │  │           │  ├─ LoginRequest.java
│  │  │  │           │  └─ UpdateNameRequest.java
│  │  │  │           ├─ Entity
│  │  │  │           │  ├─ Book.java
│  │  │  │           │  ├─ Borrow.java
│  │  │  │           │  └─ User.java
│  │  │  │           ├─ LibraryApplication.java
│  │  │  │           ├─ PasswordGenerator.java
│  │  │  │           ├─ Repository
│  │  │  │           │  ├─ BookRepository.java
│  │  │  │           │  ├─ BorrowRepository.java
│  │  │  │           │  └─ UserRepository.java
│  │  │  │           └─ Service
│  │  │  │              ├─ BookService.java
│  │  │  │              ├─ BorrowService.java
│  │  │  │              └─ UserService.java
│  │  │  └─ resources
│  │  │     ├─ application.properties
│  │  │     ├─ static
│  │  │     └─ templates
│  │  └─ test
│  │     └─ java
│  │        └─ com
│  │           └─ lib
│  │              └─ library
│  │                 └─ LibraryApplicationTests.java
│  └─ target
│     ├─ classes
│     │  ├─ application.properties
│     │  └─ com
│     │     └─ lib
│     │        └─ library
│     │           ├─ Controller
│     │           │  ├─ BookController.class
│     │           │  ├─ BorrowController.class
│     │           │  └─ UserController.class
│     │           ├─ DTO
│     │           │  ├─ BorrowRequest.class
│     │           │  ├─ LoginRequest.class
│     │           │  └─ UpdateNameRequest.class
│     │           ├─ Entity
│     │           │  ├─ Book$BookBuilder.class
│     │           │  ├─ Book.class
│     │           │  ├─ Borrow$BorrowBuilder.class
│     │           │  ├─ Borrow.class
│     │           │  ├─ User$UserBuilder.class
│     │           │  └─ User.class
│     │           ├─ LibraryApplication.class
│     │           ├─ PasswordGenerator.class
│     │           ├─ Repository
│     │           │  ├─ BookRepository.class
│     │           │  ├─ BorrowRepository.class
│     │           │  └─ UserRepository.class
│     │           └─ Service
│     │              ├─ BookService.class
│     │              ├─ BorrowService.class
│     │              └─ UserService.class
│     ├─ generated-sources
│     │  └─ annotations
│     ├─ generated-test-sources
│     │  └─ test-annotations
│     ├─ maven-status
│     │  └─ maven-compiler-plugin
│     │     ├─ compile
│     │     │  └─ default-compile
│     │     │     ├─ createdFiles.lst
│     │     │     └─ inputFiles.lst
│     │     └─ testCompile
│     │        └─ default-testCompile
│     │           ├─ createdFiles.lst
│     │           └─ inputFiles.lst
│     └─ test-classes
│        └─ com
│           └─ lib
│              └─ library
│                 └─ LibraryApplicationTests.class
└─ library-frontend
   ├─ dist
   │  ├─ assets
   │  │  ├─ index-Cxrf0mD1.css
   │  │  └─ index-DlbbLPtr.js
   │  ├─ index.html
   │  └─ vite.svg
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ App.css
   │  ├─ App.jsx
   │  ├─ assets
   │  │  └─ react.svg
   │  ├─ components
   │  │  ├─ BookCard.jsx
   │  │  ├─ IssueCard.jsx
   │  │  ├─ LoadingSpinner.jsx
   │  │  ├─ Navbar.jsx
   │  │  ├─ ProtectedRoute.jsx
   │  │  └─ SearchBar.jsx
   │  ├─ context
   │  │  └─ AuthContext.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ AddBook.jsx
   │  │  ├─ AdminIssuedBooks.jsx
   │  │  ├─ AdminReturnedBooks.jsx
   │  │  ├─ BookDetails.jsx
   │  │  ├─ BookList.jsx
   │  │  ├─ Dashboard.jsx
   │  │  ├─ Login.jsx
   │  │  ├─ MyIssues.jsx
   │  │  ├─ Profile.jsx
   │  │  └─ Register.jsx
   │  └─ services
   │     └─ api.js
   └─ vite.config.js

```