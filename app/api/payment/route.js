import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    try {
        // Parse the request body 
        const body = await req.json();
        // Extract the user object 
        const { user } = body;

        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
            apiVersion: "2024-10-28.acacia"
        })

        const line_items = [
            {
                quantity: 1,
                price_data: {
                    currency: "PHP",
                    product_data: {
                        name: "PRO Plan Subscription",
                        description: "Unlock your potential with our Pro Plan, where personalized courses are tailored to your learning style and goals. With exclusive access to expert content, interactive resources, and progress tracking, you'll stay motivated and ahead of the curve. Enjoy a flexible learning schedule that fits seamlessly into your busy life. Our dedicated support team is always here to help you succeed. Subscribe now and transform your learning journey into a path of success!",
                    },
                    unit_amount: Math.round(Number(2500) * 100),
                },
            },
        ];

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items,
            success_url: process.env.HOST_URL + 'payment-success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: process.env.HOST_URL,
        });

        const customer = await stripe.customers.create({
            email: user?.primaryEmailAddress?.emailAddress,
        });

        await db.update(Users).set({
            isMember: true,
            customerId: customer?.id
        }).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}