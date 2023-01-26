import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { controllerModules } from '@Controllers/index';
import { servicesModules } from '@Services/index';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:toor@cluster0.7uy2qv7.mongodb.net/saasDb?retryWrites=true&w=majority',
    ),
    HttpModule,
    JwtModule.register({ secret: 'yOUjr4bRjjDrakKrCpO74IWX5DT348Jf' }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ...controllerModules,
    ...servicesModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
