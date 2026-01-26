import { showCurrentStep } from "./utils/utils.js";

// as page loads get these dom element and save in thier respective variables
// for cacheing reasons
const nominationForm = document.getElementById("nomination-form");

const nominationFormStep1HTML = document.querySelector(
  ".nomination-form-step-1",
);
const nominationFormStep2HTML = document.querySelector(
  ".nomination-form-step-2",
);
const nominationFormStep3HTML = document.querySelector(
  ".nomination-form-step-3",
);

// El stands for element , btn for button
const nextBtnEl = document.getElementById("next-btn");
const backBtnEl = document.getElementById("back-btn");

let count = 0; //keeps track of current step, I display nomination step based on this

// put the steps html in an array for easy accessibility and manipulation etc
//why?:  steps to nominate is a list that's why they are in an array
const nominationFormStepsList = [
  nominationFormStep1HTML,
  nominationFormStep2HTML,
  nominationFormStep3HTML,
];

const nominationFormStepsListErrors = {
  step1: true,
  step2: true,
};

let totalNumberOfSteps = nominationFormStepsList.length - 1; //0, 1, 2 so it always return something in the array

function moveToNextStep() {
  if (count < 0) {
    count = 0;
  } else if (count >= totalNumberOfSteps) {
    count = totalNumberOfSteps;
  } else {
    if (count === 0) {
      let success = validateStep1Form();
      success ? count++ : (count = 0);
    }else if(count === 1){
       let success = validateStep2Form();
       success ? count++ : (count = 1);
    }
  }
  showCurrentStep(nominationFormStepsList, count);
}

function moveToPrevStep() {
  if (count <= 0) {
    count = 0;
  } else if (count > totalNumberOfSteps) {
    count = totalNumberOfSteps;
  } else {
    count--;
  }
  showCurrentStep(nominationFormStepsList, count);
}

nextBtnEl.addEventListener("click", moveToNextStep);
backBtnEl.addEventListener("click", moveToPrevStep);

let validateStep1Form = () => {
  let isSuccess = false;
  const error = []

  let nameOfNomineeVal = document.getElementById("nominee-name").value.trim();
  let emailOfNomineeVal = document.getElementById("nominee-email").value.trim();
  let emailOfNominatorVal = document
    .getElementById("nominator-email")
    .value.trim();
  let genderOfNomineeVal = document.getElementById("gender").value.trim();

  let nameOfNomineeValerrorEL = document.getElementById("nominee-name-error");
  let emailOfNomineeValerrorEl = document.getElementById("nominee-email-error");
  let emailOfNominatorValerrorEl = document.getElementById(
    "nominator-email-error",
  );
  let genderOfNomineeValerrorEl = document.getElementById("gender-error");

  if (nameOfNomineeVal === "") {
    displayErrorMsg(nameOfNomineeValerrorEL, "filed must not be empty",isSuccess, false);
    error.push('name error')
  } else if (nameOfNomineeVal.length < 8) {
    displayErrorMsg(
      nameOfNomineeValerrorEL,
      "must not be less than 8 characters",
      isSuccess,
      false,
    );
    error.push('name error')
  } else {
    nameOfNomineeValerrorEL.innerHTML = "";
    nameOfNomineeValerrorEL.classList.remove("show");
    displayErrorMsg(nameOfNomineeValerrorEL, "", isSuccess, true);
    isSuccess = true;
  }

  if(genderOfNomineeVal === ""){
    displayErrorMsg(genderOfNomineeValerrorEl, 'please select gender', isSuccess,  false);
     error.push('gender error')
  }else{
    displayErrorMsg(genderOfNomineeValerrorEl, "", isSuccess, true);
    isSuccess = true;
  }


  // nominee email validation
  const { msg: nomineeEmailMsg, status: nomineeEmailStatus} = validateEmailInput(emailOfNomineeVal);

      if(!nomineeEmailStatus){
        displayErrorMsg( emailOfNomineeValerrorEl, nomineeEmailMsg, isSuccess, nomineeEmailStatus);
        console.log(nomineeEmailStatus)
        error.push('nominee error')
      }else{
          displayErrorMsg(emailOfNomineeValerrorEl, nomineeEmailMsg, isSuccess,  nomineeEmailStatus);
           console.log(nomineeEmailStatus)
      }

  // nominator email validation

    const { msg: nominatorEmailMsg, status: nominatorEmailStatus} = validateEmailInput(emailOfNominatorVal);
  
      if(!nominatorEmailStatus){
        displayErrorMsg( emailOfNominatorValerrorEl, nominatorEmailMsg, isSuccess, nomineeEmailStatus);
        error.push('nominator error')
      }else{
          displayErrorMsg(emailOfNominatorValerrorEl, nominatorEmailMsg, isSuccess,  nominatorEmailStatus);
      }

     console.log(error)

  return  error.length === 0 ? true: false;
};

let validateStep2Form = () => {
  let isSuccess = false;
  const error = [];

  // Values
  const whatsAppNoVal = document.getElementById('whatsapp-contact').value.trim();
  const otherContactVal = document.getElementById('other-contact').value.trim();
  const facultyVal = document.getElementById('faculty').value.trim();
  const departmentVal = document.getElementById('department').value.trim();

  // Error elements
  const whatsAppErrorEl = document.getElementById('whatsapp-error');
  const otherContactErrorEl = document.getElementById('other-contact-error');
  const facultyErrorEl = document.getElementById('faculty-error');
  const departmentErrorEl = document.getElementById('department-error');

  // WhatsApp validation
  const { msg: whatsappMsg, status: whatsappStatus } = validatePhoneNumberInputs(whatsAppNoVal);
  if (!whatsappStatus) {
    displayErrorMsg(whatsAppErrorEl, whatsappMsg, isSuccess, false);
    error.push('whatsapp error');
  } else {
    displayErrorMsg(whatsAppErrorEl, '', isSuccess, true);
    isSuccess = true;
  }

  // Other contact validation (optional)
  if (otherContactVal) {
    const { msg: otherMsg, status: otherStatus } = validatePhoneNumberInputs(otherContactVal);
    if (!otherStatus) {
      displayErrorMsg(otherContactErrorEl, otherMsg, isSuccess, false);
      error.push('other-contact error');
    } else {
      displayErrorMsg(otherContactErrorEl, '', isSuccess, true);
      isSuccess = true;
    }
  } else {
    // optional field, clear error
    displayErrorMsg(otherContactErrorEl, '', isSuccess, true);
    isSuccess = true;
  }

  // Faculty validation
  if (!facultyVal) {
    displayErrorMsg(facultyErrorEl, 'please select a faculty', isSuccess, false);
    error.push('faculty error');
  } else {
    displayErrorMsg(facultyErrorEl, '', isSuccess, true);
    isSuccess = true;
  }

  // Department validation
  if (!departmentVal) {
    displayErrorMsg(departmentErrorEl, 'department must not be empty', isSuccess, false);
    error.push('department error');
  } else if (departmentVal.length < 3) {
    displayErrorMsg(departmentErrorEl, 'department must be at least 3 characters', isSuccess, false);
    error.push('department error');
  } else {
    displayErrorMsg(departmentErrorEl, '', isSuccess, true);
    isSuccess = true;
  }

  console.log(error);

  return error.length === 0 ? true : false;
};


function displayErrorMsg(element, msg, isSuccess, result) {
  element.innerHTML = msg;
  isSuccess = result;
  /* this could have been shorter 
     but i dont want to toggle classlist to avoid unexpected behaviour
     and also makes the func depend on less parameter which is good for readability 
      */
  isSuccess ? element.classList.remove("show") : element.classList.add("show");
}

const validatePhoneNumberInputs = (inputELValue) => {
  let msg = '';
  let status = true;

  // Check for non-numeric characters
  if (!/^\d*$/.test(inputELValue)) {
    msg = 'alphabets, spacing or + are not allowed';
    status = false;
  }
  // Check length
  else if (inputELValue.length !== 11) {
    msg = 'phone number must be equal to 11';
    status = false;
  }

  return { msg, status };
};

const validateEmailInput = (inputELValue) => {
  let msg = '';
  let status = true;
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Required check
  if (!inputELValue) {
    msg= 'email is required'; status = false ;
  }else if (!emailRegex.test(inputELValue)) {
   msg= 'invalid email address'; status = false ;
  }else{
   msg = '', status =  true
  }
  console.log('nominee', status)
  return { msg, status };
};



