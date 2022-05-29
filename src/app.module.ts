import { Global, Module } from '@nestjs/common';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { CategoriesModule } from './categories/categories.module';

@Global()
@Module({
  imports: [
    BootstrapModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
    CategoriesModule,
  ],
  exports: [BootstrapModule],
})
export class AppModule {}
