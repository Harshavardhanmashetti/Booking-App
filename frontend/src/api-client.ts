import { RegisterFormData } from "./pages/Register";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
export const register = async (formData: RegisterFormData) => {
    try {
        const response = await fetch("http://localhost:4000/api/users/register", {
            method: 'POST',
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Check if response is not OK (e.g., HTTP status code 4xx or 5xx)
        if (!response.ok) {
            // Throw an error with response status text
            throw new Error(response.statusText);
        }

        // Parse JSON response
        const responseBody = await response.json();
        console.log(responseBody);
        
        // Return response body
        return responseBody;
    } catch (error) {
        // Handle errors (e.g., network error, JSON parsing error)
        console.error("Error in API request ddfdsf:", error);
        throw new Error("Error occurred while processing the request.");
    }
}
export const validateToken=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Token invalid");
    }
    return response.json();
}
