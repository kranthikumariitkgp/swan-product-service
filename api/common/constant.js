const successMessage = { message: 'Succesfully stored to database.' };
const errorMessage = { message: 'Error in storing to database' };
const unauthorisedMessage = { message: 'You are unauthorised to access resources or token is invalid.' };

const errorStatusCode = 500;
const unauthorisedStatusCode = 401;

const secretKey = 'secretKey';

const maxPageSize = 10;
const reviewsSize = 2;
const saltRounds = 10;

module.exports = {
  successMessage,
  errorMessage,
  errorStatusCode,
  unauthorisedStatusCode,
  secretKey,
  unauthorisedMessage,
  maxPageSize,
  reviewsSize,
  saltRounds,
};
