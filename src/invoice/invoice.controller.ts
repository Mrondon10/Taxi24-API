import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: number): Promise<Invoice> {
    return this.invoiceService.findById(id);
  }

  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }
}
