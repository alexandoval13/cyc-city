import { PrismaClient } from '@/lib/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAuthUser } from '@/lib/supabase/auth-helpers';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getSupabaseAuthUser(req);

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  const body = await req.json();

  const bike = await prisma.bikes.findUnique({ where: { id: body.bike_id } });

  if (!bike)
    return NextResponse.json({ error: 'Cannot find bike' }, { status: 404 });
  if (bike?.user_id !== user.id)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  try {
    const newService = await prisma.services.create({
      data: {
        bike_id: body.bike_id,
        service_type: body.service_type,
        notes: body.notes,
        performed_at: body.performed_at,
        next_due: body.next_due,
      },
    });
    return NextResponse.json(newService);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create new service`, details: error },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSupabaseAuthUser(req);

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  const body = await req.json();

  const bike = await prisma.bikes.findUnique({ where: { id: body.bike_id } });

  if (!bike)
    return NextResponse.json({ error: 'Could not find bike' }, { status: 404 });
  if (bike.user_id !== user.id)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  try {
    const updatedService = await prisma.services.update({
      where: {
        id: body.id,
      },
      data: {
        ...body.data,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update service ${body.id}`, details: error },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getSupabaseAuthUser(req);

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });

  const body = await req.json();

  const service = await prisma.services.findUnique({
    where: {
      id: body.id,
    },
    include: {
      bikes: true,
    },
  });

  if (!service)
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  if (service.bikes.user_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
  }

  try {
    const res = await prisma.services.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete service ${body.id}`,
        details: error,
      },
      { status: 400 }
    );
  }
}
