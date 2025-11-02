import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { EnvConfiguration, joiValidationSchema } from './config';
import { UserController } from './user/presentation';


@Module({
  imports: [
    
     ConfigModule.forRoot({
       load: [ EnvConfiguration ],
       validationSchema: joiValidationSchema,
     }),
    
     UserModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
