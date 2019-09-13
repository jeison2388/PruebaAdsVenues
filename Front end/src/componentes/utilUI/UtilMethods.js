const inputGroupChangeHandler = (event,inputIdentifierInEvaluation, inputIdentifierNotEvaluation, elementIdentifier, template) =>
{
  const copyDataState = {...template}
  const updateFormElement = {...copyDataState[elementIdentifier]}
  let updateFormInput = {...updateFormElement.elementConfig[inputIdentifierInEvaluation]}
  let NoUpdateFormInput = {...updateFormElement.elementConfig[inputIdentifierNotEvaluation]}
  updateFormInput.value = event.target.value;
  updateFormInput.validation.touched = true;
  updateFormInput.validation.valid = checkValidity(updateFormInput,NoUpdateFormInput,inputIdentifierInEvaluation, inputIdentifierNotEvaluation);

  if(updateFormInput.validation.valid === true && NoUpdateFormInput.validation.valid === false && NoUpdateFormInput.value.length > 0)
  {
    NoUpdateFormInput.validation.valid = true
    updateFormElement.elementConfig[inputIdentifierNotEvaluation] = NoUpdateFormInput
  }

  const keyObject = Object.keys(updateFormElement.elementConfig);
  const updateStatebutton = {...updateFormElement.elementConfig[keyObject[2]]}
  updateStatebutton.elementConfig.active = validationForShowButton(updateFormInput, NoUpdateFormInput)
  if(checkValidityForClear(updateFormInput.value))
  {
    updateFormInput.validation.touched = false;
    updateStatebutton.elementConfig.active = false;
  }
  updateFormElement.elementConfig[keyObject[2]] = updateStatebutton;
  updateFormElement.elementConfig[inputIdentifierInEvaluation] = updateFormInput;

  copyDataState[elementIdentifier] = updateFormElement;
  return copyDataState;
}
/**********************EVENTS FOR CHANGED BUTTTON ELEMENT INPUT-GROUP-3***************************************/

const checkValidity = (updateFormInput, noUpdateFormInput,inputIdentifierInEvaluation, inputIdentifierNotEvaluation) =>
  {
    let isValid = true;
    let objetReturn = {...updateFormInput}
    const arrayUpdateFormInput = objetReturn.value.split('-')
    const arrayNoUpdate = noUpdateFormInput.value.split('-')

    const dateInEvaluation = new Date(arrayUpdateFormInput[0],arrayUpdateFormInput[1],arrayUpdateFormInput[2])
    const dateNotInEvaluation = new Date(arrayNoUpdate[0],arrayNoUpdate[1],arrayNoUpdate[2])


    switch (inputIdentifierInEvaluation) {
      case 'fieldDateMin':
        if(dateInEvaluation > dateNotInEvaluation) return false
        else if(dateInEvaluation === dateNotInEvaluation) return false
      break;

      case 'fieldDateMax':

          if(dateInEvaluation < dateNotInEvaluation) return false
          else if(dateInEvaluation === dateNotInEvaluation) return false

      break;

      default:
        break;
    }
    return isValid;
  }


const checkValidityForClear = (value) =>
  {
    if (value.length === 0)
    {
      return true
    }
    else{
      return false
    }
  }

const validationForShowButton = ( updateFormInput, NoUpdateFormInput) =>
{
  if(validateOkFieldsInputGroup(updateFormInput.validation.valid, NoUpdateFormInput.validation.valid))
  {
    return true;
  }
  else{
    return false;
  }
}

const validateOkFieldsInputGroup = (validationElementInEvaluation, validationElementNotEvaluation) =>
{
  let validation = false;
  validationElementInEvaluation === true && validationElementNotEvaluation === true ?
    validation = true
    :
    validation = false
    return validation
}


  export {inputGroupChangeHandler}
