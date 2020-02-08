import Notification from '../schemas/Notification';
import User from './../models/User';

class NotificationController {
    async index(req, res) {

        /**
         * Validation if user is provider
         */
        const isProvider = await User.findOne({
            where: {
                provider: true,
                id: req.userId,
            },
        });

        if (!isProvider) {
            return res
                .status(401)
                .json({ message: 'Only providers can see notificatiosn' });
        }
        /** */

        const notificatiosn = await Notification.find({
            user: req.userId
        }).sort({ createdAt: 'desc' }).limit(20);

        return res.json(notificatiosn);
    }

    async update(req, res) {
        const idNotification = req.params.id;
        const notification = await Notification.findByIdAndUpdate(
            idNotification,
            { read: true },
            { new: true }
        )

        return res.json(notification);
    }
}

export default new NotificationController();