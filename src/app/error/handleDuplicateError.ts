import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: mongoose.Error): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const error: TError = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Email ',
    error,
  };
};
export default handleDuplicateError;
