import { NextRequest, NextResponse } from 'next/server';
import { jobs } from '@/lib/jobs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const range = searchParams.get('range') || '1m';

  const job = jobs.get(jobId);

  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  if (job.status !== 'completed') {
    return NextResponse.json(
      { error: 'Job not completed yet' },
      { status: 400 }
    );
  }

  // Filter price history based on range
  let priceHistory = job.results.priceHistory || [];
  const now = new Date();

  if (range === '1m') {
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    priceHistory = priceHistory.filter((h: any) => new Date(h.date) >= oneMonthAgo);
  } else if (range === '6m') {
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    priceHistory = priceHistory.filter((h: any) => new Date(h.date) >= sixMonthsAgo);
  }

  return NextResponse.json({
    ...job.results,
    priceHistory,
  });
}
