
 //<li><input type="text" name="ingredients" style="width: 100px;"> 
 //<button class="link" type="button" onclick=removeIngredientClick()>Remove Ingredient<button></li>

 function getNewListItem(){
  return document.createElement('li');
}

function getNewInputItem(inputName, width){
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.style = `width: ${width}px`;
  newInput.name = inputName;

  return newInput;
}

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
  
  newListItem.appendChild(newInputItem);
  newListItem.appendChild(newButtonItem);

  ingListElem.appendChild(newListItem);

  console.log("New step clicked");
}

function removeIngredientClick(el){
  el.parentNode.remove();
  console.log("Remove ing clicked");
}

function removeDirectionStepClick(el){
  console.log(el);
  el.parentNode.remove();
  console.log("remove dir clicked");
}

