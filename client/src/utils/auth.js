// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {

    //This function gets user data
    getProfile() {

        return decode(this.getToken());
    }

    // check if user's logged in
    loggedIn() {

        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    // This function checks if the user's token is expired
    isTokenExpired(token) {
        
        try {

            const decoded = decode(token);

            if (decoded.exp < Date.now() / 1000) {

                return true;

            } else return false;

        } catch (err) {

            return false;
        }
    }

    // This function retrieves the user token from localStorage
    getToken() {

        // 
        return localStorage.getItem('id_token');
    }

    // This function logs the user in to the application by saving the user's token to local storage.
    login(idToken) {

        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

     // This function logs the user out of  the application by clearing the user's token from local storage.
    logout() {
        
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();
