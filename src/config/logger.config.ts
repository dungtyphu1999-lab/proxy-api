import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  verbose: process.env.LOGGER_VERBOSE === 'true',
}));
