import { PrismaClient } from '../../lib/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const userId1 = 'a565529b-d6b6-4e07-95e5-4a39080dab97';
  const userId2 = '45d9415f-41a3-4834-ac38-c9f12f2593c4';

  // refresh test user bikes
  await prisma.bikes.deleteMany({
    where: {
      OR: [{ user_id: userId1 }, { user_id: userId2 }],
    },
  });

  console.log('User 1 and User 2 bikes deleted');

  await prisma.bikes.createMany({
    data: [
      {
        user_id: userId1,
        name: 'Road Bike',
        make_model: 'Cannondale Quick CX 4',
        specs: 'Alloy frame, Suspension Fork',
        qr_code_id: 'QR1',
        total_mileage: 1200,
        image_url:
          'https://embed.widencdn.net/img/dorelrl/vdrihuywtt/1100px@1x/C21_C31451M_Quick_CX_4_BLK_3Q.webp?color=f3f3f3&q=99',
        created_at: new Date('September 13, 2020'),
      },
      {
        user_id: userId2,
        name: 'Mountain Bike',
        make_model: 'Trek X-Caliber 9',
        specs: 'Aluminum frame',
        qr_code_id: 'QR2',
        total_mileage: 350,
        image_url:
          'https://media.trekbikes.com/image/upload/f_auto,fl_progressive:semi,q_auto,w_1920,h_1440,c_pad/Procaliber6-24-41615-A-Primary',
        created_at: new Date('July 8, 2021'),
      },
      {
        user_id: userId2,
        name: 'City Bike',
        make_model: 'Cannondale Bad Boy 2',
        specs: 'Alloy frame, SRAM NX',
        qr_code_id: 'QR3',
        total_mileage: 90,
        image_url:
          'https://embed.widencdn.net/img/dorelrl/isbd7tdxxa/1100px@1x/C20_C33200M_Bad_Boy_2_BBQ_D1.webp?color=f7f7f7&q=99',
        created_at: new Date('November 20, 2024'),
      },
    ],
  });

  console.log('Bike seed data created');

  const bikes = await prisma.bikes.findMany({
    where: {
      user_id: userId1,
    },
  });

  console.log({ bikes });

  if (bikes.length) {
    const getRandomDate = (startDate: Date, endDate: Date) => {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      return new Date(startTime + Math.random() * (endTime - startTime));
    };

    await prisma.services.createMany({
      data: [
        {
          bike_id: bikes[0].id,
          service_type: 'General cleaning and maintenance',
          notes: 'Good condition',
          performed_at: getRandomDate(bikes[0].created_at, new Date()),
        },
        {
          bike_id: bikes[0].id,
          service_type: 'General cleaning and maintenance',
          next_due: new Date(new Date().getDate() + 7),
        },
      ],
    });
    console.log('Services seed data created');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
