import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { RewardRequest, RewardRequestSchema } from './schemas/reward-request.schema';
import { Quest, QuestSchema } from './schemas/quest.schema';

import { EventController } from './controllers/event.controller';
import { RewardController } from './controllers/reward.controller';
import { RewardRequestController } from './controllers/reward-request.controller';

import { EventService } from './services/event.service';
import { RewardService } from './services/reward.service';
import { RewardRequestService } from './services/reward-request.service';
import { ConditionService } from './services/condition.service';
import { HttpModule } from '@nestjs/axios';
import { QuestService } from './services/quest.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EventStatusScheduler } from './scheduler/event-status.scheduler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
      { name: Quest.name, schema: QuestSchema },
    ]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [EventController, RewardController, RewardRequestController],
  providers: [
    EventService,
    RewardService,
    RewardRequestService,
    ConditionService,
    QuestService,
    EventStatusScheduler,
  ],
})
export class EventModule {}
