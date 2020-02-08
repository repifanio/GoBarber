import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async index(req, res) {

    const { page = 1 } = req.query;

    const appointment = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null
      },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url']
            }
          ]
        }
      ]
    })

    return res.json(appointment);
  }

  async store(req, res) {
    /**
     * validation to valide input fields
     */
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    /** */

    const { provider_id, date } = req.body;

    /**
     * Validation if user is provider
     */
    const isProvider = await User.findOne({
      where: {
        provider: true,
        id: provider_id,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ message: 'This provider not is a valid provider' });
    }
    /** */

    const hourStart = startOfHour(parseISO(date)); //Pega sempre o inicio da hora

    /**
     * Verify if hour is valid
     */
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ erro: "This hour not ir valid" })
    }

    /**
     * Validate if provider is available to hour
     */
    const checkAvailable = await Appointment.findOne({
      where: {
        provider_id,
        date: hourStart,
        canceled_at: null
      }
    });

    if (checkAvailable) {
      return res.status(400).json({ erro: "This provider is not available." });
    }


    const appointments = await Appointment.create({
      provider_id,
      date: hourStart,
      user_id: req.userId,
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
