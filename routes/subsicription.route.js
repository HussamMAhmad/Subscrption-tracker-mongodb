import {Router} from 'express';
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription ,  getUserSubscriptions} from "../controllers/subscripitoin.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => {
    res.send({
            title: 'get all subscriptions'
        }
    )
});

subscriptionRoutes.get('/:id', (req, res) => {
    res.send({
            title:
                'get subscriptions details'
        }
    )
});

subscriptionRoutes.post('/', authorize, createSubscription);

subscriptionRoutes.put('/:id', (req, res) => {
    res.send({
            title:

                'update subscription'
        }
    )
});

subscriptionRoutes.delete('/:id', (req, res) => {
    res.send({
            title:
                'delete subscription'
        }
    )
});


subscriptionRoutes.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRoutes.put('/:id/cancel', (req, res) => {
    res.send({
        title:
            "cancel subscription"
    })
});

subscriptionRoutes.get('/upcoming-renewals', (req, res) => {
    {
        res.send({
            title:
                "get upcoming renewals"
        })
    }
});

export default subscriptionRoutes;