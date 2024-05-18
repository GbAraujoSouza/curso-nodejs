import main from './main';

main.server.listen(3000, () =>
  console.log('Servidor inicializado com sucesso'),
);

main.server.get('/', (req, res) => {
  try {
    return res.status(201).json({ msg: 'Hello Mundo!' });
  } catch (error) {
    return res.status(401).json(error);
  }
});
