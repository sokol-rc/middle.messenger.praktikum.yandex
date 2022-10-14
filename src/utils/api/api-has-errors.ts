export default function apiHasErrors(response: any): response is APIError {
    
	if (response && response.status !== 200) { 
		return true;
	}
	return false;
}
