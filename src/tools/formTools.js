/*
    * this  function only works with the custom Items
    !the form should have this configuration : {
    !orderForm: {
	!		email: {
	!			elementType: inputCustomType ,
	!			elementConfig: {
	!				type: string,
	!				placeholder: string,
	!			},
	!			value: string,
	!			validation: {
	!				required: boolean,
	!				isEmail: boolean,
	!			},
	!			valid: boolean,
	!		},  ...
    !}
*/
export const checkValidityInputs = (inputIdentifier, valid, form) => {
	for (let key in form) {
		if (form[key].validation) {
			if (key === inputIdentifier) {
				//! if i do it with the actual state, it would be in the pass so it wont work
				if (valid === false) {
					return true;
				}
			} else {
				if (form[key].valid === false) {
					return true;
				}
			}
		}
	}
	return false;
};
