$(function() { 
  // Runs after the webpage finishes loading and displays the pet's starting information
  //then connects each button to its corresponding function
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml("Beethoven is ready for a fun day!");
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.train-button').click(clickedTrainButton);
    $('.log-demo-button').click(runConsoleMessageDemo);
    $('.bug-demo-button').click(reproduceHappinessBug);
    $('.missing-file-button').click(trigger404);
    $('.type-error-button').click(triggerTypeError);
    $('.violation-button').click(triggerLongHandler);

    console.info('[Beethoven] Application initialized.');
    console.log('[Beethoven] Click a pet action or open the Devtools controls');

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Beethoven", weight:120, happiness:50};
  
    function clickedTreatButton() {
      pet_info.happiness += 5;// Increase pet happiness
      pet_info.weight += 2; // Increase pet weight
      console.log('[Pet action] Treat clicked', {
      happiness: pet_info.happiness, weight: pet_info.weight
      });
      checkAndUpdatePetInfoInHtml("Beethoven is happy to have a treat!", true); //the true value tells it to animate Beethoven
    }

    
    
    function clickedPlayButton() {
      pet_info.happiness += 10; // Increase pet happiness
      pet_info.weight -= 2; // Decrease pet weight
      console.log('[Pet action] Play clicked', {
      happiness: pet_info.happiness, weight: pet_info.weight
      });
      checkAndUpdatePetInfoInHtml("Beethoven is having a great time playing!", true);
    
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= 5; // Decrease pet happiness
      pet_info.weight -= 3; // Decrease pet weight
      console.log('[Pet action] Exercise clicked', {
      happiness: pet_info.happiness, weight: pet_info.weight
      });
      checkAndUpdatePetInfoInHtml("Beethoven is getting some exercise!", true);
    }
    function clickedTrainButton() { //the additional action that was added
      pet_info.happiness += 15; // Increase pet happiness
      pet_info.weight -= 3; // Decrease pet weight
      console.log('[Pet action] Train clicked', {
      happiness: pet_info.happiness, weight: pet_info.weight
      });
      checkAndUpdatePetInfoInHtml("Beethoven is learning new tricks!", true);
    }

    //this function checks the values and then updates the webpage, and displays a webpage from Beethoven
    function checkAndUpdatePetInfoInHtml(message, animatePet) {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
      displayPetMessage(message, animatePet);
    }
    
    //prevents weight and happiness from going below zero
    function checkWeightAndHappinessBeforeUpdating() {
     if (pet_info.weight < 0) { // Add conditional so if weight is lower than zero.
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) { // Add conditional so if happiness is lower than zero.
        pet_info.happiness = 0;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }

    //displays a message from Beethoven and animates the pet
    function displayPetMessage(message, animatePet) {
      if (animatePet) {
        //removes the old animation
        $('.pet-image').removeClass('pet-action-animation');
        //forces the browser to restart the animation
        void $('.pet-image')[0].offsetWidth;
        //addClass() applies the bounce animation to the image
        $('.pet-image').addClass('pet-action-animation');
      }
      //hides the previous message and fades in the new message
      $('.pet-message').hide().text(message).fadeIn(300);

      //prependTo() adds a paw print to the beginning of the message.
      $('<span>🐾</span>').prependTo('.pet-message');

      //appendTo() adds a paw print to the end of the message.
      $('<span>🐾</span>').appendTo('.pet-message');
    }

    function runConsoleMessageDemo() {
      console.log('[Console message demo] This is a log message.');
      console.info('[Console message demo] This is an info message.');
      console.warn('[Console message demo] This is a warning message.');
      console.error('[Console message demo] This is an error message.');

    var actions = [
      {action: 'Treat', happinessChange: 5, weightChange: 2},
      {action: 'Play', happinessChange: 10, weightChange: -2},
      {action: 'Exercise', happinessChange: -5, weightChange: -3},
      {action: 'Train', happinessChange: 15, weightChange: -3}
    ];

    console.table(actions);

    console.group('[Console demo] Beethoven state');
    console.log('Name: ' + pet_info.name);
    console.log('Weight: ' + pet_info.weight);
    console.log('Happiness: ' + pet_info.happiness);
    console.groupEnd();

    console.log(
      '%c[Console demo] Custom styled message',
      'color: #7b2cbf; background: #f3d9ff; padding: 4px; font-weight: bold;'
    );

    updateDebugStatus(
      'Console demo completed. Check the console for messages and table output.'
    )
    }
    //Intentional debugging bug
    function reproduceHappinessBug() {
      /* INTENTIONAL BUG. Happiness is incorrectly multiplied by 2.*/

      var displayedHappiness = pet_info.happiness * 2; // Bug: should be pet_info.happiness
      $('.happiness').text(displayedHappiness);
      console.error('[Intentional bug] Dislpayed happiness is double.',
        {actual: pet_info.happiness, displayed: displayedHappiness}
      );

      updateDebugStatus(
        'Bug reproduced: the displayed value is twice the actual happiness.'
      );
    }

    //404 browser error
    function trigger404() {
      console.warn( '[Browser demo] Requesting a missing image to produce a 404 network error'
      );
      
      var missingImage = new Image();
      missingImage.src = 'assets/missing_image.png'; // This image does not exist
    }

    //TypeError demonstation

    function triggerTypeError() {
      console.warn('[Browser demo] Triggering a TypeError by calling a method on undefined.');
      var missingPet = undefined;
      missingPet.name;
    }

    //Long-running handler demonstration

    function triggerLongHandler() {
      console.warn('[Browser demo] Triggering a long-running handler to demonstrate performance issues.');
      var startTime = performance.now();
      //This loop intentionally keeps the browser busy for approximately 250 milliseconds
      while (performance.now() - startTime < 250) {
        Math.sqrt(Math.random() * 1000000);
      }

      updateDebugStatus(
        'Long handler complete. Check the console and performance paneles.'
      );
    }

    //Update the status message

    function updateDebugStatus(message) {
      $('.debug-status').text(message);
    }