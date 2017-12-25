componentDidMount() {
  this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      console.log("prints after 5 seconds");
      this.setState({
        counter: this.state.counter + 1
      });
      console.log(this.state.counter);
  }, 5000);
}

<ScrollView
  contentContainerStyle={styles.scrollContent}
// Hide all scroll indicators
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
  {routines.map((routine, index) => <GridDisplay
    routine={routine}
    onOpen={this.openRoutine}
    key={index}
  />)}
</ScrollView>

<ScrollView>
  <ListItem button onPress={() => console.log("Test")} name="Audition"></ListItem>
  <ListItem name="Performance"></ListItem>
  <ListItem name="Sectional"></ListItem>
</ScrollView>

<TouchableHighlight style={styles.center} onPress={() => this.props.navigation.navigate('Routine')}>
  <View ref={component => this._root = component}>
    <Center></Center>
  </View>
</TouchableHighlight>

<ListView
  dataSource={this.state.dataSource}
  renderRow={(data) => this.generateItem(data)}
  renderHeader={this.renderHeader}
  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
/>

// CODE FOR CUSTOM COUNTDOWN ANIMATION

// Begin counting on page load
componentDidMount() {
  // Set interval so that every 5000 ms, increment counter by 1
  this.timer = setInterval(() => {
    let startTime = Date.now() // note start time of each interval

    if (!this.finished()) {

      let duration = this.state.duration; // the duration of routine at start

      this.initializeCountdown(startTime, duration);

      let next = this.state.counter + 1;

      this.setState({
        counter: next,
        duration: durations[next],
      });

    } else {
      // move to final screen
      clearTimeout(this.timer);
      this.props.navigation.navigate('Feedback');
    }
  }, this.state.duration);
}

// In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
componentWillUnmount() {
  clearTimeout(this.timer);
}

initializeCountdown(startTime, duration) {
  console.log("counting down");
  let interval = setInterval(() => {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    if (elapsedTime > duration) {
      console.log("EXCEEDED");
      clearInterval(interval);

      this.setState({
        percentage: 0
      });

      return;
    } else {
      this.calculatePercentage(elapsedTime, duration);
    }
  }, 500);
}

calculatePercentage(timeElapsed, duration) {
  let percent = Math.trunc((timeElapsed / duration) * 100);

  this.setState({
    percentage: percent
  });

  console.log(timeElapsed.toString() + '/' + duration.toString() + '=' + percent.toString());
  return percent
}

// While loop Version of RoutinePage. Somehow, this.finished() is undefined

console.log(!this.finished());
while (!this.finished()) {
  // Set interval so that every 5000 ms, increment counter by 1
  this.timer = setInterval(() => {
    let next = this.state.counter + 1;

    this.startCountdown();

    this.setState({
      counter: next,
      duration: routineDurations[next],
    });
  }, this.state.duration);
}

// move to final screen
clearTimeout(this.timer);
this.props.navigation.navigate('Feedback');

// Iterate through each action
let actions = this.state.routineActions;
actions.forEach((element, index) => {
  setTimeout( () => {
    console.log(element);
    console.log(this.state.routineDurations[index] * 100);
  }, index * this.state.routineDurations[index] * 100);
  console.log ("Finished");
});

<View style={defaultStyles.container}>
  <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
  </View>

  <View style={[defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
    <View style={[defaultStyles.graphicLayoutUpperText, defaultStyles.outline]}>
      <Text style={defaultStyles.bodyText}>
        {this.state.currentAction}
      </Text>
    </View>

    <View style={[styles.circleWrapper, defaultStyles.outline]}>
      <AnimatedCircularProgress style={styles.countdown}
        ref='circularProgress'
        size={200}
        width={5}
        fill={0}
        tintColor="#3d5875"
        backgroundColor="#FFFFFF">
      </AnimatedCircularProgress>
      <Center style={styles.center}></Center>
    </View>

    <View style={[defaultStyles.graphicLayoutLowerText, defaultStyles.outline]}>
      <Text style={defaultStyles.bodyText}>
      </Text>
    </View>
  </View>

  <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
  </View>
</View>


let loopCountdown = (counter) => {
  // If user exits routine manually, this will be set to true and will break the recursion
  if (this.state.exited) {
    return
  }

  if (counter < this.state.routineDurations.length) {
    console.log(counter, this.state.routineDurations.length);
    console.log(this.state.routineActions[counter])

    // Set the current action and duration for this iteration
    this.setState({
      currentAction: this.state.routineActions[counter],
      currentDuration: this.state.routineDurations[counter] * 1000
    });

    // Begin timer animation for this iteration
    this.beginTimerAnimation(this.state.currentDuration);

    // Set timer on this iteration
    setTimeout( () => {
      this.playAudio(this.state.notification);
      clearTimeout(); // clear previous timeout
      loopCountdown(counter + 1); // Recursively start loop again with incremented index
    }, this.state.currentDuration)
  } else {
    // Move to next screen
    this.navigateToFeedback();
  }
}

// Call recursive function to begin routine
loopCountdown(this.state.counter);
}

// In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
componentWillUnmount() {
this.exit()
}

// load audio
