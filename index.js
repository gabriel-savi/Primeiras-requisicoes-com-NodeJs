const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkIdExists(req, res, next) {
  const { id } = req.params;

  const idExists = projects.find(p => p.id == id)

  if(!idExists) {
    return res.status(400).json({ error: "Project not found!"});
  }

  return next();
}
function countRequest(req, res, next) {
  console.count("Número de requisições");

  return next();
}
server.use(countRequest)

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const newProject = {
    id,
    title,
    tasks: []
  };

  projects.push(newProject);

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);