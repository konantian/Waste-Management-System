# Waste-Management-System
### This repo used for refactoring the mini project 1 from CMPUT291 

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
       <ul>
         <li><a href="#local">Run locally</a></li>
         <li><a href="#remote">Try deployed version</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project
The original version of this project is from Ualberta CMPUT 291's mini project 1, the specificaiton of the original project is here [CMPUT 291 Mini Project 1](https://github.com/konantian/Waste-Management-System/wiki). In this project, we were asked to implement a waste management system with Python3 and sqlite3 to have a better understanding about how database works. Then I got inspired by [291 Project](https://github.com/PoopBear1/291Project) written by @PoopBear1, in his version, he developed a front end written with Vue and the backend written with flask. Also, I want to learn some new frameworks such as nextjs, prisma, and I decided to adopt my old code by applying these new techniques to it. In this refactoring project, I added the front end web page to provide better user experience to users. Compared to the original version, which is just a terminal UI, a web page UI is much easier to use and as well as more convenient. Also, there are two backends to choose  in this new project. One is written with flask and sqlite3 another is written with nextjs's builtin API with prisma and postgreSQL. There's a UI comparison between the old version and this refactoring version: [UI Comparison](https://github.com/konantian/Waste-Management-System/wiki/UI-Comparison)

## Getting Started
The following instructions will get you a copy of this project and you can run the project on your local machine.

### Prerequisites
You need to install the following software:

* Node

* npm

* Python

### Installation
> Install the package for frontend 

```shell
$ npm install 
```

> If you want to use flask's backend API

```shell
$ pip install -r requirements.txt
```

## Usage
### Local
> Run frontend 

```shell
$ npm run dev
```

> If you want to run flask's backend API

```shell
$ python app.py
```
Also, since the default backend is provided by nextjs' api, you need to change the localhost from localhost:3000 to localhost:5000.
Assign 
```javascript
let host =  "localhost:5000";
```
to this line : [https://github.com/konantian/Waste-Management-System/blob/main/waste-front/constants/api.js#L1](https://github.com/konantian/Waste-Management-System/blob/main/waste-front/constants/api.js#L1). The default value is "" because the nextjs
front end will use localhost:3000 by default.

### Remote
**Deployed demo by vercel platform** : [Waste Management System](https://waste-management-system.vercel.app/)


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Yuan Wang - wang17@ualberta.ca

Project Link: [https://github.com/konantian/Waste-Management-System](https://github.com/konantian/Waste-Management-System)

## Documentation

* Backend APIs: the documentation of our backend APIs are located at the [Wiki page](https://github.com/konantian/Waste-Management-System/wiki)

## Acknowledgements
* [React](https://reactjs.org/)
* [nextjs](https://nextjs.org/)
* [antd](https://ant.design/)
* [redux](https://react-redux.js.org/introduction/quick-start)
* [react-redux](https://react-redux.js.org/)
* [redux-persist](https://github.com/rt2zz/redux-persist)
* [redux-devtools-extensio](https://github.com/reduxjs/redux-devtools)
* [swr](https://github.com/vercel/swr)
* [axios](https://github.com/axios/axios)
* [prisma](https://www.prisma.io/nextjs)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
