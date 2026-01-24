export function removeAllSteps(list){
     list.forEach((step) => {
      step.style.display = "none";
    });
}