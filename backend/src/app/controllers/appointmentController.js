import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
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

    const appointments = await Appointment.create({
      provider_id,
      date,
      user_id: req.userId,
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
