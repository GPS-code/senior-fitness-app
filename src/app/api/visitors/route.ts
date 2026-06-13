// For MVP: Using in-memory storage (will reset on server restart)
// For production: Replace with database connection

let visitorCount = 0;
const startDate = new Date();

export async function GET() {
  return Response.json({
    count: visitorCount,
    startDate: startDate.toISOString(),
  });
}

export async function POST() {
  visitorCount++;
  return Response.json({
    count: visitorCount,
    message: 'Visitor count incremented',
  });
}
