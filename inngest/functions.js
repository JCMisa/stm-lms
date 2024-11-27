import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const CreateNewUser = inngest.createFunction(
    { id: 'create-user' },
    { event: 'user.create' },
    async ({ event, step }) => {
        // get event data
        const result = await step.run('Check User and Create New if User Does Not Exist', async () => {
            const existingUser = await db
                .select()
                .from(Users)
                .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
            if (existingUser?.length === 0) {
                // add the user if email not found
                const addUser = await db.insert(Users).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress
                })

                if (addUser) {
                    toast(
                        <p className='text-sm font-bold text-green-500'>User saved successfully</p>
                    )
                }
            }
        })

        return 'Success';
    }

    // step to send welcome email notification

    // step to send email notif 3 days after user joined
)