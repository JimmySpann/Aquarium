# Aquarium

## Background
Ever created a todo list, goal chart, list of values, habit tracker; hoping to level-up your life then fail to consistently look at them again? Maybe it was due to boredom, distractions, lack of motivation, lack of focus. Yet games and social media are easy to focus on. Easy to become addicted to. I built this as initial leg work towards a greater goal of recapturing my attention from outside sources that offer me no real value, and determining it goes to things that will better myself and the world around me.

![til](./img/aquarium-demo.gif)

## Usage
This tool, Aquarium,  uses fish to represent something you want to track (like a task, goal's progress, habit, daily values, etc). Aquarium is currently far from finished but is shared to help spread knowledge and inspire new creations. Aquarium is designed for the [obsidian](https://obsidian.md/) note-taking app, using the [datacore](https://github.com/blacksmithgu/datacore) plugin, though it can be easily reworked into a regular vanilla js website.  

## Installation
To install Aquarium:
1. Ensure you have [obsidian](https://obsidian.md/) installed along with the [datacore](https://github.com/blacksmithgu/datacore) plugin
2. Download the zip file (Click code button -> download zip)
3. Create a folder named "scripts" in your vault and a "aquarium" folder within it
4. Extract the file contents of "aquarium.zip" into the `scripts/aquarium/` directory
5. Place the following code in the obsidian note you wish to have the Aquarium:
~~~
```datacorejsx
	return dc.require("scripts/aquarium/aquarium-view.jsx")
```
~~~
6. Enjoy!

## Other Notes
- This code is fully open source. Use however you see fit. Credit is nice but not necessary.
- I will likely update this into something fully usable once time is found. Got big ideas and see this as a stepping stone.
- Code contributions are encouraged and greatly appreciated.
- Code critique is also encouraged. There's always a more to learn and a better way of doing things. I appreciate those who help me find them.
