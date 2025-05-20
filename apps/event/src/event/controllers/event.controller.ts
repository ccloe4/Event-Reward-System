import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { AuthenticatedRequest } from '@libs/interfaces';
import { ClearQuestDto } from '../dto/clear-quest.dto';
import { ClearQuestResponseDto } from '../dto/clear-quest-response.dto';
import { QuestService } from '../services/quest.service';
import { EventResponseDto } from '../dto/event-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly questService: QuestService,
  ) {}

  @Post('create')
  async createEvent(@Body() dto: CreateEventDto): Promise<EventResponseDto> {
    const event = this.eventService.create(dto);

    return plainToInstance(EventResponseDto, event, { excludeExtraneousValues: true });
  }

  @Get()
  async getAllEvents(): Promise<EventResponseDto[]> {
    const events = await this.eventService.findAll();

    return plainToInstance(EventResponseDto, events, { excludeExtraneousValues: true });
  }

  @Post('quest/clear')
  async clearQuest(
    @Req() req: AuthenticatedRequest,
    @Body() body: ClearQuestDto,
  ): Promise<ClearQuestResponseDto> {
    return this.questService.clearQuest(req.user.userId, body);
  }
}
