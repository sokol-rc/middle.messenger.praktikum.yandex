export default function apiHasErrors(response: any): response is APIError {
    return response && response.reason;
}
