import Joi from 'joi';
import { IBookCreate } from 'src/common/interfaces';

export const schemaBook = Joi.object<IBookCreate>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  authors: Joi.string().required(),
  favorite: Joi.string().required(),
  fileCover: Joi.string().required(),
  fileName: Joi.string().required(),
  fileBook: Joi.string().required(),
});
