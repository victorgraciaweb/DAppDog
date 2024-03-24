import { Module } from '@nestjs/common';
import { DogsModule } from './dogs/dogs.module';
import { DogsController } from './dogs/dogs.controller';
import { DogsService } from './dogs/dogs.service';

@Module({
  imports: [DogsModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class AppModule {}
