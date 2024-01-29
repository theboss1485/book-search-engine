
// This function gets a user's saved book IDs from local storage.
export const getSavedBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books'))
        : [];

    return savedBookIds;
};

// This function saves an array of book IDs to local storage.
export const saveBookIds = (bookIdArr) => {

    if (bookIdArr.length) {

        localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
        
    } else {

        localStorage.removeItem('saved_books');
    }
};

// This function removes a book Id from local storage.
export const removeBookId = (bookId) => {

    const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books'))
        : null;

    if (!savedBookIds) {
        
        return false;
    }

    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

    return true;
};
