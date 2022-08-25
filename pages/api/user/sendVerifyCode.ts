export default async function (req, res) {
  const { to = '', templateId = '1' } = req.body;
  res.status(200).json({
    code: 0,
    data: 123,
  });
}
