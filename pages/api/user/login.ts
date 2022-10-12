import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { prepareConnection } from 'db/index';
import { ISession } from 'pages/api/index';
import { User, UserAuth } from 'db/entity';

export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { phone = '', verify = '', identity_type = 'phone' } = req.body;
  const db = await prepareConnection();
  const userAuthRepo = db.getRepository(UserAuth);
  const userRepo = db.getRepository(User);
  const users = await userRepo.find();

  if (String(session.verifyCode) === String(verify)) {
    const userAuth = await userAuthRepo.findOneBy({
      identity_type,
      identifier: phone,
    });

    if (userAuth) {
      //Existed user
      const user = userAuth.user;
      const { id, nickname, avatar } = user;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();
    } else {
      //New user
      const user = new User();
      user.nickname = `user_${Math.floor(Math.random() * 10000)}`;
      user.avatar = '/images/avatar.jpg';
      user.job = 'NA';
      user.introduce = 'NA';

      const userAuth = new UserAuth();
      userAuth.identifier = phone;
      userAuth.identity_type = identity_type;
      userAuth.credential = session.verifyCode;
      userAuth.user = user;

      const resUserAuth = await userAuthRepo.save(userAuth);
      const {
        user: { id, nickname, avatar },
      } = resUserAuth;

      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();
      res?.status(200).json({
        code: 0,
        msg: 'Successfully Login',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    }
  } else {
    res?.status(200).json({
      code: -1,
      msg: 'Wrong code',
    });
  }
  console.log(users);
}
