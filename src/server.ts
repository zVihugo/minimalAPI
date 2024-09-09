import fastify from "fastify";

const server = fastify({ logger: true });

const teams = [
  {
    id: 1,
    name: "McLaren",
    base: "Woking, Surrey, England",
  },
  {
    id: 2,
    name: "Ferrari",
    base: "Maranello, Emilia-Romagna, Italy",
  },
  {
    id: 3,
    name: "Mercedes",
    base: "Brackley, Northamptonshire, England",
  },
];

const drivers = [
  { id: 1, name: "Michael Schumacher", team: "Ferrari" },
  { id: 2, name: "Rubens Barrichello", team: "Ferrari" },
  {
    id: 3,
    name: "Kimi Räikkönen",
    team: "McLaren",
  },
  {
    id: 4,
    name: "Juan Pablo Montoya",
    team: "McLaren",
  },
];

server.get("/teams", async (req, res) => {
  res.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (req, res) => {
  res.type("application/json").code(200);
  return {drivers};
});

interface routeParams {
    id: string;
}

server.get<{Params: routeParams}>("/drivers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const driver = drivers.find((driver => driver.id === id));

    if(!driver){
        res.type("application/json").code(404);
        return {message: "Driver not found"};
    }else{
        res.type("application/json").code(200);
        return {driver};
    }
});


server.listen({ port: Number(process.env.PORT) || 3333 }, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
