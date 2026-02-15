import {serve} from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import {sendReminderEmail} from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
    if (!subscription || subscription.state != "active") {
        console.log('no active');
        return;
    }

    const renwalDate = dayjs(subscription.renewalDate);

    if (renwalDate.isBefore(dayjs())) {
        console.log(`Renwal date has passed for subscription ${subscriptionId}. stopping workflow`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renwalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscriptions', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until reminder ${label} for ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        await sendReminderEmail({to: subscription.user.email, type: label, subscription});
    })
}


