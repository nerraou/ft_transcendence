import { Module, forwardRef } from "@nestjs/common";

import { EventsModule } from "@modules/events/events.module";

import { GameLoopService } from "./game-loop.service";

@Module({
  providers: [GameLoopService],
  exports: [GameLoopService],
  imports: [forwardRef(() => EventsModule)],
})
export class GameLoopModule {}
