import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { Cookie } from 'next-cookie';
import { clearCookie } from 'utils';

export default withIronSessionApiRoute(logout, ironOptions);

async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const cookies = Cookie.fromApiRoute(req, res);

  await session.destroy();
  clearCookie(cookies);

  res.status(200).json({
    code: 0,
    msg: 'Successfully logout',
    data: {},
  });
}
