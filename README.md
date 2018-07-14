# Go timer Easy --- 圍棋助理
##### It can be used as a voice timer for Go game. Designed for Go and made for professionalism.
Author: Vito

****

## Outline:
* [Build](#Build)
* [Features](#Features)
* [ToDoList](#ToDoList)
***
## Build:
### <download project>
```
git clone https://github.com/vitogitgit/GoTimerEasy.git
```
### <node modules install>
```
npm install
```
### <bundle js files>
```
npm run bundle-ios
```
### <open target .xcodeproj>
```
cd ios
```
```
open GoTimerEasy.xcodeproj
```
### <build project>
```
Xcode run project
```
***
## Features:

### <Go Timer Screen>
![image](https://github.com/vitogitgit/GoTimerEasy/blob/master/go-timer-screen.PNG)
***
### <Setting Screen>
![image](https://github.com/vitogitgit/GoTimerEasy/blob/master/setting-screen.PNG)
***

* Timer Component
    * Basic time
        * The basic time for both player at the start of the game.
        * As time decreases, it does not increase.
        * Start to countdown stage when reducing to zero.
        * `Generally set to 30 minutes.`
    * countdown stage
        * The time of each round will be filled in the next round. 
        * `Generally set to 30 seconds.`
    * number of countdown
        * Decrease one when the countdown is return to zero.
        * Game over when equal to zero.
        * `Generally set to 3 times.`
* Go Timer Screen
    * Touch Area
        * `Turn-based system`, whenever you click to change opponent round.
        * If it is not your round right now, you can trigger a `taunting event`.
    * Setting Buttons
        * `play`: Control game state start and pause.
        * `reset`: Reset the game and return to the initial state.
        * `setting`: Navigate to `Setting Screen`.
    * Video Player
        * Whenever you click touch area triggers a `click sound`.
        * On timer over triggers `referee sound`.
        * On taunting event triggers `noisy sound`.
* Setting Screen
    * Picker
        * You can use this component to `set game rules`.
        * There are three parameters, namely `basicTime`, `countdownTime`, `numberOfCountdown`.
    * checkbox
        * Switch to control taunting event.
    * Submit Button
        * Submit all settings and `navigate to Go Timer Screen`.
        * Set the rule parameters for `local storage`.
* Initial Screen
    * Initialize with `local storage`.
    * Use `default parameters` if there is no local storage.
    * Complete the settings to `navigate to Go Timer Screen`.
***
## ToDoList:
* task:
    * 整理 coding style，修改 constant 大寫英文到小寫
    * react-native-i18n 多語系，支援英文、中文，聲音 & 字符串
    * support ios 各個手機、平板
    * support Android
    * fabric
    * onesignal 獨立分支
    * README 文檔: Guideline、CodingStyle、CodeStructure
* Bugs:
