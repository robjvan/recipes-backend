import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('reporting')
@UseGuards(AuthGuard(), new AdminGuard())
export class ReportingController {}
