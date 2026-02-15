import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'subscription is required'],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        price: {
            type: Number,
            required: [true, 'subscription price is required'],
            min: [0, 'price must be greater than 0'],
        },
        currency: {
            type: String,
            enum: ['EUR', 'USD', 'GBP'],
            default: 'USD',
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            required: true,
        },
        category: {
            type: String,
            enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
            required: true,
        },
        state: {
            type: String,
            enum: ['active', 'canceled', 'expired'],
            default: 'active',
        },
        paymentMethod: {
            type: String,
            enum: ['apple pay', 'mastercard', 'visa'],
            default: 'apple pay',
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (val) {
                    return val <= new Date();
                },
                message: 'Start date must be the past',
            }
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function (val) {
                    return val > this.startDate;
                },
                message: 'Renewal date must be after the start date',
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        }
    },
    {
        timestamps: true
    }
);

SubscriptionSchema.pre('save', function () {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.state = 'expired';
    }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;


