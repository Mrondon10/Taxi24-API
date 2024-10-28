import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: {
            createInvoice: jest.fn().mockResolvedValue({ id: 1, amount: 25.00 }),
            findById: jest.fn().mockResolvedValue({ id: 1, amount: 25.00 }),
            findAll: jest.fn().mockResolvedValue([
              { id: 1, amount: 25.00 },
              { id: 2, amount: 35.00 },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of invoices', async () => {
    const invoices = await controller.getAllInvoices();
    expect(invoices).toEqual([
      { id: 1, amount: 25.00 },
      { id: 2, amount: 35.00 },
    ]);
  });

  it('should return an invoice by ID', async () => {
    const invoice = await controller.getInvoiceById(1);
    expect(invoice).toEqual({ id: 1, amount: 25.00 });
  });

  it('should create a new invoice', async () => {
    const newInvoice = await controller.createInvoice({ tripId: 1, amount: 25.00 });
    expect(newInvoice).toEqual({ id: 1, amount: 25.00 });
  });
});
