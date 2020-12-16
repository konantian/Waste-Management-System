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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project
The original version of this project is from Ualberta CMPUT 291's mini project 1, the specificaiton of the original project is here [CMPUT 291 Mini Project 1](https://github.com/konantian/Waste-Management-System/wiki). In this project, we were asked to implement a waste management system with Python3 and sqlite3 to have a better understanding about how database works. In this refactoring project, I added the front end web page to provide better user experience to users. Compared to the original version, which is just a terminal UI, a web page UI is much easier to use and as well as more convenient. Also, there are two back ends to support all API requests in this new project. One is written with flask API and another is written with nextjs's builtin API.

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
> Install the package for backend 

```shell
$ pip install -r requirements.txt
$ python manage.py migrate
```

## Usage
> Run frontend 

```shell
$ npm run dev
```
> Run backend 

```shell
$ python app.py
```

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
* [antd](https://ant.design/)
* [redux](https://react-redux.js.org/introduction/quick-start)
* [react-redux](https://react-redux.js.org/)
* [axios](https://github.com/axios/axios)
