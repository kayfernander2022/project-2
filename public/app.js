
 //
 //
 //
//create new line item
 function getNewListItem(){
  return document.createElement('li');
}
//new input field function
function getNewInputItem(inputName, width){//resized, make edits
  const newInput = document.createElement('input');//create the input
  newInput.type = 'text';//set attribute
  newInput.style = `width: ${width}px`;//set style
  newInput.name = inputName;

  return newInput;
}
//get buttons
function getNewButtonItem(buttonText, btnOnClick){
  const newButton = document.createElement('button');
  newButton.className = 'link';
  newButton.type = 'button'
  newButton.innerHTML = buttonText;
  newButton.onclick = btnOnClick;

  return newButton;
}

function addNextIngredientClick(){
  const ingListElem = document.getElementById('ingredientsList'); // get the list

  const newListItem = getNewListItem(); // create new list item
  const newInputItem = getNewInputItem('ingredients', 300); // create new input item
  const newButtonItem = getNewButtonItem('Remove Ingredients', () => removeIngredientClick(newButtonItem)); // create new button item
  
  newListItem.appendChild(newInputItem);  // add new input item as child to new list item
  newListItem.appendChild(newButtonItem); // add new button item as child to new list item

  ingListElem.appendChild(newListItem); // add new list item as chid to the list
  console.log("New ingredient clicked ");
}

function addNewStepClick(){
  const ingListElem = document.getElementById('directionsList');
  const newListItem = getNewListItem();
  const newInputItem = getNewInputItem('directions', 600);
  const newButtonItem = getNewButtonItem('Remove Step', () => removeDirectionStepClick(newButtonItem));
  
  newListItem.appendChild(newInputItem);//add input
  newListItem.appendChild(newButtonItem);//add button

  ingListElem.appendChild(newListItem);

  console.log("New direction step clicked");//test functon when add new clicked
}

function removeIngredientClick(el){
  el.parentNode.remove();
  console.log("Remove ing clicked");
}

function removeDirectionStepClick(el){
  console.log(el);//test
  el.parentNode.remove();
  console.log("remove dir clicked");//test the onclick
}

