import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CompanyUpdateUseCase } from '.';
import { HttpException } from '@nestjs/common';
import { companyMock, updateCompanyInputMock } from 'src/domain/mocks';
import { companyModuleMock } from '../../company.module';

describe('CompanyUpdateUseCase', () => {
  let usecase: CompanyUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(companyModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyUpdateUseCase>(CompanyUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    const updateSpy = jest
      .spyOn(prismaService.company, 'update')
      .mockResolvedValue(companyMock);

    const response = await usecase.execute(updateCompanyInputMock);

    expect(response).toStrictEqual(companyMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        ...updateCompanyInputMock,
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    jest.spyOn(prismaService.company, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updateCompanyInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
