import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';
import { GoogleModule } from './modules/google/google.module';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [GraphqlModule, PrismaModule, AccessModule, GoogleModule, PersonModule],
})
export class AppModule {}
