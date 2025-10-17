import { NextRequest, NextResponse } from 'next/server';

/**
 * X402 Payment Notification Endpoint
 * 
 * This endpoint receives notifications about completed payments.
 * You can extend this to:
 * - Store payment records in a database
 * - Send webhooks to other services
 * - Update user balances or credits
 * - Trigger business logic based on payments
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate x402 protocol headers
    const protocol = request.headers.get('X-402-Protocol');
    const version = request.headers.get('X-402-Version');
    
    if (protocol !== 'USDC-Base' || version !== '1.0') {
      return NextResponse.json(
        { error: 'Invalid x402 protocol headers' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['from', 'to', 'amount', 'transactionHash', 'chainId'];
    const missingFields = requiredFields.filter((field) => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Log the payment notification
    console.log('X402 Payment Notification Received:', {
      from: body.from,
      to: body.to,
      amount: body.amount,
      transactionHash: body.transactionHash,
      chainId: body.chainId,
      metadata: body.metadata,
      receipt: body.receipt,
      timestamp: new Date().toISOString(),
    });

    // TODO: Store in database
    // await db.payments.create({
    //   ...body,
    //   status: 'confirmed',
    //   createdAt: new Date(),
    // });

    // TODO: Trigger webhooks or business logic
    // await triggerPaymentWebhook(body);

    return NextResponse.json({
      success: true,
      message: 'Payment notification processed',
      transactionHash: body.transactionHash,
    });
  } catch (error) {
    console.error('Error processing x402 payment notification:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process payment notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check x402 service status
 */
export async function GET() {
  return NextResponse.json({
    status: 'operational',
    protocol: 'X402',
    version: '1.0',
    supportedChains: ['base'],
    supportedTokens: ['USDC'],
  });
}
