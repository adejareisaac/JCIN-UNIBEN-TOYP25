import { removeAllSteps } from "./utils/utils.js";

// as page loads get these dom element and save in thier respective variables
// for cacheing reasons
const nominationForm = document.getElementById("nomination-form");

const nominationFormStep1HTML = document.querySelector(".nomination-form-step-1");
const nominationFormStep2HTML = document.querySelector(".nomination-form-step-2",);
const nominationFormStep3HTML = document.querySelector(".nomination-form-step-3");

// El stands for element , btn for button
const nextBtnEl = document.getElementById('next-btn')
const backBtnEl = document.getElementById('back-btn')





let count = 0; //keeps track of current step, I display nomination step based on this

// put the steps html in an array for easy accessibility and manipulation etc
//why?:  steps to nominate is a list that's why they are in an array
const nominationFormStepsList = [
  nominationFormStep1HTML,
  nominationFormStep2HTML,
  nominationFormStep3HTML,
];

let totalNumberOfSteps = nominationFormStepsList.length - 1; //0, 1, 2 so it always return something in the array

function moveToNextStep() {
  if (count < 0) {
    count = 0;
    removeAllSteps(nominationFormStepsList);
    nominationFormStepsList[count].style.display = "flex";
  } else if (count >= totalNumberOfSteps) {
    removeAllSteps(nominationFormStepsList); 
    count = totalNumberOfSteps;
    nominationFormStepsList[count].style.display = "flex";
  } else {
    count++;
    removeAllSteps(nominationFormStepsList);
    nominationFormStepsList[count].style.display = "flex";
  }
}


function moveToPrevStep() {
  if (count <= 0) {
    count = 0;
    removeAllSteps(nominationFormStepsList);
    nominationFormStepsList[count].style.display = "flex";
  } else if (count > totalNumberOfSteps) {
    removeAllSteps(nominationFormStepsList);
    count = totalNumberOfSteps;
    nominationFormStepsList[count].style.display = "flex";
  } else {
    count--;
    removeAllSteps(nominationFormStepsList);
    nominationFormStepsList[count].style.display = "flex";
  }

}

nextBtnEl.addEventListener('click', moveToNextStep);
backBtnEl.addEventListener('click', moveToPrevStep);