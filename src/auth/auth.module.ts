import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailExistsConstraint } from './validators/email-exists.validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, EmailExistsConstraint],
  exports: [EmailExistsConstraint],
})
export class AuthModule {}
