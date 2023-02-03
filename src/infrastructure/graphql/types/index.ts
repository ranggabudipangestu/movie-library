import { authorSchema } from './author';
import { actorSchema } from './actor';
import { movieSchema } from './movie';
import { userSchema } from './user';
import { mergeTypeDefs } from '@graphql-tools/merge';

const types = [
  authorSchema,
  actorSchema,
  movieSchema,
  userSchema
];

export const schema = mergeTypeDefs(types);