import { bikes } from '../generated/prisma';

// to minimize excessive queries
export const bike_data: bikes[] = [
  {
    id: '0a59cce1-38b6-438c-a944-11110c96f85e',
    user_id: '45d9415f-41a3-4834-ac38-c9f12f2593c4',
    name: 'Mountain Bike',
    make_model: 'Trek X-Caliber 9',
    specs: 'Aluminum frame',
    image_url:
      'https://media.trekbikes.com/image/upload/f_auto,fl_progressive:semi,q_auto,w_1920,h_1440,c_pad/Procaliber6-24-41615-A-Primary',
    total_mileage: 350,
    qr_code_id: 'QR2',
    created_at: new Date('2021-07-08T00:00:00+00:00'),
    updated_at: null,
  },
  {
    id: 'f9d7947e-a0e5-4f79-a0b1-e072455b79f8',
    user_id: '45d9415f-41a3-4834-ac38-c9f12f2593c4',
    name: 'City Bike',
    make_model: 'Cannondale Bad Boy 2',
    specs: 'Alloy frame, SRAM NX',
    image_url:
      'https://embed.widencdn.net/img/dorelrl/isbd7tdxxa/1100px@1x/C20_C33200M_Bad_Boy_2_BBQ_D1.webp?color=f7f7f7&q=99',
    total_mileage: 90,
    qr_code_id: 'QR3',
    created_at: new Date('2024-11-20T00:00:00+00:00'),
    updated_at: null,
  },
];
