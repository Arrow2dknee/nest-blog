export const ERROR = {
  EXCEPTION: {
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not found',
  },
  AUTH: {
    INVALID_TOKEN: 'Invalid token',
  },
  USER: {
    USERNAME_CRITERIA: 'Username does not meet criteria',
    USERNAME_EXISTS: 'User with this name already exists',
    EMAIL_EXISTS: 'User with this email already exists',
    EMAIL_FORMAT: 'Invalid email format',
    USER_NOT_FOUND: 'User does not exists',
    INCORRECT_PASSWORD: 'Incorrect email or password',
    PASSWORD_CRITERIA: 'Password does not meet criteria',
  },
  POST: {
    TITLE_CRITERIA: 'Post title does not meet criteria',
    TITLE_EXISTS: 'Post with this title already exists',
    NOT_FOUND: 'Post does not exists',
    ID_REQUIRED: 'Post id is required',
    ID_NUMBER_FORMAT: 'Post id must be a number',
  },
  COMMENT: {
    URL_COMMENT: 'Invalid comment. Received URL',
  },
};
