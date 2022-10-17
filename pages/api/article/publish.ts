import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { Cookie } from 'next-cookie';
import { ironOptions } from 'config/index';
import { prepareConnection } from 'db/index';
import { ISession } from 'pages/api/index';
import { setCookie } from 'utils/index';
import { Article, User } from 'db/entity';

export default withIronSessionApiRoute(publish, ironOptions);

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { title = '', content = '' } = req.body;
  const db = await prepareConnection();
  const userRepo = await db.getRepository(User);
  const articleRepo = await db.getRepository(User);

  const user = await userRepo.findOne({
    id: session.userId,
  });

  const article = new Article();
  article.title = title;
  article.content = content;
  article.create_time = new Date();
  article.update_time = new Date();
  article.is_delete = 0;
  article.views = 0;

  console.log(11111);
  console.log(user);

  res.status(200).json({
    data: 'heihei',
    code: 0,
  });
}
