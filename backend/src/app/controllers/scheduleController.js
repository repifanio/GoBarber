import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointent from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';



class ScheduleController {
    async index(req, res) {

        const { date } = req.query;
        const parseDate = parseISO(date)

        const checkUserProvider = await User.findOne({
            where: {
                id: req.userId, provider: true
            }
        })

        if (!checkUserProvider) {
            return res.status(400).json({ erro: 'This user not is a provider.' });
        }

        const appointents = await Appointent.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(parseDate),
                        endOfDay(parseDate)
                    ]
                }
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                },
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        }
                    ]
                }
            ],
            order: ['date'],
        })

        return res.json(appointents);
    }
}

export default new ScheduleController();