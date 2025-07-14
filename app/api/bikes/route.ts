import { PrismaClient } from '@/lib/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { randomQR } from '../../../lib/api-helpers/randomQR';
import { getSupabaseAuthUser } from '@/lib/supabase/auth-helpers';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getSupabaseAuthUser(req);

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  const body = await req.json();

  try {
    const newBike = await prisma.bikes.create({
      data: {
        user_id: user.id,
        name: body.name,
        make_model: body.make_model,
        specs: body.specs,
        qr_code_id: randomQR(),
      },
    });
    return NextResponse.json(newBike);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create new bike`, details: error },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSupabaseAuthUser(req);

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  const body = await req.json();

  const bike = await prisma.bikes.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!bike)
    return NextResponse.json({ error: 'Could not find bike' }, { status: 404 });
  if (bike.user_id !== user.id)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  try {
    const updatedBike = await prisma.bikes.update({
      where: {
        id: body.id,
      },
      data: {
        ...body.data,
      },
    });

    return NextResponse.json(updatedBike);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update bike ${body.id}`, details: error },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getSupabaseAuthUser(req);

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  const body = await req.json();

  const bike = await prisma.bikes.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!bike)
    return NextResponse.json({ error: 'Could not find bike' }, { status: 404 });
  if (bike.user_id !== user.id)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  try {
    const res = await prisma.bikes.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete bike ${body.id}`,
        details: error,
      },
      { status: 400 }
    );
  }
}
