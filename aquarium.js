const Animation = await dc.require('scripts/aquarium/animation.js');

/**
   * Class representing a fish within a tank.
   */
class Fish {
  /**
   * Create a Fish.
   * @param {Object} options - The fish options.
   * @param {HTMLElement} options.element - The HTML element representing the fish.
   * @param {Tank} options.tank - The tank in which the fish exists.
   */
  constructor ({ settings, tank }) {
    this.tank = tank;
    this.element = this.createFishElement(settings);

    this.name = settings.name;

    this.initiateDimensions();

    this.swimAnimation = new Animation({ behavior: this.swim });

    this.floatPos = 0;
    this.floatAnimation = new Animation({ behavior: this.float, duration: 100 });
  }

  /**
   * Initiates the fish, setting its position, animations, and event listeners.
   */
  async initiateDimensions() {
    let _x = Math.floor(Math.random() * this.tank.width);
    let _y = Math.floor(Math.random() * (300 - this.tank.topOfWater) + this.tank.topOfWater);
    this.teleportTo(_x, _y);

    const { width, height } = this.element.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.scaleX = 1;
    this.scaleY = 1; 
  }

  createFishElement = (settings) => {
    // Initiate fish
    let fishDiv = document.createElement("div");
    fishDiv.className = "fish";
    
    // Create inner fish text (task/name)
    let fishNameDiv = document.createElement("div");
    fishNameDiv.className = "fish-name";
    fishNameDiv.innerText = settings.name;
    fishNameDiv.style.color = 'black';
    fishDiv.appendChild(fishNameDiv);

    // Create speech bubble
    this.speechBubbleDiv = document.createElement("div");
    this.speechBubbleDiv.className = "speech-bubble";
    this.speechBubbleDiv.innerText = settings.name;
    this.speechBubbleDiv.style.display = 'none';
    fishDiv.appendChild(this.speechBubbleDiv);

    this.tank.element.appendChild(fishDiv);

    fishDiv.addEventListener('click', this.handleOnClick);

    return fishDiv;
  }

  handleOnClick = async () => {
      this.swimAnimation.toggleAnimation();
      
      if (this.speechBubbleDiv.style.display === 'none') {
        this.speechBubbleDiv.innerText = 'test';
        
        this.speechBubbleDiv.style.display = 'block'
        this.element.style.zIndex = 9999; // Guarantees clicked fish is above other fish 
        
        const { height } = this.speechBubbleDiv.getBoundingClientRect();
        this.speechBubbleDiv.style.top = (-height)+'px'; // Moves speech bubble above fish  
      } else {
        this.speechBubbleDiv.style.display = 'none';
        this.element.style.zIndex = 0;
      }
  }

  /**
   * Handles the floating behavior of the fish.
   */
  float = () => {
    // Reverses fish Behavior after moving up or down 10 pixels
    if (this.floatPos >= 10) {
      this.floatReverse = true;
    } else if (this.floatPos <= 0) {
      this.floatReverse = false;
    }

    // Moves fish up or down based on floatReverse. Uses floatPos to determine when to change Behavior
    if (this.floatReverse) {
      this.floatPos -= 1;
      this.move.up(1);
    } else {
      this.floatPos += 1;
      this.move.down(1);
    }
  }

  /**
   * Handles the swimming behavior of the fish, including direction changes.
   */
  swim = () => {
    // Reverses fish direction after reaching tank boundaries
    if (this.x >= this?.tank?.width - this.width) {
      this.swimReverse = true;
      this.scaleX = Math.abs(this.scaleX) * -1;
    } else if (this.x <= 3) {
      this.swimReverse = false;
      this.scaleX = Math.abs(this.scaleX);
    }

    // Moves fish left or right based on swimReverse
    if (this.swimReverse) {
      this.move.left(2);
    } else {
      this.move.right(2);
    }

    // Adds a random swim behavior every 100 frames for variation
    if (this.swimBehaviors.behaviorTurn === 0) {
      const randomBehavior = Math.floor(Math.random() * 3);
      this.swimBehaviors.behaviorChosen = this.swimBehaviors.behaviorChoices[randomBehavior];
      this.swimBehaviors.behaviorTurn = 1;
    }
    this.swimBehaviors[this.swimBehaviors.behaviorChosen](); // Executes the chosen swim behavior
  }

  /**
   * Object containing different swim behavior functions.
   */
  swimBehaviors = {
    behaviorTurn: 0,
    behaviorChosen: 'straight',
    behaviorChoices: ['upward', 'downward', 'straight'],
    
    /**
     * Executes a given action for a specified duration.
     * @param {Function} action - The action to execute.
     * @param {number} [duration=100] - The duration to execute the action.
     */
    behave: (action, duration = 100) => {
      if (this.swimBehaviors.behaviorTurn > 0 && this.swimBehaviors.behaviorTurn < duration) {
        this.swimBehaviors.behaviorTurn++;
        action();
      } else {
        this.swimBehaviors.behaviorChosen = '';
        this.swimBehaviors.behaviorTurn = 0;
      }      
    },

    /**
     * Executes the upward swim behavior.
     */
    upward: () => {
      const action = () => { this.move.up(1); }
      this.swimBehaviors.behave(action);
    },

    /**
     * Executes the downward swim behavior.
     */
    downward: () => {
      const action = () => { this.move.down(1); }
      this.swimBehaviors.behave(action);
    },

    /**
     * Executes the straight swim behavior.
     */
    straight: () => {
      const action = () => {  }
      this.swimBehaviors.behave(action);
    }
  } 

  /**
   * Teleports the fish to a specified position.
   * @param {number} x - The x-coordinate to move the fish to.
   * @param {number} y - The y-coordinate to move the fish to.
   */
  teleportTo (x, y) {
    this.x = x;
    this.y = y;
    this.update();
  }

  /**
   * Object containing basic movement functions.
   */
  move = {
    /**
     * Moves the fish up by a specified number of pixels.
     * @param {number} pixels - The number of pixels to move the fish up.
     */
    up: (pixels) => {
      if (!this.canEscape && (this.y - pixels) > this.tank.topOfWater) {
        this.y = this.y - pixels;
        this.update();
      }
    },

    /**
     * Moves the fish down by a specified number of pixels.
     * @param {number} pixels - The number of pixels to move the fish down.
     */
    down: (pixels) => {
      if (!this.canEscape && (this.y + pixels) < 300) {
        this.y = this.y + pixels;
        this.update();
      }
    },

    /**
     * Moves the fish left by a specified number of pixels.
     * @param {number} pixels - The number of pixels to move the fish left.
     */
    left: (pixels) => {
      if (!this.canEscape && (this.x - pixels) >= 0) {
        this.x = this.x - pixels;
        this.update();
      }
    },

    /**
     * Moves the fish right by a specified number of pixels.
     * @param {number} pixels - The number of pixels to move the fish right.
     */
    right: (pixels) => {
      if (!this.canEscape && (this.x + pixels) < this.tank.width) {
        this.x = this.x + pixels;
        this.update();
      }
    },
  }

  /**
   * Updates the fish's position and style on the screen.
   */
  update = () => {
    this.element.style.translate = `${this.x}px ${this.y}px`;
    this.element.style.scale = `${this.scaleX} ${this.scaleY}`;
    this.element.style.transition = 'translate 0.01s ease-in-out, scale 0.5s ease-in-out';

    this.element.children[0].style.scale = `${this.scaleX} 1`;
    this.element.children[0].style.transition = 'translate 0.01s ease-in-out, scale 0.5s ease-in-out';
    this.element.children[1].style.scale = `${this.scaleX} 1`;
  }
}

/**
   * Class representing a tank (environment for fishes).
   */
return class Tank { 
    /**
     * Create a Tank.
     * @param {Object} options - The tank options.
     * @param {HTMLElement} options.tankRef - The HTML element representing the tank.
     * @param {HTMLElement} options.fish - The HTML element representing the fish.
     */
    constructor ({ tankRef, fishes }) {
      this.element = tankRef;
      this.handleResize();

      this.fishes = [];
      fishes.map((fishSettings) => this.addFish(fishSettings));

      window.addEventListener('resize', this.handleResize);
    }
  
    addFish = (settings) => {
      this.fishes.push(new Fish({ settings, tank: this }));
    } 
  
    /**
     * Handles the resize event, updating the tank dimensions.
     */
    handleResize = () => {
      const { width, height } = this.element.getBoundingClientRect();
      this.width = width;
      this.height = height;
      this.topOfWater = Math.floor(height * .10);
      console.log('resize', width, height);
    }
}