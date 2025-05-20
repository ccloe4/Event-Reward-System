import { JwtStrategy, UserMiddleware } from '@libs/common';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ProxyService } from './services/proxy.service';
import { AuthProxyController } from './controllers/auth.controller';
import { EventProxyController } from './controllers/event.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthProxyController, EventProxyController],
  providers: [JwtStrategy, ProxyService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
