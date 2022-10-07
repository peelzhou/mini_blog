import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { to = '', templateId = '1' } = req.body;
  console.log(to, templateId);

  //这里没有使用三方短信验证，所以暂时给一个固定值。
  // Give a static verifyCode for login.
  session.verifyCode = 123456;
  await session.save();

  // Give a static response data
  res.status(200).json({
    code: 0,
    msg: 'Success',
    data: 123,
  });
}
