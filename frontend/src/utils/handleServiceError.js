// in case of an error -> throw status and message
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    return Promise.reject({
      status: error.response.status,
      message: error.response.data || error.message,
    });
  } 
    
};
export default handleError;