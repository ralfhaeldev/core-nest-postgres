// src/common/exceptions/database-exception.handler.ts

import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('DatabaseExceptionHandler');

export function handleDBExceptions(error: any): never {
  if (error.code === '23505') {
    throw new BadRequestException(error.detail); // Duplicado
  }

  logger.error(error);
  throw new InternalServerErrorException(
    'Unexpected database error, check logs',
  );
}
