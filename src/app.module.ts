import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultController } from './consult/consult.controller';
import { ConsultService } from './consult/consult.service';
import { ConsultModule } from './consult/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';

@Module({
  imports: [ConsultModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController, ConsultController],
  providers: [AppService, ConsultService],
})
export class AppModule { }
