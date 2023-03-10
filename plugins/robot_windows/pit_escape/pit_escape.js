import RobotWindow from 'https://cyberbotics.com/wwi/R2023b/RobotWindow.js';

window.robotWindow = new RobotWindow();
const benchmarkName = 'Pit Escape';
let benchmarkPerformance = 0;

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick); 

window.robotWindow.receive = function(message, robot) {
  // updates the metric
  if (message.startsWith('update:')) {
    benchmarkPerformance = message.substr(7);
    document.getElementById('performance-display').innerText = benchmarkPerformance;
  } else if (message.startsWith('stop')) {
    benchmarkPerformance = message.substr(5);
    document.getElementById('performance-display').innerText = benchmarkPerformance;
    document.getElementById('performance-display').style.color = 'green';
    document.getElementById('performance-display').style.fontWeight = 'bold';
    document.querySelector(".text").innerHTML = `
      <h2>${benchmarkName} complete</h2>
      <h3>Congratulations you finished the benchmark!</h3>
      <p>Your current performance is: <b style="color:green;">${benchmarkPerformance}%</b></p>
      <p>If you want to submit your controller to the leaderboard, follow the instructions given by the "Register" button on the benchmark page.</p>
    `
    toggleModal()
  } else
    console.log("Received unknown message for robot '" + robot + "': '" + message + "'");
};
