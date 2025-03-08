import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleCasteError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const error: TError = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'ID not found',
    error,
  };
};
export default handleCasteError;
