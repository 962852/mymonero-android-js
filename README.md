# MyMonero JS Desktop & Cordova Apps

![Logo](https://raw.githubusercontent.com/mymonero/mymonero-app-js/master/docs/assets/icon_100.png "Logo")

### General Info

1. What's in This Repo?
2. What is MyMonero?
3. Features
4. Requirements
5. Downloads
6. Reporting Bugs & Making Feature Requests

### Contributing and Testing

1. Getting the Source Code
2. Repository Contents
3. Building for Production
4. Running in Development Mode
5. Contributing
6. MyMonero Core Contributors
7. License and Copyrights

## What's in This Repo?

This repository holds the source code, resources, and build scripts for the official [MyMonero](https://www.mymonero.com) downloadable desktop and Cordova-based mobile apps, which are built in Javascript.

## What is MyMonero?

MyMonero is a simple and featureful way to use the next-generation private digital currency called [Monero](http://www.getmonero.org). 

The MyMonero app lets you manage your Monero wallets, address book, and transactions by storing your information locally and keeping it encrypted. 

The main reasons people have used MyMonero is its high degree of convenience and featurefulness. 

To accomplish this convenience and other features of MyMonero, there's the privacy trade-off of sharing your private Monero "view key" with the MyMonero server, so that it can scan the network for your wallets' transactions on your behalf. 

But it's impossible for MyMonero to spend any of your funds or otherwise access your metadata, because your "private spend key" and "private wallet mnemonic/seed" are never sent to our server. 

So MyMonero is often described as a 'non-custodial' service. In fact, in the near future, even the above trade-off will be eliminated as we're presently working to open-source a version of the back-end, which anybody can run as their own server at home.

MyMonero is currently available 

* for desktop on Mac, Windows, and Linux; and
* for mobile on iOS and Android.

![Desktop Screenshot: Welcome to MyMonero! Let's get started.](https://raw.githubusercontent.com/mymonero/mymonero-app-js/master/docs/assets/ss_1.png "Welcome to MyMonero! Let's get started.")


## Features

* Multiple wallets at a time

* Contacts address book

* Deep OpenAlias integration (use domain or email instead of long Monero address)

* Creation of QR codes and messages to request Monero be sent to you

* Sending money to contacts, OpenAlias, or other Monero addresses (these may be input manually, or automatically by either dropping a request QR code on the Send screen or clicking a `monero:…` request URL on MacOS or Windows)

* Settings (for clearing data, managing preferences such as idle timeout, etc.)

* Strong (AES256) encryption to password protect all sensitive user data 

* Improved UX, including informative tooltips


## Requirements

The desktop app is built on [Electron](https://electron.atom.io) and can be packaged to run on modern versions of:

* MacOS (.app)
* Windows (installer .exe)
* Linux (.appimage)

The mobile apps are built on [Apache Cordova](https://cordova.apache.org) and can be packaged for iOS and Android. 

## Downloads

Download the latest version from our website at [mymonero.com/app](https://www.mymonero.com/app) or from the Releases tab. *(Coming soon)* 

Developers and pre-release testers who would like to use and work on the app can run it by obtaining the source and running one of the build commands below.

To get set up with the source code, please see **Getting the Source Code** below.


## Reporting Bugs & Making Feature Requests

If you would like to report an issue or share a feature request, please create a Github [Issue](https://github.com/mymonero/monero-app-js/issues) on this project.

If you're reporting a bug, be sure to include all information which we would need to reproduce the issue, such as the operating system and app version on which you saw the bug, and the steps you took, if you can tell. 

For customer support, you can also [contact](https://mymonero.com/support) us directly.


# Contributing & Testing


## Setting up Your Repository

### General

1. Clone or otherwise download this repository. Then, in your terminal, `cd` into the repo directory.

2. (To get the bleeding edge, and/or if you are going to make changes) Switch to the `develop` branch by executing `git checkout develop`.

3. Install all dependencies by executing `npm install`.

### Cordova

*If you are going to run the app under any of the Cordova / mobile platforms*

1. Install all Cordova development dependencies for iOS and Android. See [Cordova Installation Notes](./docs/CORDOVA_INSTALL.md) for details.

2. Run `bin/setup_repo_for_cordova`.
 

## Repository Contents
* Executable scripts for common tasks are located in `bin/`

* Local, application source code is located in `local_modules/`. This includes bundled/static third-party "Vendor" libraries such as [EmojiOne](http://emojione.com).

* After installation, non-bundled third-party modules (such as Electron) will be located in `node_modules/`.

* App package and build process info is located in `package.json`.

* Cordova build configuration and dependencies are located in `config.xml`, `cordova_res/`, et al. Cordova build intermediate assets and stages are also located in `plugins/`, `platforms/`, and `www/`.

* This readme is located at `README.md`, and the license is located at `LICENSE.txt`.

## Building for Production

Unless you are a MyMonero pre-release tester, you will not need to produce a production build of MyMonero, especially because you want to be using a verified build of MyMonero for daily usage. 

If you're testing a pre-release version of this app, you may want to build a production-ready version of the app rather than only running it in dev mode to verify its behavior in production mode.

See [Building the App for Production](./docs/PRODUCTION_BUILDS.md) for information.

## Running in Development Mode

### Desktop

*Does not require you to package, sign, and install the app, and will cause the Developer window to be shown. Certain features, such as URL opening under MacOS, require production build.*

`bin/start_dev_desktop`

### Cordova

#### iOS - Simulator

*Causes the Safari Web Inspector to be shown and attached to the Simulator app's WebView*

`bin/start_dev_cordova_ios_sim`

#### iOS - Device

*Requires you to specify your signing info, e.g. development team in the Xcode project*

`bin/start_dev_cordova_ios_device`

#### Android - Emulator

*Debugging is possible through Chrome; navigate to "chrome://inspect"*

`bin/start_dev_cordova_android_emu`

#### Android - Device

*Coming soon*


#### Browser

*Used for Cordova debug only - not distributed*

`bin/start_dev_cordova_browser`


## Contributing

Contributions by way of [pull request](https://help.github.com/articles/about-pull-requests/) are very welcome, and you will be credited in the release notes if your PR is merged.

If you would like to contribute, please scan the [technology notes](./docs/TECHNOLOGY.md) in order to find information on libraries used, the reasons behind various architectural choices, and how to write tests. 

Feel free to create a Github issue if you want to report bugs, discuss improvements, submit feature ideas, or ask development & QA-specific questions. 

For background on this project, see [Why We Built the Native Apps](./docs/WHY_NATIVE.md).

There is no specific code styleguide yet (with the exception of the preference of tab-indentation) but we ask that code contributions:

* are kept modular or well factored, either platform-agnostic or with platform specified (see [Technology Notes](./docs/TECHNOLOGY.md)),
* are written in a clear, understandable, [simple](https://www.infoq.com/presentations/Simple-Made-Easy), and maintainable manner, 
* employ best practices, and 
* are well tested and don't break anything, especially security.

You may also like to read the unofficial [Technology Roadmap](./docs/ROADMAP.md) to get a peek at what we're thinking about for the future.

There's also an icebox of ideas, features, improvements, known issues, and other todos waiting to be knocked out which are kept in the [Issues](https://github.com/mymonero/monero-app-js/issues) tracker.


## MyMonero Core Contributors

Contributors to each release are credited in release notes.

The MyMonero core contributors listed below either work full-time on MyMonero or have made ongoing and/or critical contributions.

* 🏂 [Paul Shapiro](https://github.com/paulshapiro) `endogenic` – Project maintainer; Lead client app developer; Partner

* 🦄 [Riccardo Spagni](https://github.com/fluffypony) `fluffyponyza` – Advisor; Partner; [Monero](http://www.getmonero.org) project core member

* 😎 [Lee Clagett](https://github.com/vtnerd) `vtnerd` – Lead back-end developer

* 🔥 [Matt D Smith](http://mds.is) `mds` – v1/MVP app designer

* 🍄 [luigi1111](https://github.com/luigi1111) `luigi1112` – Monero tech advisor; Built client-side RingCT support

* 🌠 Your name here?

## License and Copyrights

See `LICENSE.txt` for license.

All app source code and assets copyright © 2014-2017 by MyMonero. All rights reserved.
