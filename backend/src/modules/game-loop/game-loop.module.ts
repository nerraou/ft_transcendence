import { Module, forwardRef } from "@nestjs/common";

import { GameLoopService } from "./game-loop.service";
import { EventsModule } from "@modules/events/events.module";

@Module({
  providers: [GameLoopService],
  exports: [GameLoopService],
  imports: [forwardRef(() => EventsModule)],
})
export class GameLoopModule {}
